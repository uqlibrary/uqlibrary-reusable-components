function ready(fn) {
  if (document.readyState != 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function loadReusableComponents() {
  //insert elements, even before Polymer is loaded

  //first element of the original document
  var firstElement = document.body.children[0];

  // insert alerts after body-tag
  var alerts = document.querySelector('uqlibrary-alerts');
  if (!alerts) {
    //as a back up insert header if it's not defined already
    alerts = document.createElement('uqlibrary-alerts');
    document.body.insertBefore(alerts, firstElement);
  }

  // insert header after alerts
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
    header.showChatButton = false;
  });

  // this is temp code to add a simple contact button


  var contactLink = 'https://web.library.uq.edu.au/contact-us';
  var contactLinkIcon = 'https://raw.githubusercontent.com/google/material-design-icons/master/communication/2x_web/ic_forum_white_18dp.png';
  var contactLinktext = 'Ask Us';

  var chatIcon = document.createElement('img');
  chatIcon.src = contactLinkIcon;

  var chatIconBlock = document.createElement('div');
  chatIconBlock.appendChild(chatIcon);

  var textLabel = document.createTextNode(contactLinktext);

  var textLabelBlock = document.createElement('span');
  textLabelBlock.appendChild(textLabel);
  textLabelBlock.style="";

  var chatAnchor = document.createElement('a');
  chatAnchor.href = contactLink;
  chatAnchor.appendChild(chatIconBlock);
  chatAnchor.appendChild(textLabelBlock);

  var chatButton = document.createElement('div');
  chatButton.className='TalisChatButton';
  chatButton.appendChild(chatAnchor);

  var headerBlock = document.querySelector('.actions.style-scope.uq-minimal-header');

  headerBlock.appendChild(chatButton);


}

ready(loadReusableComponents);