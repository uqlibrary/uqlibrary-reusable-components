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
      //DO NOT REMOVE!!
      //this will be replaced with gulp task to avoid an api call for a static json file
      var contactsJsonFileData = null;
      var contactsJson = contactsJsonFileData;
      if (contactsJson !== null) {
        this.$.callout.calloutItems =  contactsJson;
      }
      else {
        this.autoLoad = true;
        return null;
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