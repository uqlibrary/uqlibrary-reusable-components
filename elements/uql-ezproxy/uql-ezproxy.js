Polymer({

  is: 'uql-ezproxy',

  properties: {
    createLink: {
      type: Object,
      value: false,
      observer: "_createLinkChanged"
    }
  },

  _createLinkChanged: function(newValue, oldValue) {
    if(this.createLink) {
      this.buttonLabelValue='Create Link';
    } else {
      this.buttonLabelValue='Go';
    }
  },

  _submit: function () {
    if (this.createLink) {
      this.showUrl();
    } else {
      this.goProxie();
    }
  },

  showUrl: function () {
    if (this.checkURL()) {
      this.panelToggle();
    }
  },

  goProxie: function () {
    if (this.checkURL()) {
      var win = window.open(this.target, '_blank');
      win.focus();
    }
  },

  checkURL: function () {
    var valid = false;
    var doi = /\b(10[.][0-9]{3,}(?:[.][0-9]+)*\/(?:(?!["&\'])\S)+)\b/;

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
    if (valid) {
      this.target = 'http://ezproxy.library.uq.edu.au/login?url=';
      if (doi.test(dest)) {
        this.target += 'http://dx.doi.org/';
      }
      this.target += dest;
    }
    return valid;
  },

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

  ready: function() {
    this.hide = true;
  }

});
