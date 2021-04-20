function ready(fn) {
  if (document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

function removePolymerElements() {
    var alerts = document.querySelector('uqlibrary-alerts');
    !!alerts && alerts.remove();

    var header = document.querySelector('uq-minimal-header');
    !!header && header.remove();

    var menu = document.querySelector('uql-menu');
    !!menu && menu.remove();

    var subFooter = document.querySelector('uql-connect-footer');
    !!subFooter && subFooter.remove();

    var footer = document.querySelector("uq-minimal-footer");
    !!footer && footer.remove();
}

removePolymerElements()

function insertScript(url, defer) {
  var script = document.querySelector("script[src*='" + url + "']");
  if (!script) {
    var heads = document.getElementsByTagName("head");
    if (heads && heads.length) {
      var head = heads[0];
      if (head) {
        script = document.createElement('script');
        script.setAttribute('src', url);
        script.setAttribute('type', 'text/javascript');
        !!defer && script.setAttribute('defer', '');
        head.appendChild(script);
      }
    }
  }
}

insertScript('https://assets.library.uq.edu.au/reusable-webcomponents/uq-lib-reusable.min.js', true);
insertScript('https://assets.library.uq.edu.au/reusable-webcomponents/applications/drupal/load.js', false);

function loadReusableComponents() {
    // run it a second time once the page is fully loaded, in case one wasnt available the first time. Probably overkill
    removePolymerElements();
}

ready(loadReusableComponents);
