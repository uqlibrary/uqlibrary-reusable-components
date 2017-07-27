(function () {
  Polymer({
    is: 'uql-chat-proactive',
    properties: {
      /**
       * Holds menu item objects for the call out
       */
      menuItems: {
        type: Array,
        value: []
      },
      /**
       * Holds the summary for this call out
       */
      summary: {
        type: Object
      },
      /**
       * Width of the main container
       */
      containerWidth: {
        type: Number,
        value: 280
      },

      /**
       * Whether the chat is online
       */
      _chatOnline: {
        type: Boolean,
        value: false,
        observer: '_handleChangedChatStatus'
      },

      /* all three display tabs are hidden until we ascertain the Chat Status */
      _showChatOnlineTab: {
        type: Boolean,
        value: false
      },
      _showChatOfflineTab: {
        type: Boolean,
        value: false
      },
      _showPopupChatBlock: {
        type: Boolean,
        value: false
      },

      numberSecondsBeforePopup: {
        type: Number,
        value: 10000 // 60000
      },

      /**
       * get the contacts.json details so we launch the same size popup as the regular ask us button
       */
      chatLinkItems: {
        type: Object,
        value: null
      }

    },
    ready: function () {
      var self = this;

      // set a timer for the tab to expand to a window
      // logic - we only do this on page load, not whenever chat comes online.
      // we could do it when chat comes online, but that is liable to give uneven chat loads
      // particularly in the unusual event that chat is going up and down a lot
      // and it might annoy users, going up and down, if they are on the page for a while
      // the tab is always there - that is sufficient

      // add check for 'if cookie not set'
var cookieset = false;
      if (!cookieset) {
        this.async(function () {
          if (this._chatOnline) {
            this._showPopupChatBlock = true;
            this._showChatOnlineTab = false;
          }
        }, this.numberSecondsBeforePopup);
      }
    },

    attached: function () {
      var self = this;

      // get chat status
      this.$.chatStatusApi.addEventListener('uqlibrary-api-chat-status-loaded', function(e) {
        if(e.detail && e.detail.hasOwnProperty('online')) {
          self._chatOnline = e.detail.online;
        }
      });
      this.$.chatStatusApi.get();

      // get contact data - it holds popup details for chat

      // DO NOT REMOVE!! gulp vulcanize task will replace 'null' with json data and thus avoid a live api call
      var contactsJsonFileData = null;
      // we are using this data to get the same size popup as the other chat methods
      var contactsJson = contactsJsonFileData;

      if (contactsJson !== null) {
        this._setData(contactsJson);
      } else {
        this.$.contactsApi.addEventListener('uqlibrary-api-contacts-loaded', function(e) {
          self._setData(e.detail);
        });
        this.$.contactsApi.get();
      }
    },

    /**
     * Called when the chat status has changed, eg uqlibrary-api-chat-status-loaded has fired. Updates display status
     */
    _handleChangedChatStatus: function () {
      if (this._chatOnline) {
        this._showChatOnlineTab = true;
        this._showChatOfflineTab = false;
      } else {
        this._showChatOnlineTab = false;
        this._showPopupChatBlock = false;
        this._showChatOfflineTab = true;
      }
    },

    /*
     * called when the uses clicks the 'x' button or 'maybe later'
     */
    _closeDialog: function() {
      // add cookie to stop it expanding again
      this._showPopupChatBlock = false;
      this._showChatOnlineTab = true;
    },

    /**
     * Returns the relevant link for this item
     * @param item
     * @returns {*}
     * @private
     */
    _link: function (item) {
      if (item.linkMobile && this._isMobile()) {
        return item.linkMobile;
      } else {
        return item.link;
      }
    },

    /**
     * Called when chat open link is clicked. Fires an event and redirects the user to the given link
     * @private
     */
    _openChat: function (e) {
      // Check if this item has a custom "target" attribute
      if (this.chatLinkItems.target) {
        if (this._isMobile()) {
          // On mobile we ignore the targetOptions
          window.open(this._link(this.chatLinkItems), this.chatLinkItems.target);
        } else {
          window.open(this._link(this.chatLinkItems), this.chatLinkItems.target, this.chatLinkItems.targetOptions || "");
        }
      } else {
        window.location = this._link(this.chatLinkItems);
      }
    },

    _openContactForm: function(e) {
      window.location = 'https://uqcurrent.custhelp.com/app/library/contact';
    },

    /**
     * Returns whether the user is on a mobile device
     * @returns {boolean}
     * @private
     */
    _isMobile: function () {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    },

    /**
     * extracts the relevant display items from the contacts array
     * @param data
     * @private
     */
    _setData: function (data) {
      tempitem = data.items.filter(function(item) {
        return (item.label === 'Chat');
      });
      this.chatLinkItems = tempitem[0];
    }
  });
})();