var hasWebComponentsSupport = ('registerElement' in document
  && 'createShadowRoot' in HTMLElement.prototype
  && 'import' in document.createElement('link')
  && 'content' in document.createElement('template'));

function isIE() {
  var myNav = navigator.userAgent.toLowerCase();
  return (myNav.indexOf('msie') != -1) ? parseInt(myNav.split('msie')[1]) : false;
}

var $buoop = {
  vs: {i: 10, f: 15, o: 15, s: 7, c: 36},  // browser versions to notify
  reminder: 0,                   // after how many hours should the message reappear , 0 = show all the time
  onshow: function (infos) { },      // callback function after the bar has appeared
  onclick: function (infos) { },      // callback function if bar was clicked
  l: false,                       // set a language for the message, e.g. "en", overrides the default detection
  test: false,                    // true = always show the bar (for testing)
  text: "Please upgrade to the latest version of <a href='http://www.google.com/chrome'>Google Chrome</a> to get the best experience on this site",                       // custom notification html text
  newwindow: true                 // open link in new window/tab
};

function $buo_f() {
  var e = document.createElement("script");
  e.src = "//browser-update.org/update.js";
  document.body.appendChild(e);
}

try {
  document.addEventListener("DOMContentLoaded", $buo_f, false);
}
catch (e) {
  if (!hasWebComponentsSupport && window.jQuery) {
    $(document).ready(function () {
      var pgwBrowser = $.pgwBrowser();

      switch (pgwBrowser.os.group) {
        case 'iOS':
          if (pgwBrowser.os.majorVersion < 6) {
            $buoop.text = 'You are currently using an unsupported version of Safari bundled with Apple iOS version ' + pgwBrowser.os.fullVersion + '. We can only support Safari in Apple iOS version 6 and above.';
          }
          break;
        case 'Windows Phone':
          if (pgwBrowser.os.majorVersion < 8 && pgwBrowser.os.minorVersion < 1) {
            $buoop.text = 'You are currently using a version of Windows Phone older than version 8.1 (version ' + pgwBrowser.os.fullVersion + '). We can only support version 8.1 and above.';
          }
          break;
        case 'Android':
          switch (pgwBrowser.browser.group) {
            case 'Google Chrome':
              if (pgwBrowser.browser.majorVersion < 20) {
                $buoop.text = 'You are currently using an unsupported version of Google Chrome. We can only support Google Chrome 20 and above.';
              }
              break;
            case 'Firefox':
              if (pgwBrowser.browser.majorVersion < 14) {
                $buoop.text = 'You are currently using an unsupported version of Firefox. We can only support Firefox 15 and above.';
              }
              break;
            default:
              if (pgwBrowser.os.majorVersion < 4 || (pgwBrowser.os.majorVersion === 4 && pgwBrowser.os.minorVersion < 4)) {
                $buoop.text = 'Since you are using Android (version ' + pgwBrowser.os.fullVersion + ') you can upgrade from the old Android Browser to <a href=\'https:\/\/play.google.com\/store\/apps\/details?id=com.android.chrome&hl=en\'>Google Chrome for Android<\/a> to get a faster, and compatible web experience.';
              }
              break;
          }
          break;
        case 'Mac OS':
          switch (pgwBrowser.browser.group) {
            case 'Safari':
              if (pgwBrowser.browser.majorVersion < 6) {
                $buoop.text = 'You are currently using an unsupported version of Safari bundled with Apple OSX version ' + pgwBrowser.os.fullVersion + '. We can only support Safari in Apple OSX version 10.5 and above.';
              }
              break;
            case 'Google Chrome':
              if (pgwBrowser.browser.majorVersion < 20) {
                $buoop.text = 'You are currently using an unsupported version of Google Chrome. We can only support Google Chrome 20 and above.';
              }
              break;
            case 'Firefox':
              if (pgwBrowser.browser.majorVersion < 14) {
                $buoop.text = 'You are currently using an unsupported version of Firefox. We can only support Firefox 15 and above.';
              }
              break;
          }
          break;
        case 'Windows':
          switch (pgwBrowser.browser.group) {
            case 'Explorer':
              if (pgwBrowser.browser.majorVersion < 10) {
                $buoop.text = 'You are currently using an unsupported version of Internet Explorer. We can only support IE 10 and above.';
              }
              break;
            case 'Safari':
              if (pgwBrowser.browser.majorVersion < 6) {
                $buoop.text = 'You are currently using an unsupported version of Safari. We can only support Safari 7 and above.';
              }
              break;
            case 'Google Chrome':
              if (pgwBrowser.browser.majorVersion < 20) {
                $buoop.text = 'You are currently using an unsupported version of Google Chrome. We can only support Google Chrome 20 and above.';
              }
              break;
            case 'Firefox':
              if (pgwBrowser.browser.majorVersion < 14) {
                $buoop.text = 'You are currently using an unsupported version of Firefox. We can only support Firefox 15 and above.';
              }
              break;
          }
          break;
        case 'Linux':
          switch (pgwBrowser.browser.group) {
            case 'Google Chrome':
              if (pgwBrowser.browser.majorVersion < 20) {
                $buoop.text = 'You are currently using an unsupported version of Google Chrome. We can only support Google Chrome 20 and above. <a href="http://www.google.com/chrome">Upgrade here</a>';
              }
              break;
            case 'Firefox':
              if (pgwBrowser.browser.majorVersion < 14) {
                $buoop.text = 'You are currently using an unsupported version of Firefox. We can only support Firefox 15 and above. <a href="https://www.mozilla.org/en-US/firefox/new/">Upgrade here</a>';
              }
              break;
          }
          break;
      }
    });
  }

  if (window.attachEvent) {
    window.attachEvent("onload", $buo_f);
  }
}