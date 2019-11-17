var minimalUql = require("./e2e.minimal.js");
var urlTest = 'http://uqlibraryonlineexhibitions.omeka.net/exhibits/show/jd-fryer-student-and-soldier';

module.exports = {
    '@tags': ['e2etest', 'omeka'],

    'Test reusable components are applied to Omeka': function (client) {
        // common uql checks
        minimalUql.commonChecks(client, urlTest);

        // omeka specific checks
        client
            .pause(5000)
            .assert.containsText('.application-title', 'Online Exhibitions')
            .end();
    }
};