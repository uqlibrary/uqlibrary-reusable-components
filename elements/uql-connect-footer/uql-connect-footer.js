(function() {
  Polymer({
    is: 'uql-connect-footer',
    cfmenu: {},
    properties: {
      createLink: {
        type: Boolean,
        value: false
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
