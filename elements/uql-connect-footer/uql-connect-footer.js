(function() {
  Polymer({
    is: 'uql-connect-footer',
    properties: {
      /**
       * Set the root domain to be used on all links
       * @type {String}
       */
      mainDomain: {
        type: String,
        value: ""
      },

      autoLoad: {
        type: Boolean,
        value: false
      },

      /**
       * json URL containing the links that should be displayed
       * @type {String}
       */
      footerMenuUrl: {
        type: String
      },

      verbose: {
        type: Boolean,
        value: true
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

    _handleError: function (event) {
      console.log(event);
    },

    /**
     * Ajax: Load external json file and allocate its content into the variable menu
     * @type {Boolean}
     */
    _handleResponse: function (event) {
      this.menu = event.detail.response;
    }
  });
})();
