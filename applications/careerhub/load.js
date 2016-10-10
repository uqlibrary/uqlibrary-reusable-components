var urlStudentHubHomePage = "https://"+window.location.hostname+"/workgroups/library-staff-development";
// note: function isHomePage also hard codes this path

function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function loadReusableComponents() {
  // loadUQFavicon();
  // addAppleTouchIcon();

  addBreadcrumbs('#head');

  updateEventsLinkText();

  reformatSidebarDates();

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
    header.showLoginButton = false;
  });

}

/**
 * Reformat date from DD-MMM-YYYY to styled elements
 */
function reformatSidebarDates() {
  var upcomingEvents = document.querySelectorAll('.upcomingEvents .body li');

  if (!upcomingEvents.length) {
    return;
  }

  for (var eventIndex = 0; eventIndex < upcomingEvents.length; eventIndex++) {
    var originalDate = upcomingEvents[eventIndex].querySelector('span.caption').innerHTML.replace(/(\s|\n)+/g, '');
    if (originalDate) {

      var dateBits = originalDate.split("-");

      if (dateBits.length > 2) {

        //hide original date display
        upcomingEvents[eventIndex].querySelector('span.caption').className += ' hide';

        //create day element
        var dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.appendChild(document.createTextNode(dateBits[0]));

        //create month element
        var monthElement = document.createElement('div');
        monthElement.className = 'month';
        monthElement.appendChild(document.createTextNode(dateBits[1]));

        //add to event list item
        dateElement = document.createElement('div');
        dateElement.className = 'formatted-date';
        dateElement.appendChild(dayElement);
        dateElement.appendChild(monthElement);

        var eventLink = upcomingEvents[eventIndex].querySelector('a');
        upcomingEvents[eventIndex].insertBefore(dateElement, eventLink);
      }
    }
  }
}

/**
 * sadly, the Studenthub homepage runs from multiple urls, so a little function to check for it
 * @returns {boolean}
 */
function isHomePage() {
  var regexp = /https?:\/\/((www\.)?(careerhub|studenthub)\.uq\.edu\.au)\/workgroups\/library-staff-development\/?$/;
  return regexp.test(window.location.href);
}

/**
 * add breadcrumbs to the top of a Studenthub page
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


  // create second breadcrumb entry: Studenthub workgroup homepage
  var linktext1 = 'Library ';
  var linktext2 = 'staff development';

  var childElement;
  var displayNode;

  anLI = document.createElement('li');
  anLI.className = 'staffdevhomepage';

  if (isHomePage()) {
    // spans required for css
    childElement = document.createElement('span');
  } else {
    childElement = document.createElement('a');
    childElement.href = urlStudentHubHomePage;
  }
  var displayNode1 = document.createTextNode(linktext1);
  var childElement1 = document.createElement('span');
  childElement1.appendChild(displayNode1);
  childElement.appendChild(childElement1);

  displayNode = document.createTextNode(linktext2);
  childElement.appendChild(displayNode);

  anLI.appendChild(childElement);
  breadcrumbList.appendChild(anLI);


  // On the Studenthub event page, event titles have a class of 'event_title'
  var testElement = document.querySelector('.event_title');

  // third breadcrumb
  var theLabel = 'Event list';
  displayNode = document.createTextNode(theLabel);
  if (testElement !== null) {
    // we are on an event page - make this a link
    childElement = document.createElement('a');
    childElement.href = urlStudentHubHomePage + '/events';
    childElement.appendChild(displayNode);

    anLI = document.createElement('li');
    anLI.appendChild(childElement);
    breadcrumbList.appendChild(anLI);

  } else {
    if (!isHomePage()) {
      childElement = document.createElement('span');
      childElement.appendChild(displayNode);

      anLI = document.createElement('li');
      anLI.appendChild(childElement);
      breadcrumbList.appendChild(anLI);

      // add class to body so we know its the list page
      newclassName = ' listpage';
      document.body.className+= newclassName;
    }
  }


  // fourth breadcrumb
  if (testElement !== null) {
    // an event class means we are on a detail page

    // for desktop, display the event's title as an unlinked breadcrumb
    // for mobile, display 'event details' - some of the titles are long
    anLI = document.createElement('li');

    var mobileLabel = 'Event details';
    displayNode = document.createTextNode(mobileLabel);
    childElement = document.createElement('span');
    childElement.className = 'mobileOnly';
    childElement.appendChild(displayNode);
    anLI.appendChild(childElement);

    var textProperty = 'textContent' in document ? 'textContent' : 'innerText';
    var nonMobileLabel = testElement[textProperty];
    displayNode = document.createTextNode(nonMobileLabel);
    childElement = document.createElement('span');
    childElement.className = 'nonMobile';
    childElement.appendChild(displayNode);
    anLI.appendChild(childElement);

    breadcrumbList.appendChild(anLI);
  }

  parentBlock.insertBefore(breadcrumbList, parentBlock.firstChild);

  return true;
}

/**
 * find the specific link on the page and relabel it
 */
function updateEventsLinkText() {
  //select a link to more events from the sidebar (upcoming events)
  var moreEventsLink = document.querySelector('.sidebar .body a[href$="/events"]');
  if (moreEventsLink !== null) {
    // this has to be in all caps to make the nightwatch tests pass - Edge browser doesnt recognise a css transform
    moreEventsLink.innerHTML = "MORE EVENTS";
  }
}

ready(loadReusableComponents);
