(function () {

  Polymer({
    is: 'uql-drawer-panel',

    properties: {
      menu: {
        type: Object
      }
    },

    ready: function() {
      this.$.paperDrawerPanel.setAttribute('style', 'height: ' + window.innerHeight + 'px');
    },

    isDrawerVisible: function(event) {
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

      var menuItem = event.target;
      while(!menuItem.getAttribute('data-item-index')) {
        menuItem = menuItem.parentElement;
      }

      var menuIndex = Number(menuItem.getAttribute('data-item-index'));
      var subMenu = this.querySelector('#subMenu' + menuIndex);
      console.log("menu item index: " + menuIndex);

      subMenu.toggle();
    }
  });
})();
