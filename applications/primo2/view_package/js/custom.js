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
    template: '<div layout="row"><uqlibrary-alerts></uqlibrary-alerts></div>' +
      '<div layout="row"><uq-minimal-header show-login-button="false"></uq-minimal-header></div>'
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

  /*
    * this is on hold until May, when the newspaper-articles exclusion will apparently move out of the url
    * Problems with this 'lock facets' code
    * it cant remove multiple facets on a subsequent load
    * eg
    * 1. search 'library' on homepage, it loads & locks facets newspaper_articles and reviews
    * 2. return to homepage and search 'books' - only one of 'reviews' and 'newspaper_articles' will be removed
    *
    * Incomplete:
    * - I havent quite got the physical items search working properly yet (&facet=tlevel,include,physical_items)
    * ** the immediate prior version handle tlevel, but is too slow - consider how it is handling tlevel & library, though
    * - and this still needs cleaning up
    *
    * sample searches:
    * https://uq-edu-primo-sb.hosted.exlibrisgroup.com/primo-explore/search?query=any,contains,frogs&tab=61uq_all&search_scope=61UQ_All&sortby=rank&vid=61UQ_DEV&facet=rtype,include,books&facets=locked
    * https://uq-edu-primo-sb.hosted.exlibrisgroup.com/primo-explore/search?query=any,contains,frogs&tab=61uq_all&search_scope=61UQ_All&sortby=rank&vid=61UQ_DEV&facet=rtype,include,media&facets=locked
    * https://uq-edu-primo-sb.hosted.exlibrisgroup.com/primo-explore/search?query=any,contains,frogs&tab=61uq_all&search_scope=61UQ_All&sortby=rank&vid=61UQ_DEV&facet=rtype,exclude,newspaper_articles&facet=rtype,exclude,reviews&offset=0&facets=locked
    *
   */

  // lock facets
  // Based on code supplied by Univerisity of Otago eg. https://otago.hosted.exlibrisgroup.com/primo-explore/search?query=any,contains,frogs&tab=default_tab&search_scope=All&vid=DUNEDIN&facet=rtype,exclude,reviews&offset=0&ref=http:%2F%2Fmarvin.otago.ac.nz
  // add '&facets=locked' tag to any referer to a search results page you want this to happen on
  // app.controller('prmExploreMainAfterController', function($scope) {
  //    setTimeout(function(){
  //      var tag = "facets=locked";
  //      if (!(window.location.search.indexOf(tag) > 0 && window.location.search.indexOf("facet=") > 0)) {
  //        return;
  //      }
  //
  //      waitForElementToDisplay('prm-breadcrumbs div div div button prm-icon > md-icon', 1000);
  //
  //      function waitForElementToDisplay(selector, time) {
  //        if (document.querySelector(selector) !== null) {
  //          // in the case where this is a second search via the homepage, we need to unlock previous locked ones
  //          // this means we need to hard code a list to check, because this page doesnt know what other search options are provided on the home page
  //          // if any future queries add different facets, this list will have to be updated
  //          // key = value in url eg books in facet=rtype,exclude,books
  //          // value = value on aria-label element of button to be clicked
  //          var validFacets = {
  //            'reviews': 'Reviews',
  //            'books': 'Books',
  //            'newspaper_articles': 'Newspaper Articles',
  //            'articles': 'Articles',
  //            'media': 'Video & Audio',
  //            'physical_items': 'Physical items'
  //          };
  //
  //          var queries = window.location.search.split('&');
  //          if (queries.length > 1) {
  //            var facetsInUrl = [];
  //            queries.map(function (e) {
  //              // get the facet in the from all the different types
  //              if (0 === e.indexOf("facet=rtype,exclude,")) {
  //                facetsInUrl.push(e.replace("facet=rtype,exclude,", ''));
  //              } else if (0 === e.indexOf("facet=rtype,include,")) {
  //                facetsInUrl.push(e.replace("facet=rtype,include,", ''));
  //              } else if (0 === e.indexOf("facet=tlevel,exclude,")) {
  //                facetsInUrl.push(e.replace("facet=tlevel,exclude,", ''));
  //              } else if (0 === e.indexOf("facet=tlevel,include,")) {
  //                facetsInUrl.push(e.replace("facet=tlevel,include,", ''));
  //              }
  //            });
  //
  //            // do all the settings first because the later facet removal refreshes the page, losing our tag
  //            var facet, ariaLabel, facetSelector;
  //            for (facet in validFacets) {
  //              if (facetsInUrl.indexOf(facet) !== -1) {
  //                // found in the url - lock it
  //                ariaLabel = 'Make this filter persistent throughout the session ' + validFacets[facet];
  //                facetSelector = document.querySelector('[aria-label="' + ariaLabel + '"]');
  //                if (facetSelector !== null) {
  //                  angular.element(facetSelector).triggerHandler('click');
  //                }
  //              }
  //            }
  //
  //            var thisFacet, ariaLabelLock, facetSelectorLock;
  //            for (facet in validFacets) {
  //              if (facetsInUrl.indexOf(facet) !== -1) {
  //                // skip any that are for this page
  //              } else {
  //                // remove a facet if it was locked from an earlier search
  //                thisFacet = validFacets[facet];
  //                ariaLabel = 'Remove Content type ' + thisFacet;
  //                facetSelector = document.querySelector('[aria-label="' + ariaLabel + '"]'); // the x (remove) button exists to click
  //                ariaLabelLock = 'Cancel persistence ' + thisFacet;
  //                facetSelectorLock = document.querySelector('[aria-label="' + ariaLabelLock + '"]'); // the 'locked' button exists - this is one we should remove
  //                if (facetSelector !== null && facetSelectorLock !== null) {
  //                  angular.element(facetSelector).triggerHandler('click');
  //                  //once this is clicked the page will refresh and wont have our tag on the end :(
  //                  // so only one is ever done :(
  //                }
  //              }
  //            }
  //
  //            return;
  //          }
  //          else {
  //            setTimeout(function () {
  //              waitForElementToDisplay(selector, time);
  //            }, time);
  //          }
  //        }
  //      }
  //    }, 2500);
  //  });
  //
  //  app.component('prmExploreMainAfter', {
  //    bindings: {
  //      parentCtrl: '<'
  //    },
  //    controller: 'prmExploreMainAfterController'
  //  });
  // End lock facets

  // if the record is one of certain types, the 'Available Online' link should open View It, instead of jumping straight to the resource
  // (this is because there are usually multiple resources, and the default one may not be the best)
  app.controller('prmOpenSpecificTypesInFullController', [
    function () {
      var vm = this;
      vm.$onInit = function () {
        var resourceType = (!!vm.parentCtrl.result && !!vm.parentCtrl.result.pnx && !!vm.parentCtrl.result.pnx.display && !!vm.parentCtrl.result.pnx.display.type && vm.parentCtrl.result.pnx.display.type[0]) || '';
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
          head.appendChild(script);
        }
      }
    }
  }

  function insertLink(link) {
    var linkTag = document.querySelector("link[href*='" + link.href + "']");
    if (!linkTag) {
      var heads = document.getElementsByTagName("head");
      if (heads && heads.length) {
        var head = heads[0];
        if (head) {
          linkTag = document.createElement('link');
          linkTag.setAttribute('href', link.href);
          linkTag.setAttribute('rel', link.rel);
          head.appendChild(linkTag);
        }
      }
    }
  }

  // this script should only be called on views that have UQ header showing
  var branchName = '/'; // default. Use for prod
  if (window.location.hostname === 'search.library.uq.edu.au') {
    if (/vid=61UQ_DEV/.test(window.location.href)) {
      branchName = '/primo-prod-dev/';
    }
  } else {
    if (/vid=61UQ_DEV/.test(window.location.href)) {
      branchName = '/primo-sand-box-dev/';
    } else if (/vid=61UQ/.test(window.location.href)) {
      branchName = '/primo-sand-box/';
    }
  }

  var links = [
    { rel: 'import', href: '//assets.library.uq.edu.au' + branchName + 'reusable-components/elements.vulcanized.html' },
    { rel: 'stylesheet', href: '//assets.library.uq.edu.au' + branchName + 'reusable-components/primo2/custom-styles.css' }
  ];
  insertLink(links[0]);
  insertLink(links[1]);

  var scripts = [
    '//assets.library.uq.edu.au' + branchName + 'reusable-components/webcomponentsjs/webcomponents-lite.min.js',
    '//assets.library.uq.edu.au' + branchName + 'reusable-components/resources/preloader.js',
    '//assets.library.uq.edu.au' + branchName + 'reusable-components/primo2/load.js',
  ];
  insertScript(scripts[0]);
  insertScript(scripts[1]);
  insertScript(scripts[2]);

  // Temporarily manually supply the style to hide all the Report A Problem button
  // because they get eleventy-three buttons if they dont have the latest style sheet (Chrome caches it horribly well)
  // This can probably be removed on our next load of work on Primo
  var css = 'div > getit-link-service { display: none; }',
      head = document.head || document.getElementsByTagName('head')[0],
      style = document.createElement('style');
  head.appendChild(style);
  style.setAttribute('type', 'text/css');
  style.appendChild(document.createTextNode(css));
})();
