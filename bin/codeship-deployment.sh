#!/usr/bin/env bash

# start debugging/tracing commands, -e - exit if command returns error (non-zero status)
set -e

echo "Deploying branch: ${CI_BRANCH}"
branch=${CI_BRANCH}
src=$(git rev-parse --show-toplevel)
base=$(basename ${src})
dest="${base/uqlibrary-/}"

pwd
cd ../${base}
pwd

# use codeship branch environment variable to push to branch name dir unless it's 'production' branch (or master for now)
if [ ${CI_BRANCH} != "production" ]; then
  export S3BucketSubDir=/${CI_BRANCH}/${dest}
  export InvalidationPath=/${CI_BRANCH}/${dest}
else
  export S3BucketSubDir=${dest}
  export InvalidationPath=/${dest}
fi

echo "Compile css"
npm rebuild node-sass
gulp styles

echo "Insert browser detection message"
gulp inject-browser-update

echo "Vulcanizing elements"
gulp vulcanize

echo "Update GA Values"
gulp inject-ga-values

#run css min tasks for production, don't run for master - for better debugging
if [ $branch = "production" ]; then
  echo "Run gulp task to optimize css..."
  gulp optimize
fi

echo "Update DEMO pages to use its vulcanized version"
elements_ref="../elements.html"
webcomponents_ref="../../../webcomponentsjs/webcomponents-lite.js"
application_ref="../../applications"

webcomponents_ref_online="../../webcomponentsjs/webcomponents-lite.js"
elements_ref_online="../elements.vulcanized.html"
application_ref_online="../.."

files=( elements/demo/* )
for file in "${files[@]}"; do
  sed -i -e "s#${elements_ref}#${elements_ref_online}#g" ${file}
  sed -i -e "s#${webcomponents_ref}#${webcomponents_ref_online}#g" ${file}
  sed -i -e "s#${application_ref}#${application_ref_online}#g" ${file}
done

echo "Update app cache manifest version"
appcache="applications/libwww/reusable-components.appcache"
version=$(git rev-parse HEAD)

sed -i -e "s#<VERSION>#${version}#g" ${appcache}

echo "Deploying to S3 bucket sub-dir: ${S3BucketSubDir}"
echo "Prepare AWS configuration..."

# Use env vars to set AWS config
awsconfigtemp="template.aws.json"
awsconfig="aws.json"

cp $awsconfigtemp $awsconfig

sed -i -e "s#<AWSAccessKeyId>#${AWSAccessKeyId}#g" ${awsconfig}
sed -i -e "s#<AWSSecretKey>#${AWSSecretKey}#g" ${awsconfig}
sed -i -e "s#<S3Bucket>#${S3Bucket}#g" ${awsconfig}
sed -i -e "s#<S3BucketSubDir>#${S3BucketSubDir}#g" ${awsconfig}
sed -i -e "s#<CFDistribution>#${CFDistribution}#g" ${awsconfig}
sed -i -e "s#<AWSRegion>#${AWSRegion}#g" ${awsconfig}

echo "Run gulp task to upload to AWS..."
gulp publish

echo "Run Cloudfront Invalidation"
gulp invalidate --path ${InvalidationPath}
if [ ${CI_BRANCH} != "production" ]; then
  gulp invalidate --path /${CI_BRANCH}/uqlibrary-api
fi

echo "Clean up AWS configuration..."
rm -f ${awsconfig}
