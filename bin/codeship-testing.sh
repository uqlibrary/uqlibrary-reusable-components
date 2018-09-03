#!/bin/bash
# start debugging/tracing commands, -e - exit if command returns error (non-zero status)
set -e

function logSauceCommands {
 SAUCELABS_LOG_FILE="${TMPDIR}sc.log"
 if [ -f {$SAUCELABS_LOG_FILE} ]; then
  echo "Command failed - dumping {$SAUCELABS_LOG_FILE} for debug of saucelabs"
  cat {$SAUCELABS_LOG_FILE}
 else
   echo "Command failed - attempting to dump saucelabs log file but $SAUCELABS_LOG_FILE not found - did we reach the saucelabs section?"
 fi
}

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
  # "Test Commands" tab on codeship
  echo "Check file syntax..."
  gulp syntax

;;
"2")
  # "Unit tests" tab on codeship
  echo "WCT: local unit testing..."
  gulp test

;;
"3")
  # "Saucelabs" tab on codeship

  trap logSauceCommands EXIT

  echo "WCT: remote unit testing (for Master and Prod branch only)..."
  if [[ (${CI_BRANCH} == "master" || ${CI_BRANCH} == "production") ]]; then
    gulp test:remote
  fi
;;
esac
