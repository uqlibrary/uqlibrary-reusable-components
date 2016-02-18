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

      //temp fix for FFox/Safari, menu item is selected before all elemnets are drawn on the screen
      //making selection underline misplaced
      window.setTimeout(function() {
        that.$.topMenu.select(newValue);
        that.$.topMenu.focusedItem.blur();
      }, 1000);
    },

    _closeDropdown: function(event) {
      var menuItem = event.target;
      while(!menuItem.getAttribute('data-item-index')) {
        menuItem = menuItem.parentElement;
      }

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
      } else {
        //follow the top level link
        window.location.href = currentItem.href;
      }
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