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
        observer: '_handleLoadingChatStatus'
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

      if (this._isPrimoPage(window.location.hostname)) {
        this._addClassToElement('primo', '.offlineTab');
        this._addClassToElement('primo', '.onlineTab');
        this._addClassToElement('primo', '.popupinvite');
        this._watchForPrimoFiltersButton();
      }

      // get chat status after a number of seconds
      // this avoids the initial call which always seems to be offline
      // so we dont briefly load the offline tab
      // the delay also draws the user's attention to the tab
      var numberMillisecondsBeforeChatTabAppears = 3000;
      this.async(function () {
        this.$.chatStatusApi.addEventListener('uqlibrary-api-chat-status-loaded', function (e) {
          if (e.detail && e.detail.hasOwnProperty('online')) {
            self._chatOnline = e.detail.online;
            self._chatStatusUpdated = true;
            self._handleLoadingChatStatus();
          }
        });
        this.$.chatStatusApi.get();
      }, numberMillisecondsBeforeChatTabAppears);

      // get contact data - it holds popup details for chat

      // DO NOT REMOVE!! gulp vulcanize task will replace 'null' with json data and thus avoid a live api call
      var contactsJsonFileData = null;
      // we are using this data to get the same size popup as the other chat methods
      var contactsJson = contactsJsonFileData;

      if (contactsJson !== null) {
        this._setLinks(contactsJson);
      } else {
        this.$.contactsApi.addEventListener('uqlibrary-api-contacts-loaded', function (e) {
          self._setLinks(e.detail);
        });
        this.$.contactsApi.get();
      }

      // show the popup after a delay
      // only the tab is shown on Primo (search.library) not the popup as the z-index required on the #facets div was causing flashing on the page :(
      var numberMillsecondsBeforePopup = 60000; // 1 minute
      if (!this._isCookieSetNoPopup() && !this._isPrimoPage(window.location.hostname)) {
        // set a timer for the tab to expand to a window
        this.async(function () {
          if (this._chatOnline) {
            this._showPopupChatBlock = true;
            this._showChatOnlineTab = false;
          }
        }, numberMillsecondsBeforePopup);
      }
    },

    // if width of chat item is > window width - left pos of #facets
    // then chat popup is laying over the result cards - make it sit inside the sidebar
    _isChatpopupOverlappingPrimoSidebar: function () {
      var sidebarLeft = false;

      var facets = document.querySelector('#facets');
      if (facets) {
        sidebarLeft = facets.getBoundingClientRect().left;
      }

      var proactivechat = document.querySelector('.proactivechat paper-card');

      if (!!sidebarLeft && !!proactivechat) {
        var tt = document.getElementsByTagName('body')[0],
          windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || tt.clientWidth;
        return (proactivechat.getBoundingClientRect().width > (windowWidth - sidebarLeft));
      }

      return false;
    },

    /**
     * Called when the chat status loads, eg uqlibrary-api-chat-status-loaded has fired. Updates display status
     */
    _handleLoadingChatStatus: function () {
      if (this._chatOnline) {
        this._showChatOnlineTab = true;
        this._showChatOfflineTab = false;

        if (this._isPrimoPage(window.location.hostname) && !this._isPrimoInResponsiveMode()) {
          this._makeRoomForPrimoSidebarBottomElements('.onlineTab');
        }
      } else if (typeof this._chatStatusUpdated !== 'undefined') {
        this._showChatOnlineTab = false;
        this._showPopupChatBlock = false;
        this._showChatOfflineTab = true;

        if (this._isPrimoPage(window.location.hostname) && !this._isPrimoInResponsiveMode()) {
          this._makeRoomForPrimoSidebarBottomElements('.offlineTab');
        }
      }
    },

    /**
     * static css isnt sufficient for the primo 'apply filters' widget
     * as its 'bottom edge' position must vary depending on whether the tab or the popup shows, or nothing
     * and we cant just set this on load, because the 'filter' popup isnt available to the dom unless
     * (and until) the user checks a checkbox in the sidebar
     * @private
     */
    _watchForPrimoFiltersButton: function () {
      var numMilliSecondsRecheck = 1000;
      this.async(function () {
        var filterButtonDiv = document.querySelector('.multiselect-submit-inner'); // alternate: querySelector('prm-facet > div > div:nth-of-type(2) > div');
        if (!!filterButtonDiv && filterButtonDiv.getBoundingClientRect().height > 0) {

          var chatLeft = false;
          var chatHeight = false;

          var chatPopup = document.querySelector('.proactivechat paper-card');
          var chatOnlineTab = document.querySelector('.proactivechat .onlineTab');
          var chatOfflineTab = document.querySelector('.proactivechat .offlineTab');
          if (!!chatPopup && chatPopup.getBoundingClientRect().height > 0) {
            chatLeft = chatPopup.getBoundingClientRect().left;
            chatHeight = chatPopup.getBoundingClientRect().height;
          } else if (!!chatOnlineTab && chatOnlineTab.getBoundingClientRect().height > 0) {
            chatLeft = chatOnlineTab.getBoundingClientRect().left;
            chatHeight = chatOnlineTab.getBoundingClientRect().height;
          } else if (!!chatOfflineTab && chatOfflineTab.getBoundingClientRect().height > 0) {
            chatLeft = chatOfflineTab.getBoundingClientRect().left;
            chatHeight = chatOfflineTab.getBoundingClientRect().height;
          }

          if (chatLeft) {
            filterButtonDivWidth = filterButtonDiv.getBoundingClientRect().width;
            filterButtonDivLeft = filterButtonDiv.getBoundingClientRect().left;

            // if the chat widget is inside the filter button area, push the filter button area up
            // so the filter button area isnt under (or over) the chat widget
            if (chatLeft < (filterButtonDivWidth + filterButtonDivLeft)) {
              filterButtonDiv.style.marginBottom = chatHeight + 'px';
            } else {
              filterButtonDiv.style.marginBottom = '0px';
            }
          }
        }

        // check again
        this._watchForPrimoFiltersButton();
      }, numMilliSecondsRecheck);
    },

    /*
     * force a gap at the bottom of the facets sidebar on primo when chat popup is over it
     * so proactive chat doesnt cover any options in the checkbox list
     * @param tagIdentifier string
     * eg this._makeRoomForPrimoSidebarBottomElements('.proactivechat paper-card')
     * @private
     */
    _makeRoomForPrimoSidebarBottomElements: function (tagIdentifier) {
      element = document.querySelector(tagIdentifier);
      if (!!element && element.getBoundingClientRect().height > 0) {
        newMarginBottom = element.getBoundingClientRect().height;

        var sidebarDiv = document.querySelector('.sidebar-inner-wrapper');
        if (sidebarDiv) {
          // move the bottom of the sidebar so it doesnt slide under the filter button block
          sidebarDiv.style.marginBottom = newMarginBottom + 'px';
        }
      }
    },

    /*
     * called when the uses clicks the 'x' button or 'maybe later'
     */
    _closeDialog: function () {
      this._setCookieNoPopup();

      this._showPopupChatBlock = false;
      this._showChatOnlineTab = true;

      if (this._isPrimoPage(window.location.hostname) && !this._isPrimoInResponsiveMode()) {
        this._makeRoomForPrimoSidebarBottomElements('.onlineTab');
      }
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
     * Called when 'Chat Now' is clicked. Collapse to minimal tab when clicked
     */
    openChat: function () {
      this._openWindow(this.chatLinkItems);
      this._showPopupChatBlock = false;
      this._showChatOnlineTab = true;
    },

    /**
     * called when 'Chat offline - leave your question' is clicked
     */
    openContactForm: function () {
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
      tempitem = data.items.filter(function (item) {
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
    _setCookieNoPopup: function () {
      var cookieString = this.cookieNameNoPopup + "=true;";
      cookieString += " expires=" + this._getCookieExpiryDate(1) + ";";
      cookieString += " path=/;";
      cookieString += " domain=" + this.getDomain(window.location.hostname);
      document.cookie = cookieString;
    },

    /**
     * check if the nopopup cookie has been set
     * @returns {boolean}
     * @private
     */
    _isCookieSetNoPopup: function () {
      cookie = this._getCookie(this.cookieNameNoPopup);
      return (typeof cookie !== "undefined");
    },

    /**
     * get the domain that should be written to the cookie
     * we cant hit all the possible domains at the same time,
     * but we can at least set a generic library one, rather than only the subdomain
     * @param hostname
     */
    getDomain: function (hostname) {
      var libraryRegExp = /(.*).library.uq.edu.au/i;
      if ('localhost' === hostname) {
        return 'localhost';
      } else if (libraryRegExp.test(hostname)) {
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

    _isPrimoPage: function (hostname) {
      return (
        this._isPrimoProdPage(hostname) || this._isPrimoSandboxPage(hostname)
      );
    },

    _isPrimoProdPage: function (hostname) {
      return ('search.library.uq.edu.au' === hostname);
    },

    _isPrimoSandboxPage: function (hostname) {
      var regExp = /(.*)exlibrisgroup.com/i;
      return regExp.test(hostname);
    },

    /**
     * add a class to an element
     * eg this._addClassToElement('primo', '.offlineTab')
     * @param newClassName string
     * @param tagIdentifier string
     */
    _addClassToElement: function (newClassName, tagIdentifier) {
      var element = document.querySelector(tagIdentifier);
      if (element) {
        element.classList.add(newClassName);
      }
    },

    _isPrimoInResponsiveMode: function () {
      var tt = document.getElementsByTagName('body')[0],
        windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || tt.clientWidth;

      var windowWidthTablet = 960; // primo goes to mobile width at 960px
      return windowWidth <= windowWidthTablet;
    }
  });
})();