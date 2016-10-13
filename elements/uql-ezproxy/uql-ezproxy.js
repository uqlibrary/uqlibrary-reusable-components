Polymer({
  /**
   * An url is provided that the user wants an ezyproxy url of
   * eg http://www.sciencedirect.com/science/article/pii/S1744388116300159
   * the eventual landing url will be
   * http://www.sciencedirect.com.ezproxy.library.uq.edu.au/science/article/pii/S1744388116300159
   * However!
   * @dcallan says that this can fail sometimes in the ezproxy portal
   * so the url we build has the form:
   * http://ezproxy.library.uq.edu.au/login?url=http://www.sciencedirect.com/science/article/pii/S1744388116300159
   * for passing to the portal
   */


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
  Doi_Id_Regexp: function() {
    // DOI numbers have formats like: doi:10.10.1038/nphys1170
    // per http://www.doi.org/demos.html
    return /^\b(10[.][0-9]{3,}(?:[.][0-9]+)*\/(?:(?!["&\'])\S)+)\b/;
  },

  /**
   * remove extraneous bits from the web address
   * @param dest
   * @returns {*}
   */
  cleanupURL: function(dest) {
    dest = dest.trim();
    dest = dest.replace('http://ezproxy.library.uq.edu.au/login?url=', '');

    var ezproxyUrlRegexp = /(([A-Za-z]*:(?:\/\/)?)(.)+(.ezproxy.library.uq.edu.au))(.*)?/;
    if (ezproxyUrlRegexp.test(dest))  {
      dest = dest.replace('.ezproxy.library.uq.edu.au', '');
    }

    dest = dest.replace('http://dx.doi.org/', '');

    return dest;
  },

  /**
   * create the landing url
   * @returns {string}
   */
  getURL: function() {
    var doi = this.Doi_Id_Regexp();

    var dest = this.cleanupURL(this.$.url.value);

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
    var doi = this.Doi_Id_Regexp();

    var dest = this.cleanupURL(this.$.url.value);

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
      this.$.urlContainer.invalid = false;
      this.$.url.focus();
    } else {
      this.querySelector("#textarea").value = this.getURL();
      this.querySelector("#newURL").innerHTML = this.getURL();
      this.querySelector("#outputUrl").style.display = "none";

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
