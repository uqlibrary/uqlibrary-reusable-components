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

        // DO NOT REMOVE!! gulp vulcanize task will replace 'null' with json data and thus avoid a live api call
        var contactsJsonFileData = null;
        var contactsJson = contactsJsonFileData;
        var self = this;

        if (contactsJson !== null) {
            this._setData(contactsJson);
        } else {
            this.$.contactsApi.addEventListener('uqlibrary-api-contacts-loaded', function(e) {
                self._setData(e.detail);
            });
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
      this.$.ga.addEvent('AskUs Button', 'Opened');
    },
      
      _setData: function (data) {
          this.$.callout.calloutItems = data;
      }
  });

})();