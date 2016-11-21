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
      var self = this;

      this.$.contactsApi.addEventListener('uqlibrary-api-contacts-loaded', function(e) {
        self.$.callout.calloutItems = {
          "items": e.detail.items,
          "summary": e.detail.summary
        };
      });

      this.$.contactsApi.get();
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