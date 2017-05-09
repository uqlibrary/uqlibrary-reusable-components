(function () {
  "use strict";

  var app = angular.module('viewCustom', ['angularLoad']);

  //record GA page view event to new primo tracker GA ID
  app.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window){

    // remove favourite element from nav-bar because it's included in user area overwrite
    $rootScope.$on("$stateChangeSuccess", function() {
      // Primo keeps adding favourites element every time user clicks on My Account
      // Keep removing fav element every time it's added
      var favouritesElement = document.querySelector('.top-nav-bar > prm-search-bookmark-filter');
      if (favouritesElement !== null && typeof(favouritesElement) !== 'undefined') {
          favouritesElement.parentNode.removeChild(favouritesElement);
      }
    });

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

  var template = 'components/search/topbar/userArea/user-area.html';
  var newUserArea = '<div layout="row" layout-align="end center">' +
      '<span class="hide-xs">{{$ctrl.userName()}}</span>' +
      '<prm-search-bookmark-filter layout-align="end center" layout="row" flex="noshrink" aria-hidden="false"></prm-search-bookmark-filter>' +
      '<prm-library-card-menu ng-show="$ctrl.userName().length > 0"></prm-library-card-menu>' +
      '<prm-authentication layout="flex" [is-logged-in]="$ctrl.userName().length > 0"></prm-authentication>' +
      '</div>';

  app.component('prmUserAreaAfter', {
      bindings: {
          parentCtrl: '<'
      },
      controller: function($compile, $scope, $templateCache, $element) {
          $templateCache.put(template, newUserArea);
          $compile($element.parent())($scope);
      }
  });

  /****************************************************************************************************/

  /*In case of CENTRAL_PACKAGE - comment out the below line to replace the other module definition*/

  /*var app = angular.module('centralCustom', ['angularLoad']);*/

  /****************************************************************************************************/

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
