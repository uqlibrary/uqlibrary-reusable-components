module.exports = {

  'check uqlibraryonlineexhibitions.omeka.net is correctly calling reusable elements (if tests fail they may no longer be using omeka)' : function (client) {
    client
      .url('http://uqlibraryonlineexhibitions.omeka.net/exhibits/show/jd-fryer-student-and-soldier')
      .resizeWindow(1280, 800)
      .pause(20000) // allow saucelabs to get the page loaded
      .waitForElementVisible('h1', 10000)
      .assert.elementPresent('uq-minimal-header', 'uq header component is present')
      .assert.elementPresent('uq-minimal-header uql-global-links', 'uq global links header component is present')
      .assert.containsText('.library-title a', 'UQ Library')
      .assert.containsText('.application-title', 'Online Exhibitions')
      .assert.elementPresent('uql-askus-button', 'uql askus component is present')
      .assert.elementPresent('uq-minimal-footer', 'uq footer component is present')
      .assert.elementPresent('uq-minimal-footer uql-global-links', 'uq global links footer component is present')
      .assert.containsText('uq-minimal-footer .footer-uq-details li', 'Authorised by:')
      .assert.elementPresent('uq-minimal-footer .footer-legal-details a'
                            , 'Emergency Phone footer component is present')
      .assert.containsText('uq-minimal-footer .footer-legal-details .h6', 'Emergency')
      .end();
  },

  'check https://www.studenthub.uq.edu.au/workgroups/library-staff-development is correctly calling reusable elements' : function (client) {
    client
      .url('https://www.studenthub.uq.edu.au/workgroups/library-staff-development')
      .resizeWindow(1280, 800)
      .pause(20000) // allow saucelabs to get the page loaded
      .waitForElementVisible('#sitename a', 10000)
      .assert.elementPresent('uq-minimal-header', 'uq header component is present')
      .assert.elementPresent('uq-minimal-header uql-global-links', 'uq global links header component is present')
      .assert.containsText('.library-title a', 'UQ Library')
      .assert.elementPresent('uql-askus-button', 'uql askus component is present')
      .assert.elementPresent('uq-minimal-footer', 'uq footer component is present')
      .assert.elementPresent('uq-minimal-footer uql-global-links', 'uq global links footer component is present')
      .assert.containsText('uq-minimal-footer .footer-uq-details li', 'Authorised by:')
      .assert.elementPresent('uq-minimal-footer .footer-legal-details a'
      , 'Emergency Phone footer component is present')
      .assert.containsText('uq-minimal-footer .footer-legal-details .h6', 'Emergency')
      .assert.elementPresent('.sidebar .body > a', 'sidebar More Events button is present')
      .assert.containsText('.sidebar .body > a', 'MORE EVENTS')
      .end();
  }
};