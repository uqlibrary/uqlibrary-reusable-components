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
  loadUQFavicon();

  addAppleTouchIcon();

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
    header.showIAButton = false; 
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

    var footer = document.querySelector("uq-minimal-footer");
    if (!footer) {
      footer = document.createElement('uq-minimal-footer');
      document.body.appendChild(footer);
    }
  });
}

function loadUQFavicon() {
  var link = document.createElement('link'),
    href = '//assets.library.uq.edu.au/master/reusable-components/resources/favicon.ico';
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = href;
  document.getElementsByTagName('head')[0].appendChild(link);
  link.rel = 'icon'; //for IE
  document.getElementsByTagName('head')[0].appendChild(link);

}

function addAppleTouchIcon() {
  // replace apple-touch-icon
  var appleTouchIconlink = $('link[rel="apple-touch-icon"]'),
    link = document.createElement('link'),
    sizes = ['152x152', '120x120', '76x76'],
    rel = 'apple-touch-icon',
    href = '//assets.library.uq.edu.au/master/reusable-components/resources/images/apple-touch-icon.png';

  if (appleTouchIconlink) {
    appleTouchIconlink.attr('href', href);
  } else {
    link.rel = rel;
    link.href = href;
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  for (var i = 0; i < sizes.length; i++) {
    var size = sizes[i],
      iconLink = document.createElement('link');
    iconLink.rel = rel;
    iconLink.sizes = size;
    iconLink.href = href.replace('icon.png','icon-' + size + '.png');
    document.getElementsByTagName('head')[0].appendChild(iconLink);
  }
}


ready(loadReusableComponents);





