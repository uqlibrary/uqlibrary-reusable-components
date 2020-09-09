var minimalUql = require("./e2e.minimal.js");

// test for something basic that should always return results
// (this url should match the primo landing url when you search for 'book' from the homepage search wudget)
var searchText = 'book';
var urlTest = 'https://search.library.uq.edu.au/primo-explore/search?query=any,contains,' + searchText + '&tab=61uq_all&search_scope=61UQ_All&vid=61UQ&offset=0';

module.exports = {
  '@tags': ['e2etest', 'primo'],

  'Test reusable components are applied to New Primo UI': function (client) {
    // Common uql checks
    // Primo UI doesn't have footer, only header
    minimalUql.commonChecks(client, urlTest, false);

    client
        // primo specific checks
        .assert.elementPresent('prm-brief-result-container', 'at least one primo result is present')
        .end();
  },

  'Test user area modifications have been applied': function (client) {
    client
        .url(urlTest)
        .pause(10000)
        .waitForElementPresent('prm-topbar', 20000)
        .assert.elementPresent('prm-topbar prm-user-area-expandable', 'user area component is present')
        .assert.elementPresent('prm-topbar prm-user-area-expandable button', 'login component is present')
        .assert.elementPresent('prm-topbar prm-user-area-expandable button.sign-in-btn-ctm span', 'login text is present')
        .assert.elementPresent('prm-topbar .top-nav-bar prm-search-bookmark-filter', 'bookmark component is present')
        .end();
    client.end();
  }
};
