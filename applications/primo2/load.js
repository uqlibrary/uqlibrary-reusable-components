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

            !!parentDiv && parentDiv.prepend(askusButton) || console.log('could not find prm-search-bookmark-filter');

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

mergeUtilityAreaAndPrimoLoginBar();
