

var fixUserArea = setInterval(function() {
    //wait for header to be inserted by angular
    if (document.querySelector('uq-minimal-header') !== null && typeof(document.querySelector('uq-minimal-header')) !== 'undefined') {
        clearInterval(fixUserArea);

        //remove unused favourites element
        var favouritesElement = document.querySelector('.top-nav-bar > prm-search-bookmark-filter');
        if (favouritesElement !== null && typeof(favouritesElement) !== 'undefined') {
            favouritesElement.parentNode.removeChild(favouritesElement);
        }
    }
}, 100);

// enable GTM
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W4KK37');


