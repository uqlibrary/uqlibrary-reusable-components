#!/bin/bash
# start debugging/tracing commands, -e - exit if command returns error (non-zero status)
set -e

if [ -z $CI_BRANCH ]; then
  branch=$(git rev-parse --abbrev-ref HEAD)
else
  branch=$CI_BRANCH
fi

echo "Vulcanizing elements..."
gulp vulcanize

# If these files are the same, it means an error in vulcanizing
echo "Checking vulcanization was performed correctly..."
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

echo "Updating tests cases to use vulcanized version of elements..."
files=( test/uql* )
for file in "${files[@]}"; do
  file2=${file#test/}
  element=${file2%.html}
  sed -i -e "s#${element}/${file2}#elements.vulcanized.html#g" ${file}
done

case "$PIPE_NUM" in
"1")
  # "Unit testing" on codeship
  echo "WCT: local unit testing..."
  gulp test

  #if [ ${CI_BRANCH} == "production" ]; then
    echo "WCT: remote unit testing..."
    gulp test:remote
  #fi

;;
"2")
  # "Lint checking"
  echo "Check file syntax..."
  gulp syntax

;;
"3")
  # "Nightwatch on saucelabs" on codeship - placeholder
  # tests are run after deployment codeship-prod-testing.sh
;;
esac
