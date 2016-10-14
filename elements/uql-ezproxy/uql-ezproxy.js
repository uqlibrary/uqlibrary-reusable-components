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
     * Set the component mode to display ezproxy-ed url link (true) or open the url in a new window/tab (false).
     * Default: false
     * @type {Boolean}
     */
    createLink: {
      type: Object,
      value: false
    },

    /*
     * set the regexp for DOI url matching
     * DOI = Digital Object Identifier
     * DOI numbers have formats like: doi:10.10.1038/nphys1170
     * per http://www.doi.org/demos.html
     */
    doiRegexp: {
      type: RegExp,
      value: /^\b(10[.][0-9]{3,}(?:[.][0-9]+)*\/(?:(?!['&\'])\S)+)\b/
    },

    /**
     * url to be passed to ezproxy
     */
    inputUrl: {
      type: String,
      value: ''
    },

    /**
     * the final ezproy-ed url, created from the input url
     */
    outputUrl: {
      type: String,
      value: ''
    },

    /**
     * the status of the copy action, used in paper toast
     */
    copyStatus: {
      type: String,
      value: ''
    },

    /**
     * toggle status of input data panel
     */
    showInputPanel: {
      type: Boolean,
      value: true
    },

    inputValidator : {
      type: Object,
      value: function() {
        return {
          valid: true,
          invalid: false,
          message: ''
        }
      }
    }

  },

  /**
   * handle 'enter key' on input field
   * @param e
   */
  inputUrlKeypress: function(e) {
    if (this.createLink) {
      this.displayUrl(e)
    } else {
      this.navigateToEzproxy(e);
    }
  },

  /**
   * display the ezproxy link
   * @param e
   */
  displayUrl: function(e) {
    var cleanedUrl = this.cleanupUrl(this.inputUrl);
    this.inputValidator = this.checkUrl(cleanedUrl);
    this.outputUrl = this.getUrl(cleanedUrl);

    if (this.inputValidator.valid) {
      this.$.ga.addEvent('ShowUrl', this.outputUrl);

      //show output url panel
      this.showInputPanel = false;
      this.$.testLinkButton.focus();
    }
  },

  /**
   * Open ezproxy link in a new window/tab
   * @param e
   */
  navigateToEzproxy: function (e) {
    var cleanedUrl = this.cleanupUrl(this.inputUrl);
    this.inputValidator = this.checkUrl(cleanedUrl);
    this.outputUrl = this.getUrl(cleanedUrl);

    if (this.inputValidator.valid) {
      this.$.ga.addEvent('GoProxy', this.outputUrl);
      var win = window.open(this.outputUrl);
      win.focus();
    }
  },

  /**
   * remove extraneous bits from the web address
   * @param dest
   * @returns {String}
   */
  cleanupUrl: function(dest) {
    dest = dest.trim();

    var ezpRegexp = /https?:\/\/(www.)?ezproxy.library.uq.edu.au\/login\?url\=/i;
    dest = dest.replace(ezpRegexp, '');

    var ezproxyUrlRegexp = /(([A-Za-z]*:(?:\/\/)?)(.)+(.ezproxy.library.uq.edu.au))(.*)?/;
    if (ezproxyUrlRegexp.test(dest))  {
      dest = dest.replace('.ezproxy.library.uq.edu.au', '');
    }

    var doiRegexp = /https?:\/\/dx.doi.org\//i;
    dest = dest.replace(doiRegexp, '');

    return dest;
  },

  /**
   * create the landing url
   * @param cleanedUrl
   * @returns {string}
   */
  getUrl: function(cleanedUrl) {
    var dest, check;

    dest = '';
    check = this.checkUrl(cleanedUrl);
    if (check.valid) {
      dest = 'http://ezproxy.library.uq.edu.au/login?url=';
      if (this.doiRegexp.test(cleanedUrl)) {
        dest += 'http://dx.doi.org/';
      }
      dest += cleanedUrl;

    }
    return dest;
  },

  /**
   * Verify if users URL request is a valid link
   * @param dest - the URl to be checked
   * @returns {Object}
   */
  checkUrl: function (dest) {
    var validation = {
      valid : false,
      message: ''
    };

    if (dest.length <= 0) {
      validation.message = 'Please enter a URL';
    } else if(this.doiRegexp.test(dest)) {
      validation.valid = true;
    } else if (!validator.isURL(dest, {require_protocol: true})) {
      if (dest.substring(0, 4).toLowerCase() !== 'http') {
        validation.message = 'Invalid URL. Please add the protocol ie: http://, https://';
      } else {
        validation.message = 'Invalid URL.';
      }
    } else {
      validation.valid = true;
    }

    //paper-input-container invalid property doesn't apply ! operator
    validation.invalid = !validation.valid;
    return validation;
  },

  /**
   * resets url input field
   * @param e
   */
  resetInput: function(e) {
    this.showInputPanel = true;
    this.copyStatus = '';
    this.$.inputUrlTextfield.focus();
    this.outputUrl = '';
    this.inputUrl = '';
  },

  /*
   * Copy URL to Clipboard (same as ctrl+a / ctrl+c)
   * Only available for Firefox 41+, Chrome 43+, Opera 29+, IE 10+
   */
  copyUrl: function() {
    var copySuccess = {
      success : false,
      message: ''
    };

    if (!document.execCommand) {
      copySuccess.message = 'Copy function not available in this web browser';
      this.copyStatus = copySuccess.message;
      this.$.copyNotification.open();
      return copySuccess;
    }

    //Show the hidden textfield with the URL, and select it
    this.$.outputUrlTextarea.querySelector('#textarea').select();

    try {
      copySuccess.success = document.execCommand('copy');
      copySuccess.message = (copySuccess.success ? 'URL copied successfully' : 'Unable to copy URL');

    } catch (err) {
      copySuccess.message = 'Unable to copy URL';

    } finally {
      //Hide the textfield
      this.copyStatus = copySuccess.message;
      this.$.copyNotification.open();
    }

    return copySuccess;
  },

  /**
   * ready function
   */
  ready: function() {
  }

});
