//reload page when browser updates cached files
if (window.applicationCache) {
  applicationCache.addEventListener('updateready', function () {
    window.applicationCache.swapCache();
    window.location.reload();
  });
}

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function loadReusableComponents() {
  window.addEventListener('WebComponentsReady', function() {
    //first element of the original document
    var firstElement = document.body.children[0];

    var alerts = document.querySelector('uqlibrary-alerts');
    if (!alerts) {
      //as a back up insert header if it's not defined already
      alerts = document.createElement('uqlibrary-alerts');
      document.body.insertBefore(alerts, firstElement);
    }

    var header = document.querySelector('uq-minimal-header');
    if (!header) {
      //as a back up insert header if it's not defined already
      header = document.createElement('uq-minimal-header');
      document.body.insertBefore(header, firstElement);
    }

    //configure elements
    header.showIAButton = (document.cookie.indexOf("iabutton") >= 0);
    header.showMenuButton = true;
    header.showSearchButton = true;

    var menu = document.querySelector('uql-menu');
    if (!menu) {
      menu = document.createElement('uql-menu');
      header.appendChild(menu);
      document.body.insertBefore(menu, firstElement);
    }

    header.addEventListener("menu-clicked", function(event) {
      menu.toggleMenu();
    });

    var subFooter = document.querySelector('uql-connect-footer');
    if (!subFooter) {
      subFooter = document.createElement('uql-connect-footer');
      document.body.appendChild(subFooter);
    }
    subFooter.mainDomain = 'https://www.library.uq.edu.au';

    var footer = document.querySelector("uq-minimal-footer");
    if (!footer) {
      footer = document.createElement('uq-minimal-footer');
      document.body.appendChild(footer);
    }
  });
}

ready(loadReusableComponents);





