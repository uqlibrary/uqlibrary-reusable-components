var minimalUql = require('./e2e.minimal.js');
// test for something basic that should always return results
var searchText = 'book';
var urlTest = 'http://search.library.uq.edu.au/primo_library/libweb/action/search.do?fn=search&ct=search&initialSearch=true&mode=Basic&tab=61uq_all&indx=1&dum=true&srt=rank&vid=61UQ&frbg=&tb=t&vl%28freeText0%29='+searchText+'&scp.scps=scope%3A%2861UQ%29%2Cprimo_central_multiple_fe&vl%281UIStartWith0%29=contains&vl%28D75285834UI0%29=any&vl%28D75285834UI0%29=title&vl%28D75285834UI0%29=any';

module.exports = {
  '@tags': ['e2etest', 'primo'],

  'Test reusable components are applied to Primo' : function (client) {
    // common uql checks
    minimalUql.commonChecks(client, urlTest);

    // primo specific checks
    client
      .assert.elementPresent('tr#exlidResult0 h2', 'at least one primo result is present')
      .end();

  }

};
