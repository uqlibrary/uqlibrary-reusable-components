#!/usr/bin/env bash

echo "Install prerequisites gulp/bower/packages"
npm install -g gulp bower
npm install
bower install

chmod a+x -R bin/*


echo "install selenium"
curl -sSL https://raw.githubusercontent.com/codeship/scripts/master/packages/selenium_server.sh | bash -s

echo "Run nightwatch tests"
cd bin/

nwconfigtemp="template.nightwatch-saucelabs.json"
nwconfig="nightwatch-saucelabs.json"

cp $nwconfigtemp $nwconfig

sed -i -e "s#<SAUCE_USERNAME>#${SAUCE_USERNAME}#g" ${nwconfig}
sed -i -e "s#<SAUCE_ACCESS_KEY>#${SAUCE_ACCESS_KEY}#g" ${nwconfig}
