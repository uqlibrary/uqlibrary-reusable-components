(function () {
  Polymer({
    is: 'uql-mega-menu',

    subMenuWidth: 480,

    properties: {

      menu: {
        type: Object
      },

      verbose: {
        type: Boolean,
        value: true
      }

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
      var deselectedTab = document.querySelectorAll('paper-tab')[menuIndex];

      if(deselectedTab.className.indexOf("sub-menu-opened") >= 0)
        deselectedTab.toggleClass("sub-menu-opened");
    }

  })
  ;
})();
