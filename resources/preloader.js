//display browser update message for unsupported browsers - will be replaces in by gulp task at deployment
//do not modify this file
  var $buoop = {
    vs: {i: 10, f: 30, o: 15, s: 7, c: 36},  // browser versions to notify
    reminder: 0,                   // after how many hours should the message reappear, 0 = show all the time
    test: true,                    // true = always show the bar (for testing)
    text: "Your current browser is not on UQ Library's <a href=\"https://www.library.uq.edu.au/site-information/web-browser-compatibility\">list of supported browsers</a>. " +
    "If you experience any problems with this site, please try using the site with a different browser, or <a href=\"http://browser-update.org/update.html\">upgrade your current browser</a> " +
    "to the latest version.",
    newwindow: true                 // open link in new window/tab
  };

  function $buo_f(){
    var e = document.createElement("script");
    e.src = "//browser-update.org/update.min.js";
    document.body.appendChild(e);
  };

  try {
    document.addEventListener("DOMContentLoaded", $buo_f,false)
  }
  catch(e){
    window.attachEvent("onload", $buo_f)
  }

