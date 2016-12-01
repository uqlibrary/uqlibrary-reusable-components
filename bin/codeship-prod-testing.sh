#!/usr/bin/env bash

# start debugging/tracing commands, -e - exit if command returns error (non-zero status)
set -e


# reusable components are used in production by other library applications,
# this test script executes tests to check that reusable components are still applied to library apps

if [ ${CI_BRANCH} == "production" ]; then

  echo "install selenium"
  curl -sSL https://raw.githubusercontent.com/codeship/scripts/master/packages/selenium_server.sh | bash -s

  echo "Run nightwatch tests"
  cd bin/

  echo "local firefox on windows test..."
  nightwatch -c nightwatch.json --tag e2etest

  echo "local chrome on windows test..."
  nightwatch -c nightwatch.json --env chrome --tag e2etest

  # saucelabs only on production branch
  echo "saucelabs..."

  nwconfigtemp="template.nightwatch-saucelabs.json"
  nwconfig="nightwatch-saucelabs.json"

  cp $nwconfigtemp $nwconfig

  sed -i -e "s#<SAUCE_USERNAME>#${SAUCE_USERNAME}#g" ${nwconfig}
  sed -i -e "s#<SAUCE_ACCESS_KEY>#${SAUCE_ACCESS_KEY}#g" ${nwconfig}

  echo "chrome on windows on saucelabs"
  nightwatch -c nightwatch-saucelabs.json --tag e2etest

  echo "firefox on windows on saucelabs"
  nightwatch -c nightwatch-saucelabs.json --env firefox-on-windows --tag e2etest

  # note: edge and ie11 require avoidProxy set to true in the .json file per https://support.saucelabs.com/customer/en/portal/private/cases/43779
  echo "edge on saucelabs"
  nightwatch -c nightwatch-saucelabs.json --env edge --tag e2etest

  echo "chrome on mac on saucelabs"
  nightwatch -c nightwatch-saucelabs.json --env chrome-on-mac --tag e2etest

  echo "firefox on mac on saucelabs"
  nightwatch -c nightwatch-saucelabs.json --env firefox-on-mac --tag e2etest

  echo "safari on mac on saucelabs"
  nightwatch -c nightwatch-saucelabs.json --env safari-on-mac --tag e2etest

fi