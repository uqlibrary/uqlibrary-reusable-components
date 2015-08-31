// Uncomment this when developing locally
// Comment out before committing!
//document.cookie="UQLMockData=enabled";
var ignoreSession = true;
var hasWebComponentsSupport = (!('registerElement' in document
  && 'createShadowRoot' in HTMLElement.prototype
  && 'import' in document.createElement('link')
  && 'content' in document.createElement('template')));

  function isIE() {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

function hasSession() {
  return (typeof ignoreSession !== 'undefined' && ignoreSession) || document.cookie.indexOf("UQLID") >= 0 || document.cookie.indexOf("UQLMockData") >= 0;
}

if (!hasWebComponentsSupport ){
  document.write('<script type="text/javascript" src="resources/PgwBrowser/pgwbrowser.min.js"><\/script>');
}

if (!hasSession()){
  if (!isIE() || isIE() > 9) {
    document.location.href = "https://www.library.uq.edu.au/uqlais/login?return=" + window.btoa(window.location.href);
  } else {
    // btoa (and this app) don't work in IE8, IE9.
    setUnsupported();
  }
}

var $buoop = {
  vs: {i: 10, f: 15, o: 15, s: 7, c: 36},  // browser versions to notify
  reminder: 0,                   // after how many hours should the message reappear
  // 0 = show all the time
  onshow: function (infos) {
  },      // callback function after the bar has appeared
  onclick: function (infos) {
  },      // callback function if bar was clicked

  l: false,                       // set a language for the message, e.g. "en"
                                  // overrides the default detection
  test: false,                    // true = always show the bar (for testing)
  text: "Please upgrade to the latest version of <a href='http://www.google.com/chrome'>Google Chrome</a> to get the best experience on this site",                       // custom notification html text
  text_xx: "",                    // custom notification text for language "xx"
                                  // e.g. text_de for german and text_it for italian
  newwindow: true                 // open link in new window/tab
};

function $buo_f() {
  var e = document.createElement("script");
  e.src = "//browser-update.org/update.js";
  document.body.appendChild(e);
}

function setUnsupported() {
  if (!hasWebComponentsSupport && window.jQuery) {
    $(document).ready(function () {
      var o = document.createElement("p");
      // this needs to be the old style getter as it needs to run in IE8/9
      var messageCard = document.getElementById('unsupportedBrowserSupportMessage');
      o.id = "browserDetailsOld";
        if (typeof unsupportedRedirect !== 'undefined') {
            o.innerHTML = "<br \/><br \/>Return to <a href='" + unsupportedRedirect.url + "'>" + unsupportedRedirect.title + " <\/a>.";
        } else {
            o.innerHTML = "<br \/><br \/>You can still use <a href=\'https:\/\/www.library.uq.edu.au\/mylibrary\'>the old version of MyLibrary<\/a>.";
        }
      messageCard.appendChild(o);
      document.getElementById('loader').style.display = 'none';
      document.getElementById('loadingTitle').innerHTML = 'Unsupported Browser';
    });
  }
}

try {
  document.addEventListener("DOMContentLoaded", $buo_f, false)
  (function () {
    window.addEventListener('polymer-ready', function () {
      if (document.getElementById('unsupportedBrowser')) {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('unsupportedBrowser').style.display = 'none';
      }
    });
  }());
}
catch (e) {
  if (!hasWebComponentsSupport && window.jQuery) {
    $(document).ready(function () {
      var pgwBrowser = $.pgwBrowser();
      var messageCard = document.querySelector('#unsupportedBrowserSupportMessage');
      var e = document.createElement("p");
      e.id = "browserDetails";
      switch (pgwBrowser.os.group) {
        case 'iOS':
          if (pgwBrowser.os.majorVersion < 6) {
            e.innerHTML = '<br \/><br \/>You are currently using an unsupported version of Safari bundled with Apple iOS version ' + pgwBrowser.os.fullVersion + '. We can only support Safari in Apple iOS version 6 and above.';
            setUnsupported();
          }
          break;
        case 'Windows Phone':
          if (pgwBrowser.os.majorVersion < 8 && pgwBrowser.os.minorVersion < 1) {
            e.innerHTML = '<br \/><br \/>You are currently using a version of Windows Phone older than version 8.1 (version ' + pgwBrowser.os.fullVersion + '). We can only support version 8.1 and above.';
            setUnsupported();
          }
          break;
        case 'Android':
          switch (pgwBrowser.browser.group) {
            case 'Google Chrome':
              if (pgwBrowser.browser.majorVersion < 20) {
                e.innerHTML = '<br \/><br \/>You are currently using an unsupported version of Google Chrome. We can only support Google Chrome 20 and above.';
                setUnsupported();
              }
              break;
            case 'Firefox':
              if (pgwBrowser.browser.majorVersion < 14) {
                e.innerHTML = '<br \/><br \/>You are currently using an unsupported version of Firefox. We can only support Firefox 15 and above.';
                setUnsupported();
              }
              break;
            default:
              if (pgwBrowser.os.majorVersion < 4 || (pgwBrowser.os.majorVersion === 4 && pgwBrowser.os.minorVersion < 4)) {
                e.innerHTML = '<br \/><br \/>Since you are using Android (version ' + pgwBrowser.os.fullVersion + ') you can upgrade from the old Android Browser to <a href=\'https:\/\/play.google.com\/store\/apps\/details?id=com.android.chrome&hl=en\'>Google Chrome for Android<\/a> to get a faster, and compatible web experience.';
                setUnsupported();
              }
              break;
          }
          break;
        case 'Mac OS':
          switch (pgwBrowser.browser.group) {
            case 'Safari':
              if (pgwBrowser.browser.majorVersion < 6) {
                e.innerHTML = '<br \/><br \/>You are currently using an unsupported version of Safari bundled with Apple OSX version ' + pgwBrowser.os.fullVersion + '. We can only support Safari in Apple OSX version 10.5 and above.';
                setUnsupported();
              }
              break;
            case 'Google Chrome':
              if (pgwBrowser.browser.majorVersion < 20) {
                e.innerHTML = '<br \/><br \/>You are currently using an unsupported version of Google Chrome. We can only support Google Chrome 20 and above.';
                setUnsupported();
              }
              break;
            case 'Firefox':
              if (pgwBrowser.browser.majorVersion < 14) {
                e.innerHTML = '<br \/><br \/>You are currently using an unsupported version of Firefox. We can only support Firefox 15 and above.';
                setUnsupported();
              }
              break;
          }
          break;
        case 'Windows':
          switch (pgwBrowser.browser.group) {
            case 'Explorer':
              if (pgwBrowser.browser.majorVersion < 10) {
                e.innerHTML = '<br \/><br \/>You are currently using an unsupported version of Internet Explorer. We can only support IE 10 and above.';
                setUnsupported();
              }
              break;
            case 'Safari':
              if (pgwBrowser.browser.majorVersion < 6) {
                e.innerHTML = '<br \/><br \/>You are currently using an unsupported version of Safari. We can only support Safari 7 and above.';
                setUnsupported();
              }
              break;
            case 'Google Chrome':
              if (pgwBrowser.browser.majorVersion < 20) {
                e.innerHTML = '<br \/><br \/>You are currently using an unsupported version of Google Chrome. We can only support Google Chrome 20 and above.';
                setUnsupported();
              }
              break;
            case 'Firefox':
              if (pgwBrowser.browser.majorVersion < 14) {
                e.innerHTML = '<br \/><br \/>You are currently using an unsupported version of Firefox. We can only support Firefox 15 and above.';
                setUnsupported();
              }
              break;
          }
          break;
        case 'Linux':
          switch (pgwBrowser.browser.group) {
            case 'Google Chrome':
              if (pgwBrowser.browser.majorVersion < 20) {
                e.innerHTML = '<br \/><br \/>You are currently using an unsupported version of Google Chrome. We can only support Google Chrome 20 and above.';
                setUnsupported();
              }
              break;
            case 'Firefox':
              if (pgwBrowser.browser.majorVersion < 14) {
                e.innerHTML = '<br \/><br \/>You are currently using an unsupported version of Firefox. We can only support Firefox 15 and above.';
                setUnsupported();
              }
              break;
          }
          break;

      }
      messageCard.appendChild(e);
    });
  }

  if (window.attachEvent) {
    window.attachEvent("onload", $buo_f);
  }

}