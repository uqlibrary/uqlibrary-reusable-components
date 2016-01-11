//function ready(fn) {
//  if (document.readyState != 'loading'){
//    fn();
//  } else {
//    document.addEventListener('DOMContentLoaded', fn);
//  }
//}
//
//function loadReusableComponents() {

  //insert elements, even before Polymer is loaded

  //first element of the original document
  //var firstElement = document.body.children[0];
  //
  //// insert header after body-tag
  //var header = document.createElement('uq-minimal-header');
  //document.body.insertBefore(header, firstElement);
  //
  //// insert menu after header
  //var menu = document.createElement('uql-menu');
  ////header.appendChild(menu);
  //document.body.insertBefore(menu, firstElement);
  //
  //// insert sub footer before body-tag
  //var subFooter = document.createElement('uql-connect-footer');
  //document.body.appendChild(subFooter);
  //
  //// insert footer before body-tag
  //var footer = document.createElement('uq-minimal-footer');
  //document.body.appendChild(footer);

  //window.addEventListener('WebComponentsReady', function() {
  //  // when polymer is ready - configure elements
  //  header.showIAButton = (document.cookie.indexOf("iabutton") >= 0);
  //  header.showMenuButton = true;
  //  header.showSearchButton = true;
  //
  //  menu.menuJson = '../uql-menu/demo/menu.json';
  //
  //  header.addEventListener("menu-clicked", function(event) {
  //    menu.toggleMenu();
  //  });
  //
  //  subFooter.mainDomain = 'https://www.library.uq.edu.au';
  //});
//}
//
//ready(loadReusableComponents);

window.addEventListener('WebComponentsReady', function() {
  var header = document.querySelector('uq-minimal-header');

  // when polymer is ready - configure elements
  header.showIAButton = (document.cookie.indexOf("iabutton") >= 0);
  header.showMenuButton = true;
  header.showSearchButton = true;

  var menu = document.querySelector('uql-menu');
  //menu.menuJson = '../uql-menu/demo/menu.json';

  header.addEventListener("menu-clicked", function(event) {
    menu.toggleMenu();
  });

  var subFooter = document.querySelector('uql-connect-footer');
  subFooter.mainDomain = 'https://www.library.uq.edu.au';
});


