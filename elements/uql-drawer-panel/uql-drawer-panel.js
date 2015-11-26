(function () {

  Polymer({
    is: 'uql-drawer-panel',

    properties: {
      menu: {
        type: Object
      }
    },

    ready: function() {
    },

    isDrawerVisible: function(event) {
      console.log(event);
      if (this.$.paperDrawerPanel.selected === 'main') {

        if (this.$.paperDrawerPanel.className.indexOf('hidden') < 0) {
          //hide paper drawer panel when menu is not displayed
          this.$.paperDrawerPanel.toggleClass('hidden');
        }

      } else if (this.$.paperDrawerPanel.selected === 'drawer') {
        if (this.$.paperDrawerPanel.className.indexOf('hidden') >= 0) {
          //show paper drawer panel when menu is displayed
          this.$.paperDrawerPanel.toggleClass('hidden');
        }
      }
    },

    toggleMenu: function() {
      this.$.paperDrawerPanel.toggleClass('hidden');
      this.$.paperDrawerPanel.togglePanel();
    },

    menuSelected: function(event) {
      var menuIndex = Number(event.target.getAttribute('data-item-index'));
      var subMenu = this.querySelector('#subMenu' + menuIndex);
      subMenu.toggle();
    }
  });
})();
