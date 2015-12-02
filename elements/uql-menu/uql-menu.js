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

      autoLoad: {
        type: Boolean,
        value: false
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
      },

      selectedMenuItemIndex: {
        type: Number
      },

      selectedSubMenuItemIndex: {
        type: Number
      }
    },

    _handleError: function (event) {
      console.log(event);
    },

    _handleResponse: function (event) {
      console.log('getting menu json/....');

      var that = this;
      this.menu = event.detail.response;

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
