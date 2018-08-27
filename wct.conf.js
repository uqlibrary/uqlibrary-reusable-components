var path = require('path');

var ret = {
  'suites': ['test'],
  'webserver': {
    'pathMappings': []
  },
    plugins: {
        sauce: {
            browsers: [
                'Windows 10/chrome@54',
                'Windows 10/firefox@50',
                'OS X 10.11/safari@9.0',
                'OS X 10.11/firefox@50',
                'OS X 10.11/chrome@54'
            ]
        },
        local: {
            "browsers": [
                "chrome",
                "firefox@60"
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
