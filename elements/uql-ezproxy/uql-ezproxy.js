Polymer({

  is: 'uql-ezproxy',

  properties: {
    /**
     * Set the Widget mode to Display target link (true) or open the url in a new window/tab (false). Default: false
     * @type {Boolean}
     */
    createLink: {
      type: Object,
      value: false,
      observer: "_createLinkChanged"
    }
  },

  /*
   * Set button label according to the widget mode
   */
  _createLinkChanged: function(newValue, oldValue) {
    if(this.createLink) {
      this.buttonLabelValue='Create Link';
    } else {
      this.buttonLabelValue='Go';
    }
  },

  /*
   * Based on the widget mode, the submit method will display the ezproxy link or will open the URL in a new windows/tab
   */
  _submit: function () {
    if (this.createLink) {
      this.showUrl();
    } else {
      this.goProxie();
    }
  },

  /*
   * Display ezproxy link
   */
  showUrl: function () {
    if (this.checkURL()) {
      var dest = this.getURL();
      this.$.ga.addEvent('ShowUrl', dest);
      this.panelToggle();
    }
  },

  /*
   * Open ezproxy link in a new window/tab
   */
  goProxie: function () {
    if (this.checkURL()) {
      var dest = this.getURL();
      this.$.ga.addEvent('GoProxy', dest);
      var win = window.open(dest);
      win.focus();
    }
  },

  /*
   * set the regexp for url matching
   */
  getregexp: function() {
    return /^\b(10[.][0-9]{3,}(?:[.][0-9]+)*\/(?:(?!["&\'])\S)+)\b/;
  },

  /*
   * create the landing url
   */
  getURL: function() {
    var doi = this.getregexp();

    var dest = this.$.url.value;
    dest = dest.replace('http://ezproxy.library.uq.edu.au/login?url=', '');
    dest = dest.replace('http://dx.doi.org/', '');

    var result = "";
    if (this.checkURL()) {
      result = 'http://ezproxy.library.uq.edu.au/login?url=';
      if (doi.test(dest)) {
        result += 'http://dx.doi.org/';
      }
      result += dest;
    }
    return result;
  },

  /*
   * Verify if users URL request is a valid link
   * @return {Boolean}
   */
  checkURL: function () {
    var valid = false;
    var doi = this.getregexp();

    var dest = this.$.url.value;
    dest = dest.replace('http://ezproxy.library.uq.edu.au/login?url=', '');
    dest = dest.replace('http://dx.doi.org/', '');

    if (dest.length <= 0) {
      this.$.errorMsg.textContent = "Please enter a URL";
    } else if(doi.test(dest)) {
      valid = true;
    } else if (!validator.isURL(dest, {require_protocol: true})) {
      if (dest.substring(0, 4).toLowerCase() !== 'http') {
        this.$.errorMsg.textContent = "Invalid URL. Please add the protocol ie: http://, https://";
      } else {
        this.$.errorMsg.textContent = "Invalid URL.";
      }
    } else if (dest.indexOf('ezproxy.library.uq.edu.au') >= 0) {
      this.$.errorMsg.textContent = "The domain ezproxy.library.uq.edu.au cannot be used in your URL";
    } else {
      this.$.errorMsg.textContent = "";
      valid = true;
    }

    this.$.urlContainer.invalid = !valid;

    return valid;
  },

  /*
   * Show ezproxy link panel or Hide and clean its values
   */
  panelToggle: function() {
    this.hide=!this.hide;
    this.copyStatus = "";
    if(this.hide) {
      this.$.url.value = "";
      this.target = "";
      this.$.urlContainer.invalid = false;
      this.$.url.focus();
    } else {
      this.$.testLinkButton.focus();
    }
  },

  /*
   * Copy URL to Clipboard (same as ctrl+a / ctrl+c)
   * Only available for Firefox 41+, Chrome 43+, Opera 29+, IE 10+
   */
  grabUrl: function() {
    this.$.outputUrl.querySelector("#textarea").select();

    try {
      var successful = document.execCommand('copy');
      this.copyStatus = (successful ? 'URL copied successfully' : 'Unable to copy URL');
    } catch (err) {
      this.copyStatus = 'Unable to copy URL';
    }

    this.$.copyNotification.open();
  },

  /*
   * Display widget primary panel
   */
  ready: function() {
    this.hide = true;
  }

});
