
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

#run css min tasks for staging/production, don't run for master - for better debugging
if [ $branch = "staging" ] || [ $branch = "production" ]; then
  echo "Run gulp task to optimize css..."
  gulp optimize
fi

# If these files are the same, it means an error in vulcanizing
# todo: vulcanize as part of the build, remove elements.vulcanized.html from git
result=`diff elements/elements.html elements/elements.vulcanized.html`

if [ -z "${result}" ]; then
    echo "Improperly vulcanized file"
    exit 1;
fi

echo "Check file syntax"
gulp syntax

echo "Run tests"
gulp test

echo "Run gulp task to upload to AWS..."
gulp publish

echo "Run Cloudfront Invalidation"
gulp invalidate --path ${InvalidationPath}

echo "Clean up AWS configuration..."
rm -f ${awsconfig}

