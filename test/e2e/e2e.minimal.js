// check for elements common across the uql looknfeel
module.exports = {
  commonChecks: function (browser, urlTest) {
    browser
      .url(urlTest)
      .pause(10000) // allow time for the page to load minimal components
      .assert.elementPresent('uq-minimal-header', 'uq header component is present')
      .assert.elementPresent('uq-minimal-header uql-global-links', 'uq global links header component is present')
      .assert.containsText('.library-title a', 'Library')
      .assert.elementPresent('uql-askus-button', 'uql askus component is present')
      .assert.elementPresent('uq-minimal-footer', 'uq footer component is present')
      .assert.elementPresent(
        'uq-minimal-footer .footer-legal-details a',
        'Emergency Phone footer component is present'
      )
      .assert.containsText('uq-minimal-footer .footer-legal-details .h6', 'Emergency');
    return browser;
  }
};