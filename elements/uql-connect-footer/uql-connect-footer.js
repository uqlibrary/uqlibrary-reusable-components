(function() {
  Polymer({
    is: 'uql-connect-footer',
    properties: {

      mainDomain: {
        type: String,
        value: ""
      },

      autoLoad: {
        type: Boolean,
        value: false
      },

      footerMenuUrl: {
        type: String
      },

      verbose: {
        type: Boolean,
        value: true
      },

      menu: {
        type: Object,
        value: function() {
          var menuJsonFileData = null;
          var menuJson = menuJsonFileData;
          if (menuJson !== null) {
            return menuJson;
          }
          else {
            this.autoLoad = true;
            return null;
          }
        }
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
