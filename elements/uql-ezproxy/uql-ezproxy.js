Polymer({
  is: 'uql-ezproxy',
  target:'',
  properties: {
    createLink: {
      type: Boolean,
      value: false
    },
    label: {
      type: String,
      value: ''
    },
    hide: {
      type: Boolean,
      value: true
    },
    url: {
      type: String,
      value: ''
    },
    result: {
      type: String,
      value: ''
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
    this.msg = "";
    if(this.hide) {
      this.$.url.value = "";
      this.target = "";
      this.$.urlContainer.invalid = false;
      this.$.url.focus();
    } else {
      this.$.target.focus();
    }
  },
  grabUrl: function() {
    this.$.target.select();

    try {
      var successful = document.execCommand('copy');
      this.msg = (successful ? 'URL copied successfully' : 'Unable to copy URL');
    } catch (err) {
      this.msg = 'Unable to copy URL';
    }
  },
  enterKey: function (e) {
    if (e.keyCode === 13) {
      this._submit();
    }
  },
/*
  The ready callback is called when an element’s local DOM is ready.
  It is called after the element’s template has been stamped and all elements
  inside the element’s local DOM have been configured (with values bound from
  parents, deserialized attributes, or else default values) and had their
  ready method called.
*/
  ready: function() {
    if(this.createLink) {
      this.label='Create Link';
    } else {
      this.label='Go';
    }
  }
});
