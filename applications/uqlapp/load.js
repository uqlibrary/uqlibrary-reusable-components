window.addEventListener('WebComponentsReady', function(e) {

  // insert header after body-tag
  var header = document.createElement('uq-minimal-header');
  document.body.insertBefore(header, document.body.children[0]);

  // insert footer before body-tag
  var subFooter = document.createElement('uql-connect-footer');
  document.body.appendChild(subFooter);
  subFooter.footerMenuUrl = '//assets.library.uq.edu.au/reusable-components/resources/uql-menu.json';
  subFooter.mainDomain = 'https://www.library.uq.edu.au';

  // insert footer before body-tag
  var footer = document.createElement('uq-minimal-footer');
  document.body.appendChild(footer, document.body);

});