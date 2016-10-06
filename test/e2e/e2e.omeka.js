module.exports = {

  'check uqlibraryonlineexhibitions.omeka.net is correctly calling reusable elements (if tests fail they may no longer be using omeka)' : function (client) {
    client
      .url('http://uqlibraryonlineexhibitions.omeka.net/exhibits/show/jd-fryer-student-and-soldier')
      .resizeWindow(1280, 800)
      .pause(20000) // allow saucelabs to get the page loaded
      .waitForElementVisible('h1', 10000)
//.saveScreenshot('screenshots/e2ejs.png')

      .assert.elementPresent('uq-minimal-header', 'uq header component is present')

// temp: what components made it in from the vulcanisation?
      .assert.elementPresent('uqlibrary-ga', 'uq ga component is present')
      .assert.elementPresent('#skipNavigation', 'uq skipNavigation component is present')
      .assert.elementPresent('.header-container', 'uq .header-container component is present')
      .assert.elementPresent('.header-content', 'uq .header-content component is present')
      .assert.elementPresent('.header-title', 'uq .header-title component is present')
      .assert.elementPresent('uql-menu-button', 'uq uql-menu-button component is present')

      .assert.containsText('.library-title a', 'UQ Library')
      .assert.containsText('.application-title', 'Online Exhibitions')
      .assert.elementPresent('uql-askus-button', 'uql askus component is present')
      .assert.elementPresent('uq-minimal-footer', 'uq footer component is present')
      .assert.elementPresent('uq-minimal-footer uql-global-links', 'uq global links footer component is present')
      .assert.containsText('uq-minimal-footer .footer-uq-details li', 'Authorised by:')
      .assert.elementPresent('uq-minimal-footer .footer-legal-details a'
      , 'Emergency Phone footer component is present')
      .assert.containsText('uq-minimal-footer .footer-legal-details .h6', 'Emergency')
      .assert.elementPresent('uq-minimal-header uql-global-links', 'uq global links header component is present')
      .end();
  }


};