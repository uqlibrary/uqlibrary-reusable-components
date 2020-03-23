function ready(fn) {
    if (document.readyState != 'loading'){
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

function loadReusableComponents() {
    addCss('//assets.library.uq.edu.au/reusable-components/omeka/custom-styles.css');

    addElements();
    //insert elements, even before Polymer is loaded

    //first element of the original document
    var firstElement = document.body.children[0];

    //insert alerts before header
    var alerts = document.querySelector('uqlibrary-alerts');
    if (!alerts) {
        //as a back up insert header if it's not defined already
        alerts = document.createElement('uqlibrary-alerts');
        document.body.insertBefore(alerts, firstElement);
    }

    // insert header after body-tag
    var header = document.createElement('uq-minimal-header');
    document.body.insertBefore(header, firstElement);

    // insert sub footer before body-tag
    var subFooter = document.createElement('uql-connect-footer');
    document.body.appendChild(subFooter);

    // insert footer before body-tag
    var footer = document.createElement('uq-minimal-footer');
    document.body.appendChild(footer);


    window.addEventListener('WebComponentsReady', function() {
        // when polymer is ready - configure elements
    });
}

function addElements() {
    var head = document.head,
        link = document.createElement('link');

    link.rel = 'import';
    link.href = '//assets.library.uq.edu.au/reusable-components/elements.vulcanized.html';
    link.async = true;

    head.appendChild(link);
}

function addCss(fileName) {

    var head = document.head,
        link = document.createElement('link');

    link.type = 'text/css';
    link.rel = 'stylesheet';
    link.href = fileName;

    head.appendChild(link);
}

ready(loadReusableComponents);
