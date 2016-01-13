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

      /**
       * json URL containing the links that should be displayed
       * @type {String}
       */
      footerMenuUrl: {
        type: String
      },

      /**
       * Menu Links
       * @type {Object}
       */
      menu: {
        type: Object,
        value: {}
      }
    },

    /**
     * Ajax: Log errors to the browser console
     * @type {Boolean}
     */
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
