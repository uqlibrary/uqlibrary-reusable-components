(function () {
  Polymer({
    is: 'uql-mega-menu',

    subMenuWidth: 480,

    properties: {

      /** menu structure
       * @type {{ "heading": String, "items": Array }} */
      menu: {
        type: Object,
        observer: '_menuChanged'
      },

      /** debugging flag */
      verbose: {
        type: Boolean,
        value: true
      },

      /** currently selected top level menu item */
      selectedMenuItemIndex: {
        type: Number,
        observer: '_selectedMenuChanged'

      }
    },

    _selectedMenuChanged: function(newValue, oldValue) {
      var that = this;

      //temp fix for FFox/Safari, menu item is selected before all elements are drawn on the screen
      //making selection underline misplaced
      window.setTimeout(function() {
        that.$.topMenu.select(newValue);
        if(that.$.topMenu.focusedItem) {
          that.$.topMenu.focusedItem.blur();
        }
      }, 1000);
    },

		/**
     * Called when a sub menu item is clicked
     * @param event
     * @private
     */
    _closeDropdown: function(event) {
      var menuItem = event.target;
      while(!menuItem.getAttribute('data-item-index')) {
        menuItem = menuItem.parentElement;
      }

      this._gaLinkClicked(menuItem.href);

      var tabIndex = Number(menuItem.getAttribute('data-item-index'));
      var subMenu = this.querySelector('#subMenu' + tabIndex);
      subMenu.close();
    },

    _topMenuSelected: function(event) {

      var menuItem = event.target;
      while(!menuItem.getAttribute('data-item-index')) {
        menuItem = menuItem.parentElement;
      }

      var tabIndex = Number(menuItem.getAttribute('data-item-index'));
      var currentItem = this.menu.items[tabIndex];

      if (currentItem.items) {
        //open sub menu for top level menu item
        var subMenu = this.querySelector('#subMenu' + tabIndex);
        subMenu.positionTarget = menuItem;
        menuItem.toggleClass("sub-menu-opened");

        //adjust sub-menu display for narrow screens
        var screenWidth = window.innerWidth || document.getElementsByTagName('body')[0].clientWidth;
        var tabCoords = menuItem.getBoundingClientRect();
        if (tabCoords.left + this.subMenuWidth > screenWidth) {
          subMenu.horizontalOffset = screenWidth - tabCoords.left - this.subMenuWidth;
        }

        subMenu.open();

        this._gaTopMenuClicked(currentItem.label);
      } else {
        //follow the top level link
        this._gaLinkClicked(currentItem.href);
        window.location.href = currentItem.href;
      }
    },
		/**
     * Called when a menu item is clicked that has a dropdown menu
     * @param label
     * @private
     */
    _gaTopMenuClicked: function (label) {
      this.$.ga.addEvent('Navigate', "Top menu " + label);
    },
		/**
     * Called when a link is clicked in the menu
     * @param link
     * @private
     */
    _gaLinkClicked: function (link) {
      this.$.ga.addEvent('Click', link);
    },

    _subMenuClosed: function(event) {
      //reset styles
      var menuIndex = Number(event.target.getAttribute('data-item-index'));
      var deselectedTab = this.querySelectorAll('paper-tab')[menuIndex];

      if(deselectedTab && deselectedTab.className.indexOf("sub-menu-opened") >= 0)
        deselectedTab.toggleClass("sub-menu-opened");
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
      if (newValue !== null) {
        newValue.items.forEach(function(element, index){

          element.hasRight = false;

          if (element.items) {
            element.items.forEach(function(subItem, subIndex) {
              if (subItem.right) {
                element.hasRight = true;
              }
            });
          }

        });
      }
    }

  })
  ;
})();