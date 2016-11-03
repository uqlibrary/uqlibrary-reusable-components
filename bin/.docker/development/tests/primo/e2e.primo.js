var searchText = 'book'; // test for something basic that should always return results
var urlTest = 'http://search.library.uq.edu.au/primo_library/libweb/action/search.do?fn=search&ct=search&initialSearch=true&mode=Basic&tab=61uq_all&indx=1&dum=true&srt=rank&vid=61UQ&frbg=&tb=t&vl%28freeText0%29='+searchText+'&scp.scps=scope%3A%2861UQ%29%2Cprimo_central_multiple_fe&vl%281UIStartWith0%29=contains&vl%28D75285834UI0%29=any&vl%28D75285834UI0%29=title&vl%28D75285834UI0%29=any';

module.exports = {
  '@tags': ['primo'],

  'Test Primo search results are returned' : function (client) {
    client
      .url(urlTest)

      // did we get a page?
      .assert.elementPresent('html', 'a base html element is present')
      .assert.elementPresent('body', 'a body element is present')

      // did we get a page with primo elements?
      .assert.elementPresent('body.EXLCurrentLang_en_US', 'the body element has an english lang class')
      .assert.elementPresent('div#contentEXL', 'the initial contentEXL div is present')
      .assert.elementPresent('div#exlidHeaderSystemFeedback', 'the feedback div is present')
      .assert.elementPresent('div#exlidFacetTile', 'the sidebar facet div is present')
      .assert.elementPresent('div#resultsTileNoId', 'the results block div is present')

      // did we get valid search results? for the current searchText
      .assert.elementPresent('tr#exlidResult0 h2', 'at least one primo result is present')

      // did polymer elements load?
      // (put primo tests in line so we can have general page checks first before polymer checks,
      // to give a better idea where the problem lies)
      .pause(5000) // allow time for the page to load minimal components
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

      .end();

  }


};
