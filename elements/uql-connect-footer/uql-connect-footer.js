(function() {
  Polymer({
    is: 'uql-connect-footer',
    cfmenu: {},
    jsonURL: '../uql-connect-footer/uql-connect-footer.json',
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
