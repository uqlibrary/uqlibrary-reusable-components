(function () {
  Polymer({
    is: 'uql-askus-button',
    properties: {
        autoLoad: {
            type: Object,
            value: true
        }

    },
    listeners: {
      'uqlibrary-callout-link-clicked': '_linkClicked',
      'uqlibrary-callout-button-opened': '_calloutOpened',
      'uqlibrary-callout-summary-clicked': '_linkClicked'
    },
      attached: function () {
        // DO NOT REMOVE!!
        // This data will be replaced with gulp task to avoid an api call for a static json file
        var contactsJsonFileData = null;
        var contactsJson = contactsJsonFileData;
        var self = this;

        if (contactsJson !== null) {
            //this.$.callout.calloutItems = contactsJson;
            this._setData(contactsJson);
        } else {
            // Set up a listener to wait till the contacts have been loaded from the API, then push them to the callout
            this.$.contactsApi.addEventListener('uqlibrary-api-contacts-loaded', function(e) {
                //self.$.callout.calloutItems = {
                //    "items": e.detail.items,
                //    "summary": e.detail.summary
                //};
                self._setData(e.detail);
            });
            // Fire the API to get the contacts
            if(this.autoLoad){
                this.$.contactsApi.get();
            }

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
    },
      
      _setData: function (data) {
          this.$.callout.calloutItems = data;
      }
  });

})();