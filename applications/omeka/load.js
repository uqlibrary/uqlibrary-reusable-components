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

  addCss('//assets.library.uq.edu.au/reusable-components/omeka/custom-styles.css');

  addResponsiveMeta();

  addElements();



  //insert elements, even before Polymer is loaded

  //first element of the original document
  var firstElement = document.body.children[0];

  var alerts = document.querySelector('uqlibrary-alerts');
  if (!alerts) {
    //as a back up insert header if it's not defined already
    alerts = document.createElement('uqlibrary-alerts');
    document.body.insertBefore(alerts, firstElement);
  }

  // insert header after body-tag
  var header = document.createElement('uq-minimal-header');
  document.body.insertBefore(header, firstElement);

  // insert footer before body-tag
  var footer = document.createElement('uq-minimal-footer');
  document.body.appendChild(footer);


  window.addEventListener('WebComponentsReady', function() {
    // when polymer is ready - configure elements

    header.showLoginButton = false;

    header.applicationTitle = 'Online Exhibitions';

  });


}

function loadUQFavicon() {
  var link = document.createElement('link'),
    href = '//assets.library.uq.edu.au/reusable-components/resources/favicon.ico';
  link.type = 'image/x-icon';
  link.rel = 'shortcut icon';
  link.href = href;
  document.getElementsByTagName('head')[0].appendChild(link);
  link.rel = 'icon'; //for IE
  document.getElementsByTagName('head')[0].appendChild(link);

}

function addAppleTouchIcon() {
  // replace apple-touch-icon
  var appleTouchIconlink = document.querySelector('link[rel="apple-touch-icon"]'),
    link = document.createElement('link'),
    sizes = ['152x152', '120x120', '76x76'],
    rel = 'apple-touch-icon',
    href = '//assets.library.uq.edu.au/reusable-components/resources/images/apple-touch-icon.png';

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

function addResponsiveMeta() {
  // <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0">
  var meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = 'width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0';
  document.getElementsByTagName('head')[0].appendChild(meta);
}

function addCss(fileName) {

  var head = document.head,
     link = document.createElement('link');

  link.type = 'text/css';
  link.rel = 'stylesheet';
  link.href = fileName;

  head.appendChild(link);
}

function addElements() {
  var head = document.head,
    link = document.createElement('link');

  link.rel = 'import';
  link.href = '//assets.library.uq.edu.au/reusable-components/elements.vulcanized.html';
  link.async = true;

  head.appendChild(link);
}

function AddClassNameToBody(newclassName) {
  // this can be called in the footer to add a class name to the body so that we can target different themes or exhibits
  newclassName = ' '+newclassName;
  document.body.className+= newclassName;

}

ready(loadReusableComponents);
