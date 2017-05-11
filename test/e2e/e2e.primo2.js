// test for something basic that should always return results
var searchText = 'book';
var urlTest = 'https://search.library.uq.edu.au/primo-explore/search?query=any,contains,' + searchText + '&tab=61uq_all&search_scope=61UQ_All&sortby=rank&vid=61UQ&offset=0';

module.exports = {
    '@tags': ['e2etest', 'primo'],

    'Test reusable components are applied to New Primo UI': function (client) {
        // common uql checks
        client
            .url(urlTest)
            .pause(5000) // allow time for the page to load minimal components
            // new primo UI doesn't have footer, only header
            .waitForElementVisible('uq-minimal-header', 20000)
            .assert.elementPresent('uq-minimal-header', 'uq header component is present')
            .assert.elementPresent('uq-minimal-header uql-global-links', 'uq global links header component is present')
            .assert.containsText('.library-title a', 'UQ Library')
            .assert.elementPresent('uql-askus-button', 'uql askus component is present')
        // primo specific checks
            .assert.elementPresent('prm-brief-result-container', 'at least one primo result is present')
            .end();
    },

    'Test user area modifications have been applied': function (client) {
        client
            .url(urlTest)
            .pause(5000)
            .waitForElementVisible('prm-topbar', 20000)
            .assert.elementPresent('prm-topbar prm-user-area', 'user area component is present')
            .assert.elementPresent('prm-topbar prm-user-area prm-authentication', 'login component is present')
            .assert.elementPresent('prm-topbar prm-user-area prm-authentication span', 'login text is present')
            .assert.elementPresent('prm-topbar prm-user-area prm-library-card-menu', 'user account component is present')
            .assert.elementPresent('prm-topbar prm-user-area prm-search-bookmark-filter', 'bookmark component is present')
            .end();
    },

    'Test user area contains log in button': function (client) {
        client
            .url(urlTest)
            .pause(5000)
            .waitForElementVisible('prm-topbar', 20000)
            .expect.element('prm-topbar prm-user-area prm-authentication span').text.to.match(/(?:LOG IN|Log in)/);

        client.end();
    }
};
