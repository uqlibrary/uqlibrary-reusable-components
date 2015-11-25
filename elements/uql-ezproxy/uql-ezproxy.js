Polymer({
  is: 'uql-ezproxy',
  _submit: function () {
    var valid = this.checkURL();
    this.$['urlContainer'].invalid = !valid;
    if (valid) {
      var url = 'http://ezproxy.library.uq.edu.au/login?url=' + this.$['url'].value;
      var win = window.open(url, '_blank');
      win.focus();
    }
  },

  checkURL: function () {
    var dest = this.$['url'].value;
    if (!dest.length > 0) {
      this.$['errorMsg'].textContent = "Please enter a URL";
      return false;
    } else if (!validator.isURL(dest, {require_protocol: true})) {
      if (dest.substring(0, 4).toLowerCase() !== 'http') {
        this.$['errorMsg'].textContent = "Invalid URL. Please add the protocol ie: http://, https://";
      } else {
        this.$['errorMsg'].textContent = "Invalid URL.";
      }
      return false;
    } else if (dest.indexOf('ezproxy.library.uq.edu.au') >= 0) {
      this.$['errorMsg'].textContent = "The domain ezproxy.library.uq.edu.au cannot be used in your URL";
      return false;
    } else {
      this.$['errorMsg'].textContent = "";
      return true;
    }
  }
});
