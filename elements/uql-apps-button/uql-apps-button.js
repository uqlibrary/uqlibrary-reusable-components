(function () {
  Polymer({
    is: 'uql-apps-button',
    properties: {
      showTitle: {
        type: Boolean,
        value: true
      },
      buttonTitle: {
        type: String,
        value: "My Library"
      },
      redirectUrl: {
        type: String,
        value: "https://www.library.uq.edu.au/mylibrary"
      }
    },
    myLibraryClicked: function() {
      window.location.href = this.redirectUrl;
    }
  });
})();

