(function () {
  Polymer({
    is: 'uql-sidebar',
    debug: 'true',
    menu: {},
    hideMenu: 0,
    behaviors: [Polymer.NeonAnimationRunnerBehavior],
    properties: {
      visible: {
        type: String
      },
      menuJson: {
        type: String
      },
      animationConfig: {
        value: function () {
          return {
            'entry': {
              name: 'slide-from-left-animation',
              node: this.$.main
            },
            'exit': {
              name: 'slide-left-animation',
              node: this.$.main
            }
          };
        }
      }
    },
    listeners: {
      'neon-animation-finish': '_onNeonAnimationFinish'
    },
    _handleError: function (event) {
      console.log(event);
    },
    _handleResponse: function (event) {
      this.menu = event.detail.response;
      this._init();
    },
    _init: function () {
      var that = this;

      this.showMenu = this.visible === 'true' ? true : false;

      document.querySelector('html').addEventListener('click', function () {
        if (that.showMenu) {
          that._toggleVisibility();
        }
      })
      document.querySelector('uql-sidebar').addEventListener('click', function (event) {
        event.stopPropagation();
      })

      var toggles = document.querySelectorAll('.toggle');

      for (var t in toggles) {
        if (toggles.hasOwnProperty(t)) {
          toggles[t].addEventListener('click', function (event) {
            that._toggleVisibility();
            event.stopPropagation();
          });
        }
      }
      this._computeVisibility();
    },
    _goLink: function (event) {
      window.location.href = event.currentTarget.getAttribute('href');
    },
    _toggleVisibility: function () {
      this.showMenu = this.showMenu ? false : true;
      this._computeVisibility();
    },
    _onNeonAnimationFinish: function () {
      this.hideMenu = this.showMenu ? 0 : 1;
    },
    _computeVisibility: function () {
      if (this.showMenu) {
        this.hideMenu = 0;
      }
      this.playAnimation(this.showMenu ? 'entry' : 'exit');
    }
  });
})();
