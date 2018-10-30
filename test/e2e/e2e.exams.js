var minimalUql = require("./e2e.minimal.js");
var urlTest = 'https://www.library.uq.edu.au/exams/papers.php?stub=phil&startyear=2013&endyear=2017';

module.exports = {
    '@tags': ['e2etest', 'exams'],

    'Test reusable components are applied to Exams': function (client) {
        // common uql checks
        minimalUql.commonChecks(client, urlTest);
    }
};