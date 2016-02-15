#!/usr/bin/env bash

# start debugging/tracing commands, -e - exit if command returns error (non-zero status)
set -e

echo "Install prerequisites gulp/bower/packages"

npm install -g gulp bower

npm install
bower install

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

echo "Check file syntax"
gulp syntax

echo "Vulcanizing elements"
gulp vulcanize

# If these files are the same, it means an error in vulcanizing
echo "Checking vulcanization was performed correctly"
set +e
result=`diff elements/elements.html elements/elements.vulcanized.html`
set -e

if [ -z "${result}" ]; then
    echo "Improperly vulcanized file"
    echo "This happens sporadically, rebuilding should fix"
    exit 1;
fi

if ! [ -f elements/elements.vulcanized.js ]; then
    echo "Improperly vulcanized file - missing vulcanized.js"
    exit 1;
fi

#run css min tasks for staging/production, don't run for master - for better debugging
if [ $branch = "staging" ] || [ $branch = "production" ]; then
  echo "Run gulp task to optimize css..."
  gulp optimize
fi

echo "Update elements to use its vulcanized version"
files=( test/uql* )
for file in "${files[@]}"; do
  file2=${file#test/}
  element=${file2%.html}
  sed -i -e "s#${element}/${file2}#elements.vulcanized.html#g" ${file}
done

echo "Update DEMO pages to use its vulcanized version"
elements_ref="../elements.html"
webcomponents_ref="../../bower_components/webcomponentsjs/webcomponents-lite.js"
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

echo "Run tests"
gulp test

echo "Run gulp task to upload to AWS..."
gulp publish

echo "Run Cloudfront Invalidation"
gulp invalidate --path ${InvalidationPath}

echo "Clean up AWS configuration..."
rm -f ${awsconfig}

