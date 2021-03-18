// function getBranchName() {
//     let branchName = '/'; // default. Use for prod
//     if (window.location.hostname === 'search.library.uq.edu.au') {
//         if (/vid=61UQ_DEV/.test(window.location.href)) {
//             branchName = '/primo-prod-dev/';
//         }
//     } else {
//         if (/vid=61UQ_DEV/.test(window.location.href)) {
//             branchName = '/primo-sand-box-dev/';
//         } else if (/vid=61UQ/.test(window.location.href)) {
//             branchName = '/primo-sand-box/';
//         }
//     }
//     return branchName;
// }
//
// function loadLibraryTitleStyleSheet(shadowDom) {
//     linkTag = document.createElement('link');
//     linkTag.setAttribute('href', '//assets.library.uq.edu.au' + getBranchName() + 'reusable-components/primo2/webcomponents/custom-styles.css');
//     linkTag.setAttribute('rel', 'stylesheet');
//     shadowDom.appendChild(linkTag);
// }
//
// function reAddSiteHeaderTitle(shadowDom) {
//     console.log('reAddSiteHeaderTitle');
//     const textOfLink = document.createTextNode('Library');
//
//     const siteTitleLinkShadow = document.createElement('a');
//     siteTitleLinkShadow.setAttribute('id', 'site-title');
//     siteTitleLinkShadow.setAttribute('href', 'http://www.library.uq.edu.au');
//     siteTitleLinkShadow.setAttribute('class', 'uq-site-header__title');
//     siteTitleLinkShadow.appendChild(textOfLink);
//
//     const uqSiteHeaderTitleContainerLeftShadow = document.createElement('div');
//     uqSiteHeaderTitleContainerLeftShadow.setAttribute('class', 'uq-site-header__title-container__left');
//     uqSiteHeaderTitleContainerLeftShadow.appendChild(siteTitleLinkShadow);
//
//     const uqSiteHeaderTitleContainerShadow = document.createElement('div');
//     uqSiteHeaderTitleContainerShadow.setAttribute('class', 'uq-site-header__title-container');
//     uqSiteHeaderTitleContainerShadow.appendChild(uqSiteHeaderTitleContainerLeftShadow);
//
//     const uqSiteHeaderShadow = document.createElement('div');
//     uqSiteHeaderShadow.setAttribute('class', 'uq-site-header');
//     uqSiteHeaderShadow.appendChild(uqSiteHeaderTitleContainerShadow);
//
//     shadowDom.appendChild(uqSiteHeaderShadow);
// }
//
// function isAskusButtonPresent() {
//     // we dont want to insert the button more than once, as it listens for it disappearing
//     const askusButton = document.querySelectorAll('askus-button');
//     return !!askusButton && askusButton.length > 0;
// }
//
// function isAskusButtonInPrimoLoginbar() {
//     // we dont want to insert the button more than once, as it listens for it disappearing
//     const parentDiv = document.getElementsByTagName('prm-search-bookmark-filter')[0] || false;
//     const askusButton = !!parentDiv && parentDiv.querySelectorAll('askus-button');
//     return !!askusButton && askusButton.length > 0;
// }
//
// // we only want to create the askus button once, as it makes api calls, so dont crreate it until we can use it
// function uqheaderPresent() {
//     const uqheader = document.querySelectorAll('uq-header');
//     return !!uqheader && uqheader.length > 0;
// }
//
// function moveUQItemsOnPage() {
//     const mergeAreas = setInterval(() => {
//         // this method:
//         // initially moves the askus button into the primo login bar
//         // moves the primo login bar up a bit to shorten the header
//         // however, certain page events WIPE the uq-site-header shadowdom, so this listener will then:
//         // recreate the site title "Library" and recreate and move the askus button again
//         if (uqheaderPresent() && !isAskusButtonPresent()) {
//             console.log('create ask us button');
//             askusButton = document.createElement('askus-button');
//         }
//         if (uqheaderPresent() && !isAskusButtonInPrimoLoginbar()) {
//             console.log('move askus button');
//             const primoLoginBarUtilityArea = document.getElementsByTagName('prm-search-bookmark-filter')[0] || false;
//             let askusButton = document.getElementsByTagName('askus-button')[0] || false;
//
//             !!askusButton && !!primoLoginBarUtilityArea && primoLoginBarUtilityArea.prepend(askusButton);
//
//             // the pane background-color muting is overriden by certain primo styling, so dont do it on primo
//             const askusShadow = !!askusButton && askusButton.shadowRoot || false;
//             const askusPane = !!askusShadow && askusShadow.getElementById("askus-pane") || false;
//             !!askusPane && (askusPane.style.backgroundColor = 'initial');
//
//             // then shift the primo login bar up a bit, to visually merge the 2 rows
//             const primoLoginBar = document.getElementsByClassName('top-nav-bar layout-row ')[0] || false;
//             !!primoLoginBar && (primoLoginBar.style.marginTop = '-61px');
//         }
//
//         // if the library site label "Library" isnt present, reinsert it
//         const uqSiteHeader = document.querySelector('uq-site-header') || false;
//         const shadowDom = !!uqSiteHeader && uqSiteHeader.shadowRoot || false;
//         const libraryTitle = !!shadowDom && shadowDom.getElementById('site-title');
//         if (!libraryTitle && !!shadowDom) {
//             loadLibraryTitleStyleSheet(shadowDom);
//             reAddSiteHeaderTitle(shadowDom);
//         }
//     }, 300); // check for div periodically as when they click the eg personalise checkbox, we have to reinsert the elements
// }
//
// moveUQItemsOnPage();
