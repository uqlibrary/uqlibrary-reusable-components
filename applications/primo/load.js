function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function loadReusableComponents() {
  loadUQFavicon();

  modifyUserAreaTile();

  //show notification bar if user is not logged in
  loadSigninNotification();

  //first element of the original document
  var firstElement = document.body.children[0];

  // insert alerts after body-tag
  var alerts = document.querySelector('uqlibrary-alerts');
  if (!alerts) {
    //as a back up insert header if it's not defined already
    alerts = document.createElement('uqlibrary-alerts');
    document.body.insertBefore(alerts, firstElement);
  }

  // insert header after alerts
  var header = document.createElement('uq-minimal-header');
  document.body.insertBefore(header, firstElement);

  // insert sub footer before body-tag
  var subFooter = document.createElement('uql-connect-footer');
  document.body.appendChild(subFooter);

  // insert footer before body-tag
  var footer = document.createElement('uq-minimal-footer');
  document.body.appendChild(footer);

  window.addEventListener('WebComponentsReady', function () {
    // when polymer is ready - configure elements
    header.showLoginButton = false;
    header.showAppsButton = true;
  });

  displayPublicationDates();
}

function displayPublicationDates() {
  // Use the Primo supplied function to preload the start and end dates in the Publication Date facet
  // function found in http://search.library.uq.edu.au/primo_library/libweb/wro/primo_library_web.js
  onTBChange('start');
  onTBChange('end');
}

function loadUQFavicon() {
  var link = document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = '//assets.library.uq.edu.au/master/reusable-components/resources/favicon.ico';
  document.getElementsByTagName('head')[0].appendChild(link);
  link.rel = 'icon'; //for IE
  document.getElementsByTagName('head')[0].appendChild(link);
}

/* Call primo defined method isUserLoggedIn() to check users login status, show the notification if the user is not logged in */
function loadSigninNotification() {
  if (isUserLoggedIn())
    return;
  if ($('#signInPrompt').length > 0) /* prevents a double sign-in on some pages */
    return;
  if ($('body').hasClass('MyAccount')) /* don't repeat sign-in prompt on E-Shelf page */
    return;

  /* get the login address from the signin link already generated by primo */
  var signInLink = $('#exlidSignIn a').attr('href');

  //put the notification bar in the feedback area which is sitting right after search bar
  var container = $('#exlidHeaderSystemFeedback');
  container.prepend('<div id="alert-container"><div id="alert-icon-container"></div><div id="alert-text-container"><a aria-label="Log in" href="' + signInLink + '">Log in</a> to access full text, more search results and more services</div>');
}

function modifyUserAreaTile() {
  var userAreaRibbon = $('#exlidUserAreaTile #exlidUserAreaRibbon');

  if (userAreaRibbon) {

    // move signin and signout button next to the user name
    userAreaRibbon.find('.EXLLastItem').insertAfter(userAreaRibbon.find('#exlidUserName'));

    if (isUserLoggedIn()){
      // add saved searches and alerts link
      var savedSearches = $('<li id="exlidSavedSearches" class="EXLSavedSearches"><a href="query.do?fn=display">Saved searches & alerts</a></li>');
      userAreaRibbon.find('#exlidMyShelf').after(savedSearches);

    } else {
      // hide my account link
      userAreaRibbon.find('#exlidMyAccount').addClass('EXLHidden');

      // insert a login reminder after myself
      userAreaRibbon.find('#exlidMyShelf').append('<span> - temporary if not logged in</span>');
    }
  }

}

ready(loadReusableComponents);


// load google analytics
(function (i, s, o, g, r, a, m) {
  i.GoogleAnalyticsObject = r;
  i[r] = i[r] || function () {
        (i[r].q = i[r].q || []).push(arguments);
      };

  i[r].l = 1 * new Date();
  a = s.createElement(o);
  m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-4365437-14', 'auto');
ga('send', 'pageview');
