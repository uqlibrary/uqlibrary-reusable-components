/* global menuJson:false */
window.addEventListener('WebComponentsReady', function() {
  // insert header after body-tag
  var header = document.createElement('uq-minimal-header');
  header.showIAButton = true;

  document.body.insertBefore(header, document.body.children[0]);

  // insert menu after header
  var menu = document.createElement('uql-menu');
  menu.menuJson = menuJson;

  document.body.insertBefore(menu, header);
  //header.appendChild(menu);

  header.addEventListener("menu-clicked", function(event) {
    menu.toggleMenu();
  });

  // insert footer before body-tag
  var footer = document.createElement('uq-minimal-footer');
  document.body.appendChild(footer);
});