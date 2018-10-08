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
        // if you change this value, consider the time in _setPopupMaxWidthInPrimo
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
      },

      /*
       * holds the height we put below the Apply Filter button - varies if tab or popup showing
       */
      filterButtonDivMarginBottom: {
        type: Number,
        value: 0
      }
    },

    attached: function () {
      var self = this;

      if (this._isPrimoPage(window.location.hostname)) {
        this._setPopupMaxWidthInPrimo();
        this._watchForPrimoFiltersButton();
      }

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
            this._setPrimoFilterButtonPositioning(125);
            this._makeRoomForSidebarBottomElements(70);
            this._showChatOnlineTab = false;
          }
        }, this.numberMillsecondsBeforePopup);
      }
    },

    /**
     * Called when the chat status has changed, eg uqlibrary-api-chat-status-loaded has fired. Updates display status
     */
    _handleChangedChatStatus: function() {
      if (this._chatOnline) {
        this._showChatOnlineTab = true;
        this._showChatOfflineTab = false;
      } else if (typeof this._chatStatusUpdated !== 'undefined') {
        this._showChatOnlineTab = false;
        this._showPopupChatBlock = false;
        this._showChatOfflineTab = true;
      }
      this._setPrimoFilterButtonPositioningForTab();
      this._makeRoomForSidebarBottomElements(0);
    },

    /**
     * On the primo results page, change the width of the proactive chat popup
     * so that it doesnt overlap the results list
     * because there are yucky things happening there with z-index.
     * If they load the page with no query, there is no sidebar yet - async gets around that
     * @private
     */
    _setPopupMaxWidthInPrimo: function() {
      var numMilliSecondsRecheck = 10000; // 10 seconds - we have 60 seconds before the popup loads. give them time to type in their query...

      var sidebarWidthString;
      var proactivechat;
      var facets;

      this.async(function () {
        facets = document.querySelector('#facets');
        if (facets) {
          sidebarWidthString = window.getComputedStyle(facets, null).getPropertyValue('width').trim();
        }
        if (sidebarWidthString) {
          proactivechat = document.querySelector('.proactivechat paper-card');
        }
        if (proactivechat) {
          proactivechat.style.maxWidth = sidebarWidthString;
        } else {
          this._setPopupMaxWidthInPrimo();
        }
      }, numMilliSecondsRecheck);
    },

    /**
     * while we have used css to stop the facet sidebar going 'over' the proactive chat widget,
     * static css isnt sufficient for the primo 'apply filters' widget
     * as its 'bottom edge' position must vary depending on whether the tab or the popup shows, or nothing
     * and we cant just set this on load, because the 'filter' popup isnt available to the dom unless
     * (and until) the user checks a checkbox in the sidebar
     * @private
     */
    _watchForPrimoFiltersButton: function() {
      var numMilliSecondsRecheck = 1000;
      this.async(function () {
        var filterButtonDiv = document.querySelector('.multiselect-submit-inner');
        if (filterButtonDiv) {
            // move the block with the filter button so it doesnt slide under the proactive chat widget
            filterButtonDiv.style.marginBottom = this.filterButtonDivMarginBottom + 'px';
        }

        // check again
        this._watchForPrimoFiltersButton();
      }, numMilliSecondsRecheck);
    },

    /*
     * force a gap at the bottom of the facets sidebar on primo
     * so proactive chat doesnt cover any options
     */
    _makeRoomForSidebarBottomElements: function(sidebarDivMarginBottom) {
      if (this._isPrimoPage(window.location.hostname)) {
        var sidebarDiv = document.querySelector('.sidebar-inner-wrapper');
        if (sidebarDiv) {
            // move the bottom of the sidebar so it doesnt slide under the filter button block
            sidebarDiv.style.marginBottom = sidebarDivMarginBottom + 'px';
        }
      }
    },

    /*
     * the amount of space needed to allow the 'apply filters' button to appear
     * pixels
     */
    _setPrimoFilterButtonPositioning: function(bottomMargin) {
      this.filterButtonDivMarginBottom = bottomMargin;
    },

    /*
     * the amount of space needed to allow the 'apply filters' button to appear above the tab
     */
    _setPrimoFilterButtonPositioningForTab: function() {
      // put a 45px margin at the bottom
      this._setPrimoFilterButtonPositioning(25);
    },

    /*
     * called when the uses clicks the 'x' button or 'maybe later'
     */
    _closeDialog: function() {
      this._setCookieNoPopup();
      this._showPopupChatBlock = false;
      this._showChatOnlineTab = true;
      this._setPrimoFilterButtonPositioningForTab();
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
      this._setPrimoFilterButtonPositioningForTab();
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
      if ('localhost' === hostname)  {
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
    },

    _isPrimoPage: function(hostname) {
      return (
        this._isPrimoProdPage(hostname) || this._isPrimoSandboxPage(hostname)
      );
    },

    _isPrimoProdPage: function(hostname) {
      return ('search.library.uq.edu.au' === hostname);
    },

    _isPrimoSandboxPage: function(hostname) {
      var regExp = /(.*)exlibrisgroup.com/i;
      return regExp.test(hostname);
    }
  });
})();