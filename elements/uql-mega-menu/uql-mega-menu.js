(function () {
  Polymer({
    is: 'uql-mega-menu',
    menu: {},
    tbCoords: null,
    init: true,
    properties: {
      selectedMenu: {
        type: String,
        value: null
      },
      menuJson: {
        type: String
      },
      verbose: {
        type: Boolean,
        value: true
      }
    },
    _toggleMenu: function (event) {
      if (this.init) {
        this._addBodyListener();
        this.init = false;
      }
      this._initMenuPositions();
      var span = event.currentTarget.querySelector('span');
      var sm = this._getName('menu', span.textContent);
      this.selectedMenu = sm === this.selectedMenu ? null : sm;
    },
    _addBodyListener: function () {
      var that = this;
      document.querySelector('html').addEventListener('click', function () {
        that.selectedMenu = null;
      });
      document.querySelector('uql-mega-menu').addEventListener('click', function (event) {
        event.stopPropagation();
      });
    },
    /*
     * @param {ClientRect} ocr old client rect
     * @param {ClientRect} ncr new client rect
     */
    _clientRectDifferent: function (ocr, ncr) {
      if (
        ocr === null ||
        ncr === null ||
        (ocr.top !== ncr.top) ||
        (ocr.bottom !== ncr.bottom) ||
        (ocr.left !== ncr.left) ||
        (ocr.right !== ncr.right)
      ) {
        return true;
      }

      return false;
    },
    _goLink: function (event) {
      window.location.href = event.currentTarget.getAttribute('href');
    },
    _handleError: function (event) {
      console.log(event);
    },
    _handleResponse: function (event) {
      this.menu = event.detail.response;
    },
    _isHidden: function (selectedMenu, label) {
      var name = this._getName('menu', label);
      return selectedMenu === name ? false : true;
    },
    _initMenuPositions: function () {
      var tb = document.getElementById('uql-toolbar');
      var tbCoords = tb.getBoundingClientRect();

      if (this._clientRectDifferent(tbCoords, this.tbCoords)) {
        this.tbCoords = tbCoords;
        var screenWidth = window.innerWidth || d.documentElement.clientWidth || document.getElementsByTagName(
            'body')[0].clientWidth;
        for (var i = 0, l = this.menu.items.length; i < l; i++) {
          var item = this.menu.items[i];
          if (Array.isArray(item.items) && (item.items.length > 0)) {
            var elId = this._getName('button', item.label);
            var btn = document.getElementById(elId);
            var coords = btn.getBoundingClientRect();
            var menuId = this._getName('menu', item.label);
            var menu = document.getElementById(menuId);
            menu.style.top = (this.tbCoords.bottom - this.tbCoords.top) + 'px';
            // need the width of the material element from the css for this
            if (coords.right + 440 > screenWidth) {
              menu.style.right = '0px';
            }
            else {
              menu.style.left = coords.left + 'px';
            }
          }
        }
      }
    },
    _getName: function (type, label) {
      if (label) {
        return 'uql-' + type + '-' + label.replace(/\W/g, '');
      }
    }
  })
  ;
})();
