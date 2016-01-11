(function () {
  Polymer({
    is: 'uql-menu',
    properties: {

      /** path to json file with menu structure */
      menuJson: {
        type: String
      },

      /** debugging flag */
      verbose: {
        type: Boolean,
        value: true
      },

      /** autoload json file flag */
      autoLoad: {
        type: Boolean,
        value: false
      },

      /** menu structure
       * @type {{ "heading": String, "items": Array }}
       * */
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
        },
        observer: '_menuChanged'
      },

    /** selected top menu item index */
     selectedMenuItemIndex: {
        type: Number
      },

      /** selected sub menu item index */
      selectedSubMenuItemIndex: {
        type: Number
      }
    },

    ready: function() {
      var that = this;

      setTimeout(function() {
        //reveal elements with easing in effect
        var content = that.querySelectorAll(".loading");

        for(var i=0; i< content.length; i++){
          var element = content[i];
          element.removeAttribute('unresolved');
        }
      }, 0);
    },

    _menuChanged: function(newValue, oldValue) {
      this.selectCurrentMenuItem(window.location.href, this.menu);
    },

    selectCurrentMenuItem: function(url, menuItems) {
      var selectedTopLevelIndex = -1;
      var selectedLowLevelMenu = -1;
      this.selectedMenuItemIndex = -1;

      //set currently selected menu items
      if (menuItems !== null) {
        var that = this;

        menuItems.items.forEach(function (element, index) {

          if (url.indexOf(element.href) >= 0) {
            //top level match, only if lower level menus didn't match
            selectedTopLevelIndex = index;
          }

          if (element.items) {
            element.items.forEach(function (subItem, subItemIndex) {
              if (url.indexOf(subItem.href) >= 0) {
                selectedTopLevelIndex = index;
                selectedLowLevelMenu = subItemIndex;
                element.class = 'iron-selected';
                subItem.class = 'iron-selected';
              }
            });
          }

        });

        if (selectedTopLevelIndex >= 0)
          menuItems.items[selectedTopLevelIndex].class='iron-selected';

        this.selectedMenuItemIndex = selectedTopLevelIndex;

      }
    },

    _handleError: function (event) {
      console.log(event);
    },

    _handleResponse: function (event) {
      var that = this;
      this.menu = event.detail.response;
    },

    toggleMenu: function() {
      this.$.drawerPanelMenu.toggleMenu();
    }
  });
})();
