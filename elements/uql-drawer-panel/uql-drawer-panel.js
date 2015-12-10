(function () {

  Polymer({
    is: 'uql-drawer-panel',

    properties: {
      menu: {
        type: Object
      }
    },

    ready: function() {

      var D = document;
      var height = Math.max(
        D.body.scrollHeight, D.documentElement.scrollHeight,
        D.body.offsetHeight, D.documentElement.offsetHeight,
        D.body.clientHeight, D.documentElement.clientHeight, window.innerHeight
      );

      this.$.paperDrawerPanel.setAttribute('style', 'height: ' + height + 'px');
    },

    _isDrawerVisible: function(event) {
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

    toggleMenu: function(event) {
      var that = this;

      if (event) {
        setTimeout(function(){
          that.$.paperDrawerPanel.toggleClass('hidden');
          that.$.paperDrawerPanel.togglePanel();
        }, 100);
      } else {
        this.$.paperDrawerPanel.toggleClass('hidden');
        this.$.paperDrawerPanel.togglePanel();
      }
    },

    _menuSelected: function(event) {

      var menuItem = event.target;
      while(!menuItem.getAttribute('data-item-index')) {
        menuItem = menuItem.parentElement;
      }

      var menuIndex = Number(menuItem.getAttribute('data-item-index'));
      var subMenu = this.querySelector('#subMenu' + menuIndex);

      subMenu.toggle();
    }

  });
})();
