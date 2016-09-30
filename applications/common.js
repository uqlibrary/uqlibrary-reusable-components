/**
 * common js functions for 3rd party apps customisation
 */

function loadUQFavicon() {
  var link = document.createElement('link');
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = '//assets.library.uq.edu.au/reusable-components/resources/favicon.ico';

  document.getElementsByTagName('head')[0].appendChild(link);

  //for IE
  link.rel = 'icon';
  document.getElementsByTagName('head')[0].appendChild(link);
}

function addAppleTouchIcon() {
  var hrefTemplate = '//assets.library.uq.edu.au/reusable-components/resources/images/apple-touch-icon';

  // replace apple-touch-icon
  var appleTouchIconlink = document.querySelector('link[rel="apple-tough-icon"]');
  if (appleTouchIconlink) {
    appleTouchIconlink.attr('href', hrefTemplate + '.png');
  } else {
    var link = document.createElement('link');
    link.rel = 'apple-touch-icon';
    link.href = hrefTemplate + '.png';
    document.getElementsByTagName('head')[0].appendChild(link);
  }

  //add touch icons for each icon size
  var iconSizesList = ['152x152', '120x120', '76x76'];
  for (var index = 0; index < iconSizesList.length; index++) {
    var iconLink = document.createElement('link');
    iconLink.rel = rel;
    iconLink.sizes = iconSizesList[index];
    iconLink.href = hrefTemplate + iconSizesList[index] + '.png';
    document.getElementsByTagName('head')[0].appendChild(iconLink);
  }
}