(function() {
  Polymer({
    is: 'uql-connect-footer',
    properties: {
      /**
       * json URL containing the links that should be displayed
       * @type {Boolean}
       */
      autoLoad: {
        type: Boolean,
        value: false
      },

      /**
       * URL to a json file containing the links that should be displayed
       * @type {URL}
       */
      footerMenuUrl: {
        type: String
      },

      verbose: {
        type: Boolean,
        value: true
      },

      /**
       * Object containing all the links imported via ajax
       * @type {Object}
       */
      menu: {
        type: Object,
        value: function() {
          //DO NOT REMOVE!!
          //this will be replaced with gulp task to avoid an api call for a static json file
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

    /** Reveal elements with easing in effect once the element has been loaded **/
    ready: function() {
      var that = this;

      setTimeout(function() {
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
    },

    /**
     * Called when any link in the footer is clicked
     * @param e
     * @private
     */
    _gaLinkClicked: function (e) {
      this.$.ga.addEvent('Click', e.target.href);
    }
  });
})();
