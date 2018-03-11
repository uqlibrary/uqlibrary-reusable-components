(function () {
  "use strict";

  var app = angular.module('viewCustom', ['angularLoad']);

  app.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){
    //record GA page view event to new primo tracker GA ID
    $rootScope.$on('$locationChangeSuccess', function(event){
      //temporarily create a tracker specifically to new Primo
      if ($window.ga) {
        $window.ga(function () {
          $window.ga('create', 'UA-4365437-14', 'search.library.uq.edu.au', 'NewPrimoTracker');
        });
        $window.ga('NewPrimoTracker.send', 'pageview', {location: $location.url()});
      }
    });

  }]);

  app.component('prmTopBarBefore', {
    template: '<div layout="row"><uqlibrary-alerts></uqlibrary-alerts></div>' +
    '<div layout="row"><uq-minimal-header show-login-button="false"></uq-minimal-header></div>'
  });

  /****************************************************************************************************/

  /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

  /*var app = angular.module('centralCustom', ['angularLoad']);*/

  /****************************************************************************************************/

  // Begin BrowZine - Primo Integration...
  // per https://thirdiron.atlassian.net/wiki/spaces/BrowZineAPIDocs/pages/79200260/Ex+Libris+Primo+Integration

  // Define Angular module and whitelist URL of server with Node.js script
  app.constant('nodeserver', "https://apiconnector.thirdiron.com/v1/libraries/1508")
    .config(['$sceDelegateProvider', 'nodeserver', function ($sceDelegateProvider, nodeserver) {
      var urlWhitelist = $sceDelegateProvider.resourceUrlWhitelist();
      urlWhitelist.push(nodeserver + '**');
      $sceDelegateProvider.resourceUrlWhitelist(urlWhitelist);
    }]);

  // Add Article In Context & BrowZine Links
  app.controller('prmSearchResultAvailabilityLineAfterController', function($scope, $http, nodeserver) {
    var vm = this;
    $scope.book_icon = "https://s3.amazonaws.com/thirdiron-assets/images/integrations/browzine_open_book_icon.png";
    if (vm.parentCtrl.result.pnx.addata.doi && vm.parentCtrl.result.pnx.display.type[0] == 'article')  {
      vm.doi = vm.parentCtrl.result.pnx.addata.doi[0] || '';
      var articleURL = nodeserver + "/articles?DOI=" + vm.doi;
      $http.jsonp(articleURL, {jsonpCallbackParam: 'callback'}).then(function(response) {
        $scope.article = response.data;
      }, function(error){
        console.log(error);
      });
    }
    if (vm.parentCtrl.result.pnx.addata.issn && vm.parentCtrl.result.pnx.display.type[0] == 'journal')  {
      vm.issn = vm.parentCtrl.result.pnx.addata.issn[0].replace("-", "") || '';
      var journalURL = nodeserver + "/journals?ISSN=" + vm.issn;
      $http.jsonp(journalURL, {jsonpCallbackParam: 'callback'}).then(function(response) {
        $scope.journal = response.data;
      }, function(error){
        console.log(error);
      });
    }

  });

  // Below is where you can customize the wording that is displayed (as well as the hover over text) for the BrowZine links.
  // St Olaf has chosen "View Journal Contents" for the "Journal Availability Link" but other great options include things such as "View Journal" or "View this Journal"
  // St Olaf is using "View Issue Contents" for the "Article in Context" link but another great option is "View Complete Issue" or "View Article in Context".
  // St Olaf also has added a hover over link that says "Via BrowZine" to emphasize the interaction being used.

  app.component('prmSearchResultAvailabilityLineAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchResultAvailabilityLineAfterController',
    template: '<div ng-if="article.data.browzineWebLink">' +
    '<a href="{{ article.data.browzineWebLink }}" target="_blank" title="Browzine displays a journal\'s entire table of contents and more.">' +
    '<img src="https://s3.amazonaws.com/thirdiron-assets/images/integrations/browzine_open_book_icon.png" class="browzine-icon">' +
    ' View issue contents in Browzine ' +
    '<md-icon md-svg-icon="primo-ui:open-in-new" aria-label="icon-open-in-new" role="img" class="browzine-external-link">' +
    '<svg id="open-in-new_cache29" width="100%" height="100%" viewBox="0 0 24 24" y="504" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">' +
    '</svg>' +
    '</md-icon>' +
    '</a>' +
    '</div>' +
    '<div ng-if="journal.data[0].browzineWebLink">' +
    '<a href="{{ journal.data[0].browzineWebLink }}" target="_blank" title="Browzine displays a journal\'s entire table of contents and more.">' +
    '<img src="https://s3.amazonaws.com/thirdiron-assets/images/integrations/browzine_open_book_icon.png" class="browzine-icon">' +
    ' View journal contents in Browzine ' +
    '<md-icon md-svg-icon="primo-ui:open-in-new" aria-label="icon-open-in-new" role="img" class="browzine-external-link">' +
    '<svg id="open-in-new_cache29" width="100%" height="100%" viewBox="0 0 24 24" y="504" xmlns="http://www.w3.org/2000/svg" fit="" preserveAspectRatio="xMidYMid meet" focusable="false">' +
    '</svg>' +
    '</md-icon>' +
    '</a>' +
    '</div>'
  });

  // Add Journal Cover Images from BrowZine
  app.controller('prmSearchResultThumbnailContainerAfterController', function ($scope, $http, nodeserver) {
    var vm = this;
    var newThumbnail = '';
    // checking for item property as this seems to impact virtual shelf browse (for reasons as yet unknown)
    if (vm.parentCtrl.item && vm.parentCtrl.item.pnx.addata.issn) {
      vm.issn = vm.parentCtrl.item.pnx.addata.issn[0].replace("-", "") || '';
      var journalURL = nodeserver + "/journals?ISSN=" + vm.issn;
      $http.jsonp(journalURL, { jsonpCallbackParam: 'callback' }).then(function (response) {
        if (response.data.data["0"] && response.data.data["0"].browzineEnabled)  {
          newThumbnail = response.data.data["0"].coverImageUrl;
        }
      }, function (error) {
        console.log(error); //
      });
    }
    vm.$doCheck = function (changes) {
      if (vm.parentCtrl.selectedThumbnailLink) {
        if (newThumbnail !== '') {
          vm.parentCtrl.selectedThumbnailLink.linkURL = newThumbnail;
        }
      }
    };
  });

  app.component('prmSearchResultThumbnailContainerAfter', {
    bindings: { parentCtrl: '<' },
    controller: 'prmSearchResultThumbnailContainerAfterController'
  });
  // End BrowZine - Primo Integration

  // locked facets
  // Based on code supplied by Otago eg. https://otago.hosted.exlibrisgroup.com/primo-explore/search?query=any,contains,frogs&tab=default_tab&search_scope=All&vid=DUNEDIN&facet=rtype,exclude,reviews&offset=0&ref=http:%2F%2Fmarvin.otago.ac.nz
  /* make "New Search" clear locked facets */
  app.controller('prmExploreMainAfterController', function($scope) {
    setTimeout(function(){
      var currentURL = $scope.$parent.$ctrl.searchService.$location.$$absUrl;
      var newSearchURL = 'https://otago.hosted.exlibrisgroup.com/primo-explore/search?vid=DUNEDIN&lang=en_US&sortby=rank';
      var newSearchURL2 = 'https://otago.hosted.exlibrisgroup.com/primo-explore/search?vid=DUNEDIN&sortby=rank';
      // if we're on the new search page, clear all sticky facets and add review exclude facet
      if (currentURL == newSearchURL || currentURL == newSearchURL2) {
        var stickyFacets = $scope.$parent.$ctrl.searchService.facetService.getStickyFacets();
        for (var i = 0; i < stickyFacets.length; i++) {
          $scope.$parent.$ctrl.searchService.facetService.removeStickyFacet(stickyFacets[i]);
        }

        //add reviews facet
        var reviewFacet = {name: "rtype", type: "exclude", value: "reviews", displayedType: "exact", displayValue: "reviews", label: "Reviews", operation: "add", persistent: false, tooltip: "Remove Type Reviews"};
        $scope.$parent.$ctrl.searchService.facetService.addStickyFacet(reviewFacet);
      }
    }, 2500);

    // convert review facet to sticky
    if (window.location.href.indexOf("http:%2F%2Fmarvin.otago.ac.nz") > 0) {
      waitForElementToDisplay('prm-breadcrumbs div div div button prm-icon > md-icon', 1000);

      function waitForElementToDisplay(selector, time) {
        if(document.querySelector(selector) !=null) {
          var reviewFacetSelector = document.querySelector('[aria-label="Make this filter persistent throughout the session Reviews"]');
          angular.element(reviewFacetSelector).triggerHandler('click');
          return;
        }
        else {
          setTimeout(function() {
            waitForElementToDisplay(selector, time);
          }, time);
        }
      }
    }
  });

  app.component('prmExploreMainAfter', {
    bindings: {
      parentCtrl: '<'
    },
    controller: 'prmExploreMainAfterController'
  });
  // End lock facets


  function insertScript(url) {
    var script = document.querySelector("script[src*='"+url+"']");
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
    var linkTag = document.querySelector("link[href*='"+link.href+"']");
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

  var scripts = [
    '//assets.library.uq.edu.au/master/reusable-components/webcomponentsjs/webcomponents-lite.min.js',
    '//assets.library.uq.edu.au/master/reusable-components/resources/preloader.js',
    '//assets.library.uq.edu.au/master/reusable-components/primo2/load.js'
  ];

  var links = [
    { rel: 'import', href: '//assets.library.uq.edu.au/master/reusable-components/elements.vulcanized.html'},
    { rel: 'stylesheet', href: '//assets.library.uq.edu.au/master/reusable-components/primo2/custom-styles.css'}
  ];

  insertLink(links[0]);
  insertLink(links[1]);

  insertScript(scripts[0]);
  insertScript(scripts[1]);
  insertScript(scripts[2]);

})();
