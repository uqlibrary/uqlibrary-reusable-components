#!/usr/bin/env bash

echo "Run nightwatch tests"
cd bin/

if [ -z $CI_BRANCH ]; then
  branch=$(git rev-parse --abbrev-ref HEAD)
else
  branch=$CI_BRANCH
fi

case "$branch" in
"master")

  case "$PIPE_NUM" in
  "1")
    echo "local firefox on windows test..."
    nightwatch -c nightwatch.json

    echo "local chrome on windows test..."
    nightwatch -c nightwatch.json --env chrome
  ;;
  esac
;;

nightwatch)
#production)
  case "$PIPE_NUM" in
  "1")
    echo "local firefox on windows test..."
    nightwatch -c nightwatch.json

    echo "local chrome on windows test..."
    nightwatch -c nightwatch.json --env chrome

  ;;
  "2")
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

#not currently working see https://support.saucelabs.com/customer/en/portal/private/cases/43779
#    echo "edge on saucelabs"
#    nightwatch -c nightwatch-saucelabs.json --env edge --tag e2etest

    echo "chrome on mac on saucelabs"
    nightwatch -c nightwatch-saucelabs.json --env chrome-on-mac --tag e2etest

    echo "firefox on mac on saucelabs"
    nightwatch -c nightwatch-saucelabs.json --env firefox-on-mac --tag e2etest

    echo "safari on mac on saucelabs"
    nightwatch -c nightwatch-saucelabs.json --env safari-on-mac --tag e2etest
  ;;
  esac
;;

*)
# all other branches are untested
;;
esac