(function() {
  Polymer({
    is: 'uql-connect-footer',
    menu: {},
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
      this.menu = event.detail.response;
    }
  });
})();
