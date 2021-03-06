#!/bin/bash
# start debugging/tracing commands, -e - exit if command returns error (non-zero status)
set -e

# if you want to log any saucelab errors to the codeship log, set LOG_SAUCELAB_ERRORS to true in the codeship variables
# at https://app.codeship.com/projects/131650/environment/edit;
# else leave it missing in codeship environment variables or false
if [[ -z $LOG_SAUCELAB_ERRORS ]]; then
    LOG_SAUCELAB_ERRORS=false
fi
if [[ "$LOG_SAUCELAB_ERRORS" == true ]]; then
    if [[ -z "$TMPDIR" ]]; then # codeship doesnt seem to set this
      TMPDIR="/tmp/"
    fi
fi

function logSauceCommands {
  if [[ "$LOG_SAUCELAB_ERRORS" != true ]]; then
    echo "Skipping display of logs. Set LOG_SAUCELAB_ERRORS to true in Codeship Environment Variables to see the log next time."
    return
  fi

  SAUCELABS_LOG_FILE="${TMPDIR}sc.log"
  if [ ! -f "$SAUCELABS_LOG_FILE" ]; then
    echo "$SAUCELABS_LOG_FILE not found - looking for alt file"

    # Testing with wct, which writes to a subdirectory, e.g. /tmp/wct118915-6262-1w0uwzy.q8it/sc.log
    ALTERNATE_SAUCE_LOCN=""
    set +e
    while read LOGDIR_NAME; do
      if [[ "$LOGDIR_NAME" -nt "$ALTERNATE_SAUCE_LOCN" ]]; then
        ALTERNATE_SAUCE_LOCN="$LOGDIR_NAME"
      fi
    done < <(find "$TMPDIR" -name 'wct*' 2>/dev/null)
    set -e

    if [ -d "$ALTERNATE_SAUCE_LOCN" ]; then
      SAUCELABS_LOG_FILE="${ALTERNATE_SAUCE_LOCN}/sc.log"
    else # debug
      echo "Could not find alternate log dir $ALTERNATE_SAUCE_LOCN"
    fi
  fi

  if [ -f "$SAUCELABS_LOG_FILE" ]; then
    echo "Command failed - dumping $SAUCELABS_LOG_FILE for debug of saucelabs"
    cat $SAUCELABS_LOG_FILE
  else
    echo "Command failed - attempting to dump saucelabs log file but $SAUCELABS_LOG_FILE not found - did we reach the saucelabs section?"
  fi
}

if [[ -z $CI_BRANCH ]]; then
  CI_BRANCH=$(git rev-parse --abbrev-ref HEAD)
fi


echo "Vulcanizing elements..."
gulp vulcanize

# If these files are the same, it means an error in vulcanizing
echo "Checking vulcanization was performed correctly..."
set +e
result=`diff elements/elements.html elements/elements.vulcanized.html`
set -e

if [[ -z "${result}" ]]; then
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


# "Test Commands" 
echo "Check file syntax..."
gulp syntax

# nothing that the tests in this file cover are changed by file changes that affect primo
if [[ $CI_BRANCH == primo-* ]] ; then
  echo "testing not required in primo dev"
  exit 0
fi

# "Unit tests" tab on codeship
echo "WCT: local unit testing..."
gulp test


# "Saucelabs" 
# nothing that the tests in this file cover are changed by file changes that affect primo
if [[ $CI_BRANCH == primo-* ]] ; then
  echo "testing not required in primo dev"
  exit 0
fi

trap logSauceCommands EXIT

echo "WCT: remote unit testing - test most common browsers on Master and Prod..."
# check analytics at least annually to confirm correct browser choice
# Win/Chrome is our most used browser, 2018
# Win/FF is our second most used browser, 2018 - we have the ESR release on Library Desktop SOE
if [[ (${CI_BRANCH} == "master" || ${CI_BRANCH} == "production") ]]; then
  printf "\n-- Remote unit testing on Saucelabs --\n\n"
  cp wct.conf.js.common wct.conf.js
  gulp test:remote
  rm wct.conf.js
fi

echo "WCT: remote unit testing on prod for other browsers..."
if [[ (${CI_BRANCH} == "production") ]]; then
  printf "\n-- Remote unit testing on Saucelabs --\n\n"
  cp wct.conf.js.other wct.conf.js
  gulp test:remote
  rm wct.conf.js
fi

