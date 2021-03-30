(function () {
  "use strict";

  var app = angular.module('viewCustom', ['angularLoad']);

  app.run(['$rootScope', '$location', '$window', function ($rootScope, $location, $window) {
    //record GA page view event to new primo tracker GA ID
    $rootScope.$on('$locationChangeSuccess', function (event) {
      //temporarily create a tracker specifically to new Primo
      if ($window.ga) {
        $window.ga(function () {
          $window.ga('create', 'UA-4365437-14', 'search.library.uq.edu.au', 'NewPrimoTracker');
        });
        $window.ga('NewPrimoTracker.send', 'pageview', { location: $location.url() });
      }
    });

  }]);

  app.component('prmTopBarBefore', {
    // we found it was more robust to insert the askus button in the different page location via primo angular, see below,
    // so completely skip inserting elements "by attribute"
    template: '<uq-header hideLibraryMenuItem="true" searchLabel="library.uq.edu.au" searchURL="http://library.uq.edu.au" skipnavid="searchBar"></uq-header>' +
        '<uq-site-header hideMyLibrary hideAskUs></uq-site-header>'
  });

  app.component('prmTopbarAfter', {
    template: '<alert-list></alert-list>'
  });

  app.component('prmSearchBookmarkFilterAfter', {
    controller: function($scope){
      // move the primo-login-bar up so it overlaps uq-site-header and is visually one bar
      const primoLoginBar = document.querySelector('prm-topbar>div.top-nav-bar.layout-row') || false;
      !!primoLoginBar && (primoLoginBar.style.marginTop = '-61px');
    },
    template: '<askus-button nopaneopacity></askus-button>'
  });

  // based on https://knowledge.exlibrisgroup.com/Primo/Community_Knowledge/How_to_create_a_%E2%80%98Report_a_Problem%E2%80%99_button_below_the_ViewIt_iframe
  app.component('prmFullViewServiceContainerAfter', {
    bindings: {parentCtrl: '<'},
    controller: function($scope){
      var vm = this;

      vm.targeturl = '';

      var recordId = '';
      // no one knows what the TN actually means (per SVG), but in practice all the CDI records have it on their record id
      if (!!vm.parentCtrl.item.pnx && !!vm.parentCtrl.item.pnx.control && !!vm.parentCtrl.item.pnx.control.recordid &&
          vm.parentCtrl.item.pnx.control.recordid[0] && vm.parentCtrl.item.pnx.control.recordid[0].startsWith('TN')) {
        recordId = encodeURIComponent(vm.parentCtrl.item.pnx.control.recordid);
      }
      if (recordId === '') {
        if (!!vm.parentCtrl.item.pnx && !!vm.parentCtrl.item.pnx.search && !!vm.parentCtrl.item.pnx.search.recordid) {
          recordId = encodeURIComponent(vm.parentCtrl.item.pnx.search.recordid);
        }
      }
      if (recordId === '') {
        // from http://stackoverflow.com/questions/11582512/how-to-get-url-parameters-with-javascript/11582513#11582513
        var fieldname = 'docid';
        var temp = encodeURIComponent((new RegExp('[?|&]' + fieldname + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search) || [null, ''])[1].replace(/\+/g, '%20')) || null;
        if (temp !== null) {
          recordId = temp;
        }
      }

      var recordTitle = '';
      if (recordId !== '' && !!vm.parentCtrl.item.pnx && !!vm.parentCtrl.item.pnx.search && !!vm.parentCtrl.item.pnx.search.title && !!vm.parentCtrl.item.pnx.search.title[0]) {
        recordTitle = encodeURIComponent(vm.parentCtrl.item.pnx.search.title[0]);
      }
      if (recordTitle === '' && recordId !== '' && !!vm.parentCtrl.item.pnx && !!vm.parentCtrl.item.pnx.display && !!vm.parentCtrl.item.pnx.display.title && !!vm.parentCtrl.item.pnx.display.title[0]) {
        recordTitle = encodeURIComponent(vm.parentCtrl.item.pnx.display.title[0]);
      }
      if (recordTitle !== '') {
        var maxNumberCharCRMCanAccept = 239;
        recordTitle = recordTitle.trim().substring(0, maxNumberCharCRMCanAccept);
      }

      var isIE11 = navigator.userAgent.indexOf('MSIE') !== -1 || navigator.appVersion.indexOf('Trident/') > -1;

      // if we are not IE11 and can get a docid and a title - add a button
      if (!isIE11 && recordId !== '' && recordTitle !== '') {
        var crmDomain = 'https://uqcurrent--tst1.custhelp.com'; // we can probably return the live url for all when this is in prod
        if (window.location.hostname === 'search.library.uq.edu.au') {
          crmDomain = 'https://support.my.uq.edu.au';
        }

        vm.targeturl = crmDomain + "/app/library/contact/report_problem/true/incidents.subject/" + recordTitle + "/incidents.c$summary/" + recordId;
      }
    },
    template : '<div ng-if="$ctrl.targeturl"><getit-link-service>' +
        '<button class="help-button md-button md-primoExplore-theme md-ink-ripple" type="button" data-ng-click="buttonPressed($event)" aria-label="Report a Problem" aria-hidden="false">' +
        '<a ng-href="{{$ctrl.targeturl}}" target="_blank">Report a Problem</a>' +
        '</button>' +
        '</getit-link-service></div>'
  });

  /****************************************************************************************************/

  /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

  /*var app = angular.module('centralCustom', ['angularLoad']);*/

  /****************************************************************************************************/

  // if the record is one of certain types, the 'Available Online' link should open View It, instead of jumping straight to the resource
  // (this is because there are usually multiple resources, and the default one may not be the best)
  app.controller('prmOpenSpecificTypesInFullController', [
    function () {
      var vm = this;
      vm.$onInit = function () {
        var resourceType = (!!vm.parentCtrl.result && !!vm.parentCtrl.result.pnx && !!vm.parentCtrl.result.pnx.display &&
            !!vm.parentCtrl.result.pnx.display.type && vm.parentCtrl.result.pnx.display.type.length > 0 &&
            vm.parentCtrl.result.pnx.display.type[0]) || '';
        if (resourceType === 'journal' || resourceType === 'newspaper') {
          vm.parentCtrl.isDirectLink = function () { return false; };
        }
      };
    }
  ]);
  app.component('prmOpenSpecificTypesInFull', {
    bindings: { parentCtrl: '<' },
    controller: 'prmOpenSpecificTypesInFullController'
  });
  app.component('prmSearchResultAvailabilityLineAfter', {
    bindings: { parentCtrl: '<' },
    template: '<prm-open-specific-types-in-full parent-ctrl="$ctrl.parentCtrl"></prm-open-specific-types-in-full>'
  });

  function insertScript(url) {
    var script = document.querySelector("script[src*='" + url + "']");
    if (!script) {
      var heads = document.getElementsByTagName("head");
      if (heads && heads.length) {
        var head = heads[0];
        if (head) {
          script = document.createElement('script');
          script.setAttribute('src', url);
          script.setAttribute('type', 'text/javascript');
          script.setAttribute('defer', '');
          head.appendChild(script);
        }
      }
    }
  }

  function insertStylesheet(href) {
    var linkTag = document.querySelector("link[href*='" + href + "']");
    if (!linkTag) {
      var heads = document.getElementsByTagName("head");
      if (heads && heads.length) {
        var head = heads[0];
        if (head) {
          linkTag = document.createElement('link');
          linkTag.setAttribute('href', href);
          linkTag.setAttribute('rel', 'stylesheet');
          head.appendChild(linkTag);
        }
      }
    }
  }

  // this script should only be called on views that have UQ header showing
  var folder = '/'; // default. Use for prod.
  if (window.location.hostname === 'search.library.uq.edu.au') {
    if (/vid=61UQ_DEV/.test(window.location.href)) {
      folder = '-development/primo-prod-dev/';
    }
  } else {
    if (/vid=61UQ_DEV/.test(window.location.href)) {
      folder = '-development/primo-sandbox-dev/';
    } else if (/vid=61UQ/.test(window.location.href)) {
      folder = '-development/primo-sandbox/';
    }
  }

  // this script should only be called on views that have UQ header showing
  insertScript('https://assets.library.uq.edu.au/reusable-webcomponents' + folder + 'uq-lib-reusable.min.js');
  // we dont yet need this script, but if we do it should be in this location
  // insertScript('https://assets.library.uq.edu.au/reusable-webcomponents' + folder + 'applications/primo/load.js');
  insertStylesheet('https://assets.library.uq.edu.au/reusable-webcomponents' + folder + 'applications/primo/custom-styles.css');
})();
