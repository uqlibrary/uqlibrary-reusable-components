// test for something basic that should always return results
var searchText = 'book';
var urlTest = 'https://search.library.uq.edu.au/primo-explore/search?query=any,contains,'+searchText+'&tab=61uq_all&search_scope=61UQ_All&sortby=rank&vid=61UQ_DEV&offset=0';

module.exports = {
  '@tags': ['e2etest', 'primo'],

  'Test reusable components are applied to New Primo UI' : function (client) {
  // common uql checks
  client
    .url(urlTest)
    .pause(10000) // allow time for the page to load minimal components
    // new primo UI doesn't have footer, only header
    .assert.elementPresent('uq-minimal-header', 'uq header component is present')
    .assert.elementPresent('uq-minimal-header uql-global-links', 'uq global links header component is present')
    .assert.containsText('.library-title a', 'UQ Library')
    .assert.elementPresent('uql-askus-button', 'uql askus component is present')
    // primo specific checks
    .assert.elementPresent('prm-brief-result-container', 'at least one primo result is present')
    .end();
  }
};
