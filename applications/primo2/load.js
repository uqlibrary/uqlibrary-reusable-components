var primoViewHasLoaded = setInterval(function() {
    //wait for primo's angular to load itself (eg replaces primo-explore contents with angular contents, then insert header)
    if (document.querySelector('noscript') === null || typeof(document.querySelector('noscript')) === 'undefined' ) {
        clearInterval(primoViewHasLoaded);
        insertReusableComponents();
    }
}, 50);

function insertReusableComponents() {
    // insert elements, even before Polymer is loaded
    // first element of the original document
    var firstElement = document.querySelector('primo-explore');

    // insert header inside primo's view
    var header = document.createElement('uq-minimal-header');
    header.setAttribute("show-login-button", "false");
    firstElement.insertBefore(header, firstElement.firstChild);

    // insert alerts inside primo's view
    var alerts = document.createElement('uqlibrary-alerts');
    firstElement.insertBefore(alerts, firstElement.firstChild);

    // while new PrimoUI has infinite scrolling, do not include footer
    // // insert sub footer before body-tag
    // var subFooter = document.createElement('uql-connect-footer');
    // document.body.appendChild(subFooter);
    //
    // // insert footer before body-tag
    // var footer = document.createElement('uq-minimal-footer');
    // document.body.appendChild(footer);

    var headerHasLoaded = setInterval(function() {
        //wait for primo's angular to load itself (eg replaces primo-explore contents with angular contents, then insert header)
        if (document.querySelector('uqlibrary-ga') !== null && typeof(document.querySelector('uqlibrary-ga')) !== 'undefined' ) {
            clearInterval(headerHasLoaded);

            // move user area into header when polymer has loaded
            var header = document.querySelector('uq-minimal-header');
            var userArea = document.querySelector('prm-user-area');
            if (header && userArea) {
                header.appendChild(userArea);
            }
        }
    }, 50);
}

// enable GTM
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W4KK37');

