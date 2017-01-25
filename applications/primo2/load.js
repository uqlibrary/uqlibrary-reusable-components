function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function loadReusableComponents() {
  //insert elements, even before Polymer is loaded

  //first element of the original document
  // var firstElement = document.body.children[0];
  var firstElement = document.querySelector('primo-explore');

  //as a back up insert header if it's not defined already
  var alerts = document.createElement('uqlibrary-alerts');
  // document.body.insertBefore(alerts, firstElement.childNodes[0]);
  // firstElement.appendChild(alerts);

  // insert header after body-tag
  var header = document.createElement('uq-minimal-header');
  // document.body.insertBefore(header, firstElement.childNodes[0]);
  // firstElement.appendChild(header);

  // while new PrimoUI has infinite scrolling, do not include footer

  // // insert sub footer before body-tag
  // var subFooter = document.createElement('uql-connect-footer');
  // document.body.appendChild(subFooter);
  //
  // // insert footer before body-tag
  // var footer = document.createElement('uq-minimal-footer');
  // document.body.appendChild(footer);

  var app = angular.module('viewCustom', ['angularLoad']);
  app.component('prmExploreMainBefore', {
    template: '<uqlibrary-alerts></uqlibrary-alerts><uq-minimal-header></uq-minimal-header>'

  });

  window.addEventListener('WebComponentsReady', function() {
    // when polymer is ready - configure elements
    header.showLoginButton = false;
  });
}

ready(loadReusableComponents);