var uqlAssertions = require("../common/uqlAssertions.js");
var theurl = 'https://www.studenthub.uq.edu.au/workgroups/library-staff-development';

module.exports = {
  '@tags': ['studenthub'],

  'check https://www.studenthub.uq.edu.au/workgroups/library-staff-development is correctly calling reusable elements' : function (client) {
    // common uql checks
    uqlAssertions.commonChecks(client, theurl);

    // studenthub specific checks
    client
      .url(theurl)
      .assert.elementPresent('.sidebar .body > a', 'sidebar More Events button is present')
      .assert.containsText('.sidebar .body > a', 'MORE EVENTS')
      .end();

  }



};
