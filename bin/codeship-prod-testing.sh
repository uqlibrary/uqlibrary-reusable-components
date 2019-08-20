#!/usr/bin/env bash

# start debugging/tracing commands, -e - exit if command returns error (non-zero status)
set -e


# reusable components are used in production by other library applications,
# this test script executes tests to check that reusable components are still applied to library apps

if [[ ${CI_BRANCH} == "production" ]]; then

  # no point running these tests until invalidation is complete - give it 10 minutes: 60 * 10 = 600 seconds
  echo "sleep 10 minutes to allow invalidation to complete before testing production systems"
  sleep 600
  echo "awake now!"

  echo "install selenium"
  curl -sSL https://raw.githubusercontent.com/codeship/scripts/master/packages/selenium_server.sh | bash -s

  echo "Run nightwatch tests"
  cd bin/

  printf "\n --- LOCAL Firefox on windows test... ---\n\n"
  nightwatch -c nightwatch.json --env firefox --tag e2etest

  # saucelabs only on production branch
  echo "Remote e2e testing on Sauce Labs"

  nwconfigtemp="template.nightwatch-saucelabs.json"
  nwconfig="nightwatch-saucelabs.json"

  cp $nwconfigtemp $nwconfig

  sed -i -e "s#<SAUCE_USERNAME>#${SAUCE_USERNAME}#g" ${nwconfig}
  sed -i -e "s#<SAUCE_ACCESS_KEY>#${SAUCE_ACCESS_KEY}#g" ${nwconfig}

  # note: edge and ie11 require avoidProxy set to true in the .json file per https://support.saucelabs.com/customer/en/portal/private/cases/43779
  printf "\n --- Windows browsers on Sauce Labs ---\n\n"
  nightwatch -c nightwatch-saucelabs.json --tag e2etest --env default,firefox-on-windows,edge,ie11,firefox-on-windows-ESR --tag e2etest

  printf "\n --- Mac browsers on Sauce Labs ---\n\n"
  nightwatch -c nightwatch-saucelabs.json --env chrome-on-mac,firefox-on-mac,safari-on-mac,firefox-on-mac-ESR --tag e2etest

fi
