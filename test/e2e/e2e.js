module.exports = {

  'check uqlibraryonlineexhibitions.omeka.net is still calling reusable elements (if tests fail they may have retired that exhibit)' : function (client) {
    client
      .url('http://uqlibraryonlineexhibitions.omeka.net/exhibits/show/jd-fryer-student-and-soldier')
      .waitForElementVisible('uql-global-links', 10000)
      .assert.elementPresent('uq-minimal-header', 'uq header component is present')
      .assert.elementPresent('uq-minimal-header uql-global-links', 'uq global links component is present')
      .assert.elementPresent('uq-minimal-footer', 'uq footer component is present')
      .end();
  }
};