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
      }
    },

    ready: function() {

    },

    toggleMenu: function() {
      console.log('received command from somewhere... need to toggle menu...')
      this.$.paperDrawerPanel.togglePanel();
    }
  });
})();
