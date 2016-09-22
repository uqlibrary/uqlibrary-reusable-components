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

  addBreadcrumbs('#head');

  relabelMoreEventsLink();

  reformatSidebarDates();

  reformatSummaryElement();

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

function reformatSidebarDates() {
  // the date needed reformatting because css cant format 19-Sep-2016 as 19\nSep
  var listDates = document.querySelectorAll('.upcomingEvents .body li');
  if (listDates === null) {
    return false;
  }

  var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var unformattedDate, d, theDay, displayNode, dayElement, theMonth, monthElement, dateElement, childNode;
  [].forEach.call(listDates, function(listItem) {
    unformattedDate = listItem.querySelector('span.caption');
    if (unformattedDate !== null) {

      thedate = "";
      if (unformattedDate.firstChild.innerHTML) {
        thedate = unformattedDate.firstChild.innerHTML;
      } else {
        if (unformattedDate.firstChild.nodeValue) {
          thedate = unformattedDate.firstChild.nodeValue;
        } else {
          if (unformattedDate.firstChild) {
            thedate = unformattedDate.firstChild;
          }
        }

      }
      thedate = thedate.replace("-", "/").replace("-", "/");
      var msec = Date.parse(thedate);
      // if we are unable to get a date, we dont reformat, and apply the older styles
      if (!isNaN(msec)) {
        listItem.className = 'reformatted';

        d = new Date(msec);
        // make day element
        theDay = d.getDate();
        displayNode = document.createTextNode(theDay);
        dayElement = document.createElement('div');
        dayElement.className = 'day';
        dayElement.appendChild(displayNode);

        // make month element
        theMonth = monthNames[d.getMonth()];
        displayNode = document.createTextNode(theMonth);
        monthElement = document.createElement('div');
        monthElement.className = 'month';
        monthElement.appendChild(displayNode);

        // add to list item
        dateElement = document.createElement('div');
        dateElement.className = 'formattedDate';
        dateElement.appendChild(dayElement);
        dateElement.appendChild(monthElement);

        childNode = listItem.querySelector('a');
        listItem.insertBefore(dateElement, childNode);
      }
    }

  });
  return true;
}

/**
 * sadly, the careerhub homepage runs from multiple urls, so a little function to check for it
 * @returns {boolean}
 */
function isHomePage() {
  listUrlsHome =[
    "https://www.careerhub.uq.edu.au/workgroups/library-staff-development/",
    "https://www.careerhub.uq.edu.au/workgroups/library-staff-development",
    "https://careerhub.uq.edu.au/workgroups/library-staff-development/",
    "https://careerhub.uq.edu.au/workgroups/library-staff-development",
    "https://www.studenthub.uq.edu.au/workgroups/library-staff-development/",
    "https://www.studenthub.uq.edu.au/workgroups/library-staff-development",
    "https://studenthub.uq.edu.au/workgroups/library-staff-development/",
    "https://studenthub.uq.edu.au/workgroups/library-staff-development"
  ];
  var result = false;
  [].forEach.call(listUrlsHome, function(anUrl) {
    if (window.location.href == anUrl) {
      result = true;
    }
  });
  return result;
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
  var linktext1 = 'Library ';
  var linktext2 = 'staff development';
  var urlCareerHubHomePage = 'https://www.careerhub.uq.edu.au/workgroups/library-staff-development';

  var childElement;
  var displayNode;

  anLI = document.createElement('li');
  anLI.className = 'staffdevhomepage';

  if (!isHomePage()) {
    childElement = document.createElement('a');
    childElement.href = urlCareerHubHomePage;
  } else {
    // spans required for css
    childElement = document.createElement('span');
  }
  var displayNode1 = document.createTextNode(linktext1);
  var childElement1 = document.createElement('span');
  childElement1.appendChild(displayNode1);
  childElement.appendChild(childElement1);

  displayNode = document.createTextNode(linktext2);
  childElement.appendChild(displayNode);

  anLI.appendChild(childElement);
  breadcrumbList.appendChild(anLI);


  var theLabel;
  // On the careerhub event page, event titles have a class of 'event_title'
  var testElement = document.querySelector('.event_title');

  // third breadcrumb
  var urlCareerHubListPage = urlCareerHubHomePage + '/events';
  theLabel = 'Event list';
  displayNode = document.createTextNode(theLabel);
  if (testElement !== null) {
    // we are on an event page - make this a link
    childElement = document.createElement('a');
    childElement.href = urlCareerHubListPage;
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

    var firstLabel = 'Event details';
    displayNode = document.createTextNode(firstLabel);
    childElement = document.createElement('span');
    childElement.className = 'mobileOnly';
    childElement.appendChild(displayNode);
    anLI.appendChild(childElement);

    var textProperty = 'textContent' in document ? 'textContent' : 'innerText';
    var secondLabel = testElement[textProperty];
    displayNode = document.createTextNode(secondLabel);
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
 * @returns {boolean}
 */
function relabelMoreEventsLink() {
  // we are using querySelectorAll because the following line:
  // document.querySelector(".sidebar > a");
  // returns null so we cant target the specific link (doesnt like the child selector) :(

  var urlEventsPage = 'https://www.careerhub.uq.edu.au/workgroups/library-staff-development/events';
  var links = document.querySelectorAll('.sidebar a');

  var theLink;
  [].forEach.call(links, function(links) {
    if (urlEventsPage == links.href) {
      if (!links.firstChild) {
        return false;
      }

      theLink = links.firstChild;
      if (!theLink.data) {
        return false;
      }

      theLink.data = 'More events';

    }
  });
  return true;
}

function reformatSummaryElement() {
  // the summary p element wraps all the way back to the left, under the icon
  // child it into a div (display: inline) and we can use the left margin to stop that
  var parentBlock = document.querySelector('.event_summary');
  if (parentBlock === null) {
    return false;
  }

  var existingParagraph = document.querySelector('.event_summary p');
  if (existingParagraph === null) {
    return false;
  }

  var newDiv = document.createElement('div');
  newDiv.className = 'uqlsummary';
  parentBlock.appendChild(newDiv);

  var fragment = document.createDocumentFragment();
  fragment.appendChild(existingParagraph);
  newDiv.appendChild(fragment);

}


ready(loadReusableComponents);
