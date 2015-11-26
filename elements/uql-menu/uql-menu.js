(function () {
  Polymer({
    is: 'uql-menu',
    properties: {

      menuJson: {
        type: String
      },

      verbose: {
        type: Boolean,
        value: true
      },

      menu: {
        type: Object
      }
    },

    ready: function() {

    },

    _handleError: function (event) {
      console.log(event);
    },

    _handleResponse: function (event) {
      this.menu = event.detail.response;
    },

    toggleMenu: function() {
      this.$.drawerPanelMenu.toggleMenu();
    }
  });
})();
