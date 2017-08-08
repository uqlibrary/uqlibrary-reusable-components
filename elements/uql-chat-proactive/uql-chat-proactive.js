(function () {
  Polymer({
    is: 'uql-chat-proactive',
    properties: {
      /**
       * Whether Chat is online
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

      /* stops flash of offline before online tab */
      _chatStatusUpdated: {
        type: Boolean,
        value: false
      },

      numberMillisecondsBeforeChatTabAppears: {
        type: Number,
        value: 3000
      },

      numberMillsecondsBeforePopup: {
        type: Number,
        value: 60000
      },

      cookieNameNoPopup: {
        type: String,
        value: 'noChatPopup'
      },

      /**
       * get the contacts.json details so we launch the same size popup as the regular ask us button
       */
      chatLinkItems: {
        type: Object,
        value: null
      }

    },

    attached: function () {
      var self = this;

      // get chat status after a number of seconds
      // this avoids the initial call which always seems to be offline
      // so we dont briefly load the offline tab
      // the delay also draws the user's attention to the tab
      this.async(function () {
        this.$.chatStatusApi.addEventListener('uqlibrary-api-chat-status-loaded', function(e) {
          if(e.detail && e.detail.hasOwnProperty('online')) {
            self._chatOnline = e.detail.online;
            self._chatStatusUpdated = true;
            self._handleChangedChatStatus();
          }
        });
        this.$.chatStatusApi.get();
      }, this.numberMillisecondsBeforeChatTabAppears);

      // get contact data - it holds popup details for chat

      // DO NOT REMOVE!! gulp vulcanize task will replace 'null' with json data and thus avoid a live api call
      var contactsJsonFileData = null;
      // we are using this data to get the same size popup as the other chat methods
      var contactsJson = contactsJsonFileData;

      if (contactsJson !== null) {
        this._setLinks(contactsJson);
      } else {
        this.$.contactsApi.addEventListener('uqlibrary-api-contacts-loaded', function(e) {
          self._setLinks(e.detail);
        });
        this.$.contactsApi.get();
      }

      if (!this._isCookieSetNoPopup()) {
        // set a timer for the tab to expand to a window
        // logic - we only do this on page load (ie attached function), not whenever chat comes online.
        // we could do it when chat comes online, but that is liable to give uneven chat loads
        // particularly in the unusual event that chat is going up and down a lot
        // and it might annoy users, going up and down, if they are on the page for a while
        // the tab is always there - that is sufficient
        this.async(function () {
          if (this._chatOnline) {
            this._showPopupChatBlock = true;
            this._showChatOnlineTab = false;
          }
        }, this.numberMillsecondsBeforePopup);
      }
    },

    /**
     * Called when the chat status has changed, eg uqlibrary-api-chat-status-loaded has fired. Updates display status
     */
    _handleChangedChatStatus: function () {
      if (this._chatOnline) {
        this._showChatOnlineTab = true;
        this._showChatOfflineTab = false;
      } else if (typeof this._chatStatusUpdated !== 'undefined') {
        this._showChatOnlineTab = false;
        this._showPopupChatBlock = false;
        this._showChatOfflineTab = true;
      }
    },

    /*
     * called when the uses clicks the 'x' button or 'maybe later'
     */
    _closeDialog: function() {
      this._setCookieNoPopup();
      this._showPopupChatBlock = false;
      this._showChatOnlineTab = true;
    },

    /**
     * Returns the relevant link for this item
     * @param item
     * @returns {*}
     * @private
     */
    _getLink: function (item) {
      if (item.linkMobile && this._isMobile(navigator.userAgent)) {
        return item.linkMobile;
      } else {
        return item.link;
      }
    },

    /**
     * open a link for any Contact object
     * @param item
     * @private
     */
    _openWindow: function (item) {
      // Check if this item has a custom "target" attribute
      if (item.target) {
        if (this._isMobile(navigator.userAgent)) {
          // On mobile we ignore the targetOptions
          window.open(this._getLink(item), item.target);
        } else {
          window.open(this._getLink(item), item.target, item.targetOptions || "");
        }
      } else {
        window.location = this._getLink(item);
      }
    },

    /**
     * Called when 'Chat Now' is clicked.
     */
    openChat: function () {
      this._openWindow(this.chatLinkItems);
      this._showPopupChatBlock = false;
      this._showChatOnlineTab = true;
    },

    /**
     *
     * called when 'leave a question' is clicked
     */
    openContactForm: function() {
      this._openWindow(this.contactLinkItems);
    },

    /**
     * Returns whether the user is on a mobile device
     * @returns {boolean}
     * @private
     */
    _isMobile: function (userAgent) {
      return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
    },

    /**
     * extracts the relevant display items from the contacts array
     * @param data
     * @private
     */
    _setLinks: function (data) {
      this.chatLinkItems = this._setLink(data, 'Chat');
      this.contactLinkItems = this._setLink(data, 'Contact form');
    },

    /**
     * get one chunk of the Contact data, per the label
     * @param data Object
     * @param label string
     * @returns object
     * @private
     */
    _setLink: function (data, label) {
      tempitem = data.items.filter(function(item) {
        return (item.label === label);
      });
      return tempitem[0];
    },

    /**
     * Gets a cookie by name
     * @param name the name of the cookie to return
     * @returns {String}
     * @private
     */
    _getCookie: function (name) {
      var parts = document.cookie.split(";");
      for (var i = 0, l = parts.length; i < l; i++) {
        var cookieParts = parts[i].trim().split('=');
        if (cookieParts[0] === name) {
          return cookieParts[1];
        }
      }
    },

    /**
     * get the date string for the cookie expiry
     * @param numDaysExpiry integer
     * @returns string
     */
    _getCookieExpiryDate: function (numDaysExpiry) {
      var date = new Date();
      date.setTime(date.getTime() + (numDaysExpiry * 24 * 60 * 60 * 1000));
      return date.toGMTString();
    },

    /**
     * set a cookie so the user doesnt see the popup for a while
     * (was originally session cookie, but Chrome doesnt delete those!)
     * @private
     */
    _setCookieNoPopup: function() {
      var cookieString = this.cookieNameNoPopup + "=true;";
      cookieString += " expires=" + this._getCookieExpiryDate(1) + ";";
      cookieString += " path=/;";
      cookieString += " domain=" + this.getDomain(window.location.hostname);
      document.cookie = cookieString;
    },

    /**
     * check if the nopop cookie has been set
     * @returns {boolean}
     * @private
     */
    _isCookieSetNoPopup: function() {
      cookie = this._getCookie(this.cookieNameNoPopup);
      return (typeof cookie !== "undefined");
    },

    /**
     * get the domain that should be written to the cookie
     * we cant hit all the possible domains at the same time,
     * but we can at least set a generic library one, rather than only the subdomain
     * @param hostname
     */
    getDomain: function(hostname) {
      var libraryRegExp = /(.*).library.uq.edu.au/i;
      if ('localhost' == hostname)  {
        return 'localhost';
      } else if (libraryRegExp.test(hostname))  {
        // If we are on a library subdomain, use library root domain.
        return '.library.uq.edu.au';
      } else {
        // Otherwise, eg studenthub.uq.edu.au, use that domain, without any www
        var otherRegExp = /www.(.*)/i;
        if (otherRegExp.test(hostname)) {
          return hostname.substring(3);
        } else {
          return '.' + hostname;
        }
      }
    }

  });
})();