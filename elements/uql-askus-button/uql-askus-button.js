(function () {
  Polymer({
    is: 'uql-askus-button',
    properties: {

    },
    listeners: {
      'uqlibrary-callout-link-clicked': '_linkClicked',
      'uqlibrary-callout-button-opened': '_calloutOpened',
      'uqlibrary-callout-summary-clicked': '_linkClicked'
    },
      attached: function () {
          // This data will be replaced with gulp task to avoid an api call for a static json file
          var contactsJsonFileData = null;
          var contactsJson = contactsJsonFileData;
          var self = this;
          if (contactsJson !== null) {
              this.$.callout.calloutItems = contactsJson;
          } else {
              // Set up a listener to wait till the contacts have been loaded from the API, then push them to the callout
              this.$.contactsApi.addEventListener('uqlibrary-api-contacts-loaded', function(e) {
                  self.$.callout.calloutItems = {
                      "items": e.detail.items,
                      "summary": e.detail.summary
                  };
              });
              // Fire the API to get the contacts
              this.$.contactsApi.get();
          }
      },
		/**
     * Called when a link is clicked in the uqlibrary-callout
     * @param e
     * @private
     */
    _linkClicked: function (e) {
      this.$.ga.addEvent('Click', e.detail);
    },
		/**
     * Called when the callout is opened
     * @param e
     * @private
     */
    _calloutOpened: function (e) {
      this.$.ga.addEvent('Navigation', 'Opened');
    }
  });
})();