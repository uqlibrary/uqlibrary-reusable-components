function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function loadReusableComponents() {
  loadUQFavicon();

  addBreadcrumbs();

  addAppleTouchIcon();

  //insert elements, even before Polymer is loaded

  //first element of the original document
  var firstElement = document.body.children[0];

  //insert alerts before header
  var alerts = document.querySelector('uqlibrary-alerts');
  if (!alerts) {
    //as a back up insert header if it's not defined already
    alerts = document.createElement('uqlibrary-alerts');
    document.body.insertBefore(alerts, firstElement);
  }

  // insert header after body-tag
  var header = document.createElement('uq-minimal-header');
  document.body.insertBefore(header, firstElement);

  // insert sub footer before body-tag
  var subFooter = document.createElement('uql-connect-footer');
  document.body.appendChild(subFooter);

  // insert footer before body-tag
  var footer = document.createElement('uq-minimal-footer');
  document.body.appendChild(footer);


  window.addEventListener('WebComponentsReady', function() {
    // when polymer is ready - configure elements
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
  var appleTouchIconlink = ('link[rel="apple-touch-icon"]'),
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

function addLink(labelText, hrefAddress) {
  // create anchor, add text, add link
  var anchorText = document.createTextNode(labelText);
  if (window.location.href != hrefAddress) {
    // return an anchor element
    var anchor = document.createElement('a');
    anchor.href = hrefAddress;
    anchor.appendChild(anchorText)
    return anchor;
  } else {
    // return a text node
    return anchorText;
  }

}

// usage: addBreadcrumbs('#head');
function addBreadcrumbs(parentElementIdentifier) {
  var parentBlock = document.querySelector(parentElementIdentifier);
  if (typeof(parentBlock) === undefined) {
    console.log('element '+parentElementIdentifier+' doesnt exist (careerhub/load.js)');
    return false;
  }

  // create ol
  var breadcrumbList = document.createElement('ol');
  breadcrumbList.class = 'breadcrumbList';

  // create first breadcrumb entry: home page
  // <paper-icon-button icon="home"></paper-icon-button>
  var homepageIcon = document.createElement('paper-icon-button');
  homepageIcon.icon= 'home';
  var homePageLink = 'https://www.library.uq.edu.au/';

  var anAnchor = document.createElement('a');
  anAnchor.href = homePageLink;
  anAnchor.appendChild(homepageIcon);

  var anLI = document.createElement('li');
  anLI.appendChild(anAnchor);
  breadcrumbList.appendChild(anLI);


  // create second breadcrumb entry: careerhub workgroup homepage
  var linktext = 'Library staff development';
  var theLink = 'https://www.careerhub.uq.edu.au/workgroups/library-staff-development';

  var childElement;
  var anchorText;
  if (window.location.href != theLink) {
    childElement = document.createElement('a');
    childElement.href = theLink;
    anchorText = document.createTextNode(linktext);
    childElement.appendChild(anchorText);
  } else {
    anchorText = document.createTextNode(linktext);
    childElement.appendChild(anchorText);
  }

  anLI = document.createElement('li');
  anLI.appendChild(childElement);
  breadcrumbList.appendChild(anLI);


  // if is event page, add another breadcrumb, as event title
  testElement = document.querySelector('.event_title');
  if (typeof(testElement) !== undefined) {
    // an event class means we are on a detail page
    var textProperty = 'textContent' in document ? 'textContent' : 'innerText';
    var theText = testElement.textContent;

    anLI = document.createElement('li');
    anLI.appendChild(theText);
    breadcrumbList.appendChild(anLI);
  }

  parentBlock.breadcrumbList(breadcrumbList, parentBlock.firstChild);
}


ready(loadReusableComponents);
