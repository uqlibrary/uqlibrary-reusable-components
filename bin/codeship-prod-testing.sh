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

  printf "\n Not testing firefox here atm - selenium would need an upgrade to use a recent enough geckodriver that recent firefox will work - see https://app.codeship.com/projects/99389/builds/35831843 \n\n"

  printf "\n --- LOCAL CHROME on windows test... ---\n\n"
  nightwatch -c nightwatch.json --env chrome --tag e2etest

  # saucelabs only on production branch
  echo "saucelabs..."

  nwconfigtemp="template.nightwatch-saucelabs.json"
  nwconfig="nightwatch-saucelabs.json"

  cp $nwconfigtemp $nwconfig

  sed -i -e "s#<SAUCE_USERNAME>#${SAUCE_USERNAME}#g" ${nwconfig}
  sed -i -e "s#<SAUCE_ACCESS_KEY>#${SAUCE_ACCESS_KEY}#g" ${nwconfig}

  printf "\n --- CHROME ON WINDOWS on saucelabs ---\n\n"
  nightwatch -c nightwatch-saucelabs.json --tag e2etest

  printf "\n --- FIREFOX ON WINDOWS on saucelabs ---\n\n"
  nightwatch -c nightwatch-saucelabs.json --env firefox-on-windows --tag e2etest

  # note: edge and ie11 require avoidProxy set to true in the .json file per https://support.saucelabs.com/customer/en/portal/private/cases/43779
  printf "\n --- EDGE on saucelabs ---\n\n"
  nightwatch -c nightwatch-saucelabs.json --env edge --tag e2etest

  printf "\n --- CHROME ON MAC on saucelabs ---\n\n"
  nightwatch -c nightwatch-saucelabs.json --env chrome-on-mac --tag e2etest

  printf "\n --- FIREFOX ON MAC on saucelabs ---\n\n"
  nightwatch -c nightwatch-saucelabs.json --env firefox-on-mac --tag e2etest

  printf "\n --- SAFARI ON MAC on saucelabs ---\n\n"
  nightwatch -c nightwatch-saucelabs.json --env safari-on-mac --tag e2etest

  printf "\n --- FIREFOX ESR ON WINDOWS on saucelabs ---\n\n"
  nightwatch -c nightwatch-saucelabs.json --env firefox-on-windows-ESR --tag e2etest

  printf "\n --- FIREFOX ESR ON MAC on saucelabs ---\n\n"
  nightwatch -c nightwatch-saucelabs.json --env firefox-on-mac-ESR --tag e2etest

fi