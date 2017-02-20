
var primoViewHasLoaded = setInterval(function() {
  //wait for primo's angular to load itself (eg replaces primo-explore contents with angular contents, then insert header)
  if (document.querySelector('noscript') === null || typeof(document.querySelector('noscript')) === 'undefined' ) {
    loadReusableComponents();
    clearInterval(primoViewHasLoaded);
  }
}, 50);

function loadReusableComponents() {
  //insert elements, even before Polymer is loaded

  //first element of the original document
  var firstElement = document.querySelector('primo-explore');

  // insert header inside primo's view
  var header = document.createElement('uq-minimal-header');
  firstElement.insertBefore(header, firstElement.firstChild);

  // insert alerts inside primo's view
  var alerts = document.createElement('uqlibrary-alerts');
  firstElement.insertBefore(alerts, firstElement.firstChild);


  // while new PrimoUI has infinite scrolling, do not include footer

  // // insert sub footer before body-tag
  // var subFooter = document.createElement('uql-connect-footer');
  // document.body.appendChild(subFooter);
  //
  // // insert footer before body-tag
  // var footer = document.createElement('uq-minimal-footer');
  // document.body.appendChild(footer);

  window.addEventListener('WebComponentsReady', function() {
    // when polymer is ready - configure elements
    header.showLoginButton = false;
  });
}

ready(loadReusableComponents);