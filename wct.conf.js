var path = require('path');

var ret = {
  'suites': ['test'],
  'webserver': {
    'pathMappings': []
  },
    plugins: {
        sauce: {
            browsers: [
                'Windows 10/microsoftedge',
                'Windows 10/internet explorer',
                'Windows 10/chrome',
                'Windows 10/firefox',
                'Windows 10/firefox@60', // ESR - check # at https://www.mozilla.org/en-US/firefox/organizations/
                'OS X 10.13/safari',
                'OS X 10.13/firefox',
                'OS X 10.13/firefox@60',
                'OS X 10.13/chrome'
            ]
        },
        local: {
            "browsers": [
                "chrome"
            ]
        }
    }
};

var mapping = {};
var rootPath = (__dirname).split(path.sep).slice(-1)[0];

mapping['/components/' + rootPath +
'/bower_components'] = 'bower_components';

ret.webserver.pathMappings.push(mapping);

module.exports = ret;
