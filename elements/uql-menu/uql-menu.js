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
      },

      selectedMenuItemIndex: {
        type: Number
      },

      selectedSubMenuItemIndex: {
        type: Number
      }
    },

    attached: function() {
      console.log('im ready');
    },

    _handleError: function (event) {
      console.log(event);
    },

    _handleResponse: function (event) {
      var that = this;
      this.menu = event.detail.response;

      console.log('data loaded');


      //set currently selected menu items
      this.menu.items.forEach(function(element, index){
        if (element.items) {
          element.items.forEach(function(subItem, subItemIndex){
            if (window.location.href.indexOf(subItem.href) >= 0) {
              that.selectedMenuItemIndex = index;
              element.class = 'iron-selected';
              subItem.class = 'iron-selected';
            }
          });
        }
      });
    },

    toggleMenu: function() {
      this.$.drawerPanelMenu.toggleMenu();
    }
  });
})();
