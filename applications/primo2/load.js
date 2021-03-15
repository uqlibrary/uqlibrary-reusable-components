var fixUserArea = setInterval(function() {
    //wait for header to be inserted by angular
    if (document.querySelector('uq-minimal-header') !== null && typeof(document.querySelector('uq-minimal-header')) !== 'undefined') {
        clearInterval(fixUserArea);
    }
}, 100);

// enable GTM
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W4KK37');



function mergeUtilityAreaAndPrimoLoginBar() {
    console.log('mergeUtilityAreaAndPrimoLoginBar');
    let askusComplete = false;
    const mergeAreas = setInterval(() => {
        // move the askus button into primo login bar
        const uqSiteHeader = document.querySelector('uq-site-header');
        const askusButton = !!uqSiteHeader && uqSiteHeader.getElementsByTagName('askus-button')[0] || false;
        console.log('mergeUtilityAreaAndPrimoLoginBar: askusButton = ', askusButton);
        if (!!askusButton && !askusComplete) {
            const parentDiv = document.getElementsByTagName('prm-search-bookmark-filter')[0] || false;
            console.log('mergeUtilityAreaAndPrimoLoginBar: parentDiv = ', parentDiv);

            !!parentDiv && parentDiv.prepend(askusButton);

            askusComplete = true;

            // then shift the primo login bar up a bit, to visually merge the 2 lines
            const primoLoginBar = document.getElementsByClassName('top-nav-bar layout-row ')[0] || false;
            console.log('mergeUtilityAreaAndPrimoLoginBar: primoLoginBar = ', primoLoginBar);
            !!primoLoginBar && (primoLoginBar.style.marginTop = '-55px');
            !!primoLoginBar && (primoLoginBar.style.marginRight = '10px'); // menu dots need a little more space

            clearInterval(mergeAreas);
        }
    }, 300); // check for div periodically
}
