

var fixUserArea = setInterval(function() {
    //wait for header to be inserted by angular
    if (document.querySelector('uq-minimal-header') !== null && typeof(document.querySelector('uq-minimal-header')) !== 'undefined' ) {
        clearInterval(fixUserArea);
        var headerOffset = angular.element(document.querySelector('.top-nav-bar')).prop('offsetTop');
        document.querySelector('md-fab-toolbar').style.top = offset + 'px';
    }
}, 100);

// enable GTM
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
    new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
    j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
    'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-W4KK37');

// <uqlibrary-alerts class="x-scope uqlibrary-alerts-0"><div class="alerts-container style-scope uqlibrary-alerts"><uqlibrary-api-alerts id="alertsApi" class="style-scope uqlibrary-alerts"><uqlibrary-api id="list" class="style-scope uqlibrary-api-alerts"><iron-ajax id="ajax" handleas="json" class="style-scope uqlibrary-api" hidden=""></iron-ajax></uqlibrary-api></uqlibrary-api-alerts><uqlibrary-ga id="ga" class="style-scope uqlibrary-alerts"><uqlibrary-gtm id="gtm" class="style-scope uqlibrary-ga"></uqlibrary-gtm></uqlibrary-ga><div class="alert-container alert-urgent style-scope uqlibrary-alerts"><div class="alert-icon-container style-scope uqlibrary-alerts"><iron-icon icon="icons:warning" aria-label="warning icon" class="style-scope uqlibrary-alerts x-scope iron-icon-0"><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" class="style-scope iron-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope iron-icon"><path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" class="style-scope iron-icon"></path></g></svg></iron-icon><template is="dom-if" class="style-scope uqlibrary-alerts"></template><template is="dom-if" class="style-scope uqlibrary-alerts"></template></div><div class="alert-text-container caption style-scope uqlibrary-alerts"><strong class="style-scope uqlibrary-alerts">[Updated 10.50am] You may be experiencing problems accessing websites.</strong> A UQ network issue is affecting access to UQ Library Search, resources and course materials, including in Learn.UQ (Blackboard). UQ IT Services are working on a solution. We apologise for the inconvenience.<a aria-label="More details about [Updated 10.50am] You may be experiencing problems accessing websites." class="style-scope uqlibrary-alerts"></a><template is="dom-if" if="[[item.url" class="style-scope uqlibrary-alerts"></template></div><div class="alert-close-container style-scope uqlibrary-alerts"><paper-icon-button icon="icons:close" alt="Close alert" aria-label="Close alert" class="style-scope uqlibrary-alerts x-scope paper-icon-button-0" role="button" tabindex="0" aria-disabled="false"><iron-icon id="icon" class="style-scope paper-icon-button x-scope iron-icon-1" alt="Close alert"><svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" class="style-scope iron-icon" style="pointer-events: none; display: block; width: 100%; height: 100%;"><g class="style-scope iron-icon"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" class="style-scope iron-icon"></path></g></svg></iron-icon></paper-icon-button></div></div><template is="dom-repeat" class="style-scope uqlibrary-alerts"></template></div></uqlibrary-alerts>

