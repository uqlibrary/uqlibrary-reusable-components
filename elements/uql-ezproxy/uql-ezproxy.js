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
   *
   * Note:
   * Final landing urls for https urls have a special format.
   * but!
   * ezproxy will handle it - we do not need to do anything special for https urls here
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
    },

    /*
     * set the regexp for DOI url matching
     * DOI numbers have formats like: doi:10.10.1038/nphys1170
     * per http://www.doi.org/demos.html
     */
    doiRegexp: {
      type: RegExp,
      value: /^\b(10[.][0-9]{3,}(?:[.][0-9]+)*\/(?:(?!["&\'])\S)+)\b/
    }

  },

  /**
   * Set button label according to the widget mode
   * @param newValue
   * @param oldValue
   * @private
   */
  _createLinkChanged: function(newValue, oldValue) {
    if(this.createLink) {
      this.buttonLabelValue='Create Link'; // used on link generator widget mode
    } else {
      this.buttonLabelValue='Go'; // used on link visit widget mode
    }
  },

  /**
   * Based on the widget mode, the submit method will display the ezproxy link or will open the URL in a new windows/tab
   * @private
   */
  _submit: function () {
    var cleanedUrl;
    if (this.createLink) {
      cleanedUrl = this.cleanupURL(this.$.url.value);
      this.showUrl(cleanedUrl);
    } else {
      this.goProxie();
    }
  },

  /**
   * Display ezproxy link
   * @param cleanedUrl
   */
  showUrl: function (cleanedUrl) {
    var check = this.checkURL(cleanedUrl);
    if (check.valid) {
      var dest = this.getURL(cleanedUrl);
      this.$.ga.addEvent('ShowUrl', dest);
      this.panelToggle();
    }
  },

  /**
   * Open ezproxy link in a new window/tab
   */
  goProxie: function () {
    var cleanedUrl = this.cleanupURL(this.$.url.value);
    var check = this.checkURL(cleanedUrl);
    if (check.valid) {
      var dest = this.getURL(cleanedUrl);
      this.$.ga.addEvent('GoProxy', dest);
      var win = window.open(dest);
      win.focus();
    }
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
   * @param dest
   * @returns {string}
   */
  getURL: function(dest) {
    var result = "";

    var check = this.checkURL(dest);

    if (check.valid) {
      result = 'http://ezproxy.library.uq.edu.au/login?url=';
      if (this.doiRegexp.test(dest)) {
        result += 'http://dx.doi.org/';
      }
      result += dest;
    }
    return result;
  },

  /**
   * Verify if users URL request is a valid link
   * @param dest
   * @returns {boolean}
   */
  checkURL: function (dest) {
    var validation = {
      valid : false,
      message: ''
    };

    if (dest.length <= 0) {
      validation.message = "Please enter a URL";
    } else if(this.doiRegexp.test(dest)) {
      validation.valid = true;
    } else if (!validator.isURL(dest, {require_protocol: true})) {
      if (dest.substring(0, 4).toLowerCase() !== 'http') {
        validation.message = "Invalid URL. Please add the protocol ie: http://, https://";
      } else {
        validation.message = "Invalid URL.";
      }
    } else {
      validation.valid = true;
    }
    this.$.errorMsg.textContent = validation.message;

    this.$.urlContainer.invalid = !validation.valid;

    return validation;
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
      var cleanedUrl = this.cleanupURL(this.$.url.value);
      this.querySelector("#textarea").value = this.getURL(cleanedUrl);
      this.querySelector("#outputUrlDisplay").innerHTML = this.getURL(cleanedUrl);
      this.querySelector("#outputUrl").style.display = "none";
      this.$.testLinkButton.focus();
    }
  },

  /*
   * Copy URL to Clipboard (same as ctrl+a / ctrl+c)
   * Only available for Firefox 41+, Chrome 43+, Opera 29+, IE 10+
   */
  grabUrl: function() {
    //Show the hidden textfield with the URL, and select it
    this.querySelector("#outputUrl").style.display = "block";
    this.$.outputUrl.querySelector("#textarea").select();

    try {
      var successful = document.execCommand('copy');
      this.copyStatus = (successful ? 'URL copied successfully' : 'Unable to copy URL');
    } catch (err) {
      this.copyStatus = 'Unable to copy URL';
    }
    //Hide the textfield
    this.querySelector("#outputUrl").style.display = "none";
    this.$.copyNotification.open();
  },

  /*
   * Display widget primary panel
   */
  ready: function() {
    this.hide = true;
  }

});
