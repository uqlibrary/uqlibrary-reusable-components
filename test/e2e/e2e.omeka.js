var uqlAssertions = require("../common/uqlAssertions.js");
var theurl = 'http://uqlibraryonlineexhibitions.omeka.net/exhibits/show/jd-fryer-student-and-soldier';

module.exports = {
  '@tags': ['omeka'],

  'check uqlibraryonlineexhibitions.omeka.net is correctly calling reusable elements (if tests fail they may no longer be using omeka)' : function (client) {
    // common uql checks
    uqlAssertions.commonChecks(client, theurl);

    // omeka specific checks
    client
      .url(theurl)
      .assert.containsText('.application-title', 'Online Exhibitions')
      .end();

  }



};