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

      /** Value of redirect URL updated Dec 2016 */
      redirectUrl: {
        type: String,
        value: "http://www.uq.edu.au/search/?q=%20&as_sitesearch=library.uq.edu.au"
      }
    },

    /** Redirects to the specified URL */
    _searchClicked: function() {
      this.$.ga.addEvent("Click", this.redirectUrl);
      window.location.href = this.redirectUrl;
    }
  });
})();

