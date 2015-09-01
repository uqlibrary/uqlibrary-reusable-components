window.addEventListener('WebComponentsReady', function(e) {

  // imports are loaded and elements have been registered
  console.log('Components are ready');

  // insert header after body-tag
  var header = document.createElement('uq-minimal-header');
  //header.applicationTitle = "FAQ";

  document.body.insertBefore(header, document.body.children[0]);

  // insert footer before body-tag
  var footer = document.createElement('uq-minimal-footer');
  document.body.appendChild(footer, document.body);

});