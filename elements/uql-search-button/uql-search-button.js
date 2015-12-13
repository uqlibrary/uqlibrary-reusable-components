(function () {
  Polymer({
    is: 'uql-search-button',
    properties: {

      /** Whether to display title of the button */
      showTitle: {
        type: Boolean,
        value: true
      },

      /** Button title text */
      buttonTitle: {
        type: String,
        value: "Site Search"
      },

      /** Value of redirect URL */
      redirectUrl: {
        type: String,
        value: "http://www.uq.edu.au/search/?q=%20&as_sitesearch=library.uq.edu.au"
      }
    },

    /** Redirects to the specified URL */
    _searchClicked: function() {
      window.location.href = this.redirectUrl;
    }
  });
})();

