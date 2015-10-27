window.addEventListener('WebComponentsReady', function(e) {

  // insert header after body-tag
  var header = document.createElement('uq-minimal-header');
  //header.applicationTitle = "FAQ";

  document.body.insertBefore(header, document.body.children[0]);

  // insert footer before body-tag
  var footer = document.createElement('uq-minimal-footer');
  document.body.appendChild(footer, document.body);
});