//insert elements, even before Polymer is loaded

//first element of the original document
var firstElement = document.body.children[0];

// insert header after body-tag
var header = document.createElement('uq-minimal-header');
document.body.insertBefore(header, firstElement);

// insert footer before body-tag
var footer = document.createElement('uq-minimal-footer');
document.body.appendChild(footer);
// or this?
//document.body.appendChild(footer, document.body);

window.addEventListener('WebComponentsReady', function() {
  // when polymer is ready - configure elements

  header.showLoginButton = false;

  //reveal elements with easing in effect
  var content = document.querySelectorAll(".loading");
  for(var i=0; i< content.length; i++){
    var element = content[i];
    element.removeAttribute('unresolved');
  }
});