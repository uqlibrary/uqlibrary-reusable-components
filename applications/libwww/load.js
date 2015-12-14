/* global menuJson:false */
window.addEventListener('WebComponentsReady', function() {

  //original document
  var firstElement = document.body.children[0];

  // insert header after body-tag
  var header = document.createElement('uq-minimal-header');
  header.showIAButton = (document.cookie.indexOf("iabutton") >= 0);
  header.showMenuButton = true;
  header.showSearchButton = true;
  document.body.insertBefore(header, firstElement);

  // insert menu after header
  var menu = document.createElement('uql-menu');
  menu.menuJson = menuJson;
  header.appendChild(menu);

  header.addEventListener("menu-clicked", function(event) {
    menu.toggleMenu();
  });

  // insert footer before body-tag
  var subFooter = document.createElement('uql-connect-footer');
  document.body.appendChild(subFooter);
  subFooter.footerMenuUrl = menuJson;
  subFooter.mainDomain = 'https://www.library.uq.edu.au';

  var footer = document.createElement('uq-minimal-footer');
  document.body.appendChild(footer);
});