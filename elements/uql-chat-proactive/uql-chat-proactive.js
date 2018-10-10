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

      /**
       * to save processing time, hard code the height of the minimised tab for use
       */
        _heightChatMinimisedTab: {
          type: Number,
          value: 70
      }

    // /*
      //  * holds the height we put below the Apply Filter button - varies if tab or popup showing
      //  */
      // filterButtonDivMarginBottom: {
      //   type: Number,
      //   value: 0
      // }
    },

    attached: function () {
      var self = this;

      if (this._isPrimoPage(window.location.hostname)) {
        // this._placeProactiveChatInPrimo();
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

      var numberMillsecondsBeforePopup = 60000; // 1 minute
      if (!this._isCookieSetNoPopup()) {
        // set a timer for the tab to expand to a window
        this.async(function () {
          if (this._chatOnline) {
            this._showPopupChatBlock = true;
            // this._setPrimoFilterButtonPositioning(125); // set filterButtonDivMarginBottom
            if (this._isPrimoPage(window.location.hostname)) {
              proactivechat = document.querySelector('.proactivechat paper-card');
              if (proactivechat) {
                this._makeRoomForSidebarBottomElements(proactivechat.style.height);
              }
            }
            this._showChatOnlineTab = false;
          }
        }, numberMillsecondsBeforePopup);
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
      // this._setPrimoFilterButtonPositioningForTab();

      if (this._isPrimoPage(window.location.hostname)) {
        this._makeRoomForSidebarBottomElements(this._heightChatMinimisedTab);
      }
    },

    /**
     * On the primo results page, change the width of the proactive chat popup
     * so that it doesnt overlap the results list
     * because there are yucky things happening there with z-index.
     * @private
     */
    // not required as it was only because the icons were showing through it - the z-index of 0 makes it unneeded
    // _placeProactiveChatInPrimo: function() {
    //
    //   this.addClassToBlock('primo', '.chatItem');
    //
    //   var numMilliSecondsRecheck = 10000; // 10 seconds - we have 60 seconds before the popup loads. give them time to type in their query...
    //   var windowWidthTablet = 960; // primo goes to mobile width at 960px
    //
    //   var sidebarLeft, proactivechat, facets;
    //
    //   // wait for sidebar and chat to appear
    //   this.async(function () {
    //     var tt = document.getElementsByTagName('body')[0],
    //         windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth || tt.clientWidth;
    //
    //     proactivechat = document.querySelector('.proactivechat paper-card');
    //     facets = document.querySelector('#facets');
    //     if (facets) {
    //       sidebarLeft = window.getComputedStyle(facets, null).getPropertyValue('left');
    //     }
    //     if (sidebarLeft && proactivechat && windowWidth > windowWidthTablet) {
    //       if (proactivechat.style.width > (windowWidth - sidebarLeft)) {
    //           // if width of chat item is > window width - left pos of #facets
    //           // chat popup is sticking over the result cards cards
    //           // set max width of chat item to (width of page - left of sidebar) ie sit in the sidebar
    //           proactivechat.style.maxWidth = (windowWidth - sidebarLeft) + "px";
    //       }
    //     } else {
    //       this._placeProactiveChatInPrimo();
    //     }
    //   }, numMilliSecondsRecheck);
    // },

    /**
     * static css isnt sufficient for the primo 'apply filters' widget
     * as its 'bottom edge' position must vary depending on whether the tab or the popup shows, or nothing
     * and we cant just set this on load, because the 'filter' popup isnt available to the dom unless
     * (and until) the user checks a checkbox in the sidebar
     * @private
     */
    _watchForPrimoFiltersButton: function() {
      var numMilliSecondsRecheck = 1000;
      this.async(function () {
        var filterButtonDiv = document.querySelector('.multiselect-submit-inner'); // alternate: querySelector('prm-facet > div > div:nth-of-type(2) > div');
        if (filterButtonDiv) {

          var chatLeft = false;
          var chatHeight = false;

          var chatPopup = document.querySelector('.proactivechat paper-card');
          var chatOnlineTab = document.querySelector('.proactivechat .onlineTab');
          var chatOfflineTab = document.querySelector('.proactivechat .offlineTab');
          if (chatPopup) {
            chatLeft = chatPopup.style.left;
            chatHeight = chatPopup.style.height;
          } else if (chatOnlineTab) {
            chatLeft = chatOnlineTab.style.left;
            chatHeight = chatOnlineTab.style.height;
          } else if (chatOfflineTab) {
            chatLeft = chatOfflineTab.style.left;
            chatHeight = chatOfflineTab.style.height;
          }

          if (!!chatLeft) {
            filterButtonDivWidth = window.getComputedStyle(filterButtonDiv, null).getPropertyValue('width');
            filterButtonDivLeft = window.getComputedStyle(filterButtonDiv, null).getPropertyValue('left');

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
     * force a gap at the bottom of the facets sidebar on primo
     * so proactive chat doesnt cover any options
     */
    _makeRoomForSidebarBottomElements: function(sidebarDivMarginBottom) {
      var sidebarDiv = document.querySelector('.sidebar-inner-wrapper');
      if (sidebarDiv) {
          // move the bottom of the sidebar so it doesnt slide under the filter button block
          sidebarDiv.style.marginBottom = sidebarDivMarginBottom + 'px';
      }
    },

    /*
     * the amount of space needed to allow the 'apply filters' button to appear
     * pixels
     */
    // _setPrimoFilterButtonPositioning: function(bottomMargin) {
    //   this.filterButtonDivMarginBottom = bottomMargin;
    // },

    /*
     * the amount of space needed to allow the 'apply filters' button to appear above the tab
     */
    // _setPrimoFilterButtonPositioningForTab: function() {
    //   // put a 45px margin at the bottom
    //   this._setPrimoFilterButtonPositioning(25); // set filterButtonDivMarginBottom
    // },

    /*
     * called when the uses clicks the 'x' button or 'maybe later'
     */
    _closeDialog: function() {
      this._setCookieNoPopup();

      this._showPopupChatBlock = false;
      this._showChatOnlineTab = true;

      if (this._isPrimoPage(window.location.hostname)) {
        this._makeRoomForSidebarBottomElements(this._heightChatMinimisedTab);
      }
      // this._setPrimoFilterButtonPositioningForTab();
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
      // this._setPrimoFilterButtonPositioningForTab();
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
     * check if the nopopup cookie has been set
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
    },

    addClassToBlock: function(className, block) {
        var element = document.querySelector(block);
        if (!!element) {
            chatItem.classList.add(className);
        }
    }
    //
    // removeClassFromBlock: function(className, block) {
    //     var element = document.querySelector(block);
    //     if (!!element) {
    //         var classes = block.className.split(' ');
    //         index = classes.indexOf(className);
    //         if (index > -1) {
    //             classes.splice(index, 1);
    //         }
    //         block.className = classes.join();
    //     }
    // }
  });
})();