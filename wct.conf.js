var path = require('path');

var ret = {
  'suites': ['test'],
  'webserver': {
    'pathMappings': []
  },
    plugins: {
        sauce: {
            browsers: [
                'Windows 10/chrome',
                'Windows 10/firefox',
                'OS X 10.11/safari',
                'OS X 10.11/firefox',
                'OS X 10.11/chrome'
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
