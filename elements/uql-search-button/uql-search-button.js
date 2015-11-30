(function () {
  Polymer({
    is: 'uql-search-button',
    properties: {
      showTitle: {
        type: Boolean,
        value: true
      },
      buttonTitle: {
        type: String,
        value: "Site Search"
      },
      redirectUrl: {
        type: String,
        value: "http://www.uq.edu.au/search/?q=%20&as_sitesearch=www.library.uq.edu.au"
      }
    },

    searchClicked: function() {
      window.location.href = this.redirectUrl;
    }
  });
})();

