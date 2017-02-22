var minimalUql = require('./e2e.minimal.js');
// test for something basic that should always return results
var searchText = 'book';
var urlTest = 'https://search.library.uq.edu.au/primo-explore/search?query=any,contains,'+searchText+'&tab=61uq_all&search_scope=61UQ_All&sortby=rank&vid=61UQ_DEV&offset=0';

module.exports = {
  '@tags': ['e2etest', 'primo'],

  'Test reusable components are applied to New Primo UI' : function (client) {
    // common uql checks
    minimalUql.commonChecks(client, urlTest);

    // primo specific checks
    client
      .assert.elementPresent('tr#exlidResult0 h2', 'at least one primo result is present')
      .end();

  }
};
