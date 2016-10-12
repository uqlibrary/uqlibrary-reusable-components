var minimalUql = require("./e2e.minimal.js");
var urlTest = 'https://www.studenthub.uq.edu.au/workgroups/library-staff-development';

module.exports = {
  '@tags': ['e2etest', 'studenthub'],

  'Test reusable components are applied to StudentHub' : function (client) {
    // common uql checks
    minimalUql.commonChecks(client, urlTest);

    // studenthub specific checks
    client
      .assert.elementPresent('.sidebar .body > a', 'sidebar More Events button is present')
      .assert.containsText('.sidebar .body > a', 'MORE EVENTS')
      .end();

  }



};
