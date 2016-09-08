function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function loadReusableComponents() {
  loadUQFavicon();

  addBreadcrumbs('#head');

  changeLabelOfLink('.sidebar > a', 'More events');

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

/**
 * add breadcrumbs to the top of a careerhub page
 * example usage: addBreadcrumbs('#head');
 *
 * @param parentElementIdentifier
 * @returns {boolean}
 */
function addBreadcrumbs(parentElementIdentifier) {
  var parentBlock = document.querySelector(parentElementIdentifier);
  if (parentBlock === null) {
    return false;
  }

  // create ol
  var breadcrumbList = document.createElement('ol');
  breadcrumbList.className = 'breadcrumbList';

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
  var urlCareerHubHomePage = 'https://www.careerhub.uq.edu.au/workgroups/library-staff-development';

  var childElement;
  var displayNode;
  if (window.location.href != urlCareerHubHomePage) {
    childElement = document.createElement('a');
    childElement.href = urlCareerHubHomePage;
  } else {
    // spans required for css
    childElement = document.createElement('span');
  }
  displayNode = document.createTextNode(linktext);
  childElement.appendChild(displayNode);

  anLI = document.createElement('li');
  anLI.appendChild(childElement);
  breadcrumbList.appendChild(anLI);

  // third breadcrumb
  var theLabel;
  // On the careerhub event page, event titles have a class of 'event_title'
  var testElement = document.querySelector('.event_title');
  if (testElement !== null) {
    // an event class means we are on a detail page
    // display its title as an unlinked breadcrumb
    var textProperty = 'textContent' in document ? 'textContent' : 'innerText';
    theLabel = testElement[textProperty];
    displayNode = document.createTextNode(theLabel);
    childElement = document.createElement('span');
    childElement.appendChild(displayNode);

    anLI = document.createElement('li');
    anLI.appendChild(childElement);
    breadcrumbList.appendChild(anLI);
  } else {
    if (window.location.href != urlCareerHubHomePage) {
      theLabel = 'Event List';

      displayNode = document.createTextNode(theLabel);
      childElement = document.createElement('span');
      childElement.appendChild(displayNode);

      anLI = document.createElement('li');
      anLI.appendChild(childElement);
      breadcrumbList.appendChild(anLI);
    }
  }

  parentBlock.insertBefore(breadcrumbList, parentBlock.firstChild);

  return true;
}

/**
 * change the text on an achor
 * eg usage: changeLabelOfLink('.sidebar a', 'More events')
 *
 * @param elementReference - the html element that will be changed, eg '.sidebar a'
 * @param newLabel - what the label will become. text string
 * @returns {boolean}
 */
function changeLabelOfLink(elementReference, newLabel) {
  var theLink = document.querySelector(elementReference).firstChild;
  if (theLink === null) {
    return false;
  }

  theLink.data = newLabel;

  return true;
}


ready(loadReusableComponents);
