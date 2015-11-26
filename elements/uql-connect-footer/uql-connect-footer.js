(function() {
  Polymer({
    is: 'uql-connect-footer',
    cfmenu: {},
    properties: {
      footerMenu: {
        type: String
      },
      verbose: {
        type: Boolean,
        value: true
      }
    },

    _handleError: function (event) {
      console.log(event);
    },
    _handleResponse: function (event) {
      this.cfmenu = event.detail.response;
    }
  });
})();
