(function () {
  Polymer({
    is: 'uql-chat-button',
    properties: {

      /** LibChat status API URL */
      chatStatusUrl: {
        type: String,
        value: "https://api2.libanswers.com/1.0/chat/widgets/status/1193"
      },

      /** Timestamp for API call to prevent caching */
      timestamp: {
        type: Object,
        value: function() {
          var now = new Date();
          return { 'timestamp' : now.getTime() };
        }
      },

      /** Indicates whether chat is online or not */
      isChatOnline: {
        type: Boolean,
        value: false
      },

      /** Whether to display title of the button */
      showTitle : {
        type: Boolean,
        value: true
      },

      /** Button title text */
      buttonTitle: {
        type: String,
        value: "Chat"
      },

      /** Button title text when chat is offline */
      buttonTitleOffline: {
        type: String,
        value: "Ask"
      },

      /** Tooltip text when chat is online */
      chatOnlineText: {
        type: String,
        value: "Chat with us now!"
      },

      /** Tooltip text when chat is offline */
      chatOfflineText: {
        type: String,
        value: "Click here for help."
      },

      /** Redirect URL when chat is offline */
      offlineUrl: {
        type: String,
        value: "http://answers.library.uq.edu.au"
      },

      /** Chat window configuration properties
       * @type {{height: String, width: String, baseDomain: String, iid: number, hash: String}} */
      chatOptions : {
        type: Object,
        value : {
          height: '350px',
          width: '350px',
          baseDomain: "v2.libanswers.com",
          iid: "1193",
          hash: "fdbdf3c1190c1b6147b92d38c20194a8"
        }
      }
    },

    /**  Processes successful chat status api response
     * @param {Object} API call response
     * */
    _handleChatStatusResponse: function(response) {
      this.isChatOnline = response.detail.data.online;
      this._setupChatTooltip();
    },

    /**  Processes error chat status api response
     * @param {Object} API call response
     * */
    _handleChatStatusError: function(response) {
      this.isChatOnline = false;
      this._setupChatTooltip();
    },

    /**  Shows chat status tooltip, creates a cookie not to show tooltip for next 24 hrs */
    _setupChatTooltip: function() {
      var tooltip = document.getElementById('chatStatusTooltip');

      if (this.isChatOnline && document.cookie.indexOf("UQL-Show-Chat=1") <= -1) {
        //set cookie for 24 hrs not to show tooltip on load
        var date = new Date();
        date.setTime(date.getTime()+(24*60*60*1000));
        document.cookie = 'UQL-Show-Chat=1;expires=' + date.toGMTString() + ';domain=.library.uq.edu.au;path=/';

        //show tooltip after 1 second after page load
        setTimeout(function() {
            tooltip.show();
        }, 1000);

        //hide tooltip after 3 seconds after tooltip opens
        setTimeout(function() {
          tooltip.hide();
        }, 4000);

      }
    },

    /** Opens chat in a new window */
    openChat: function() {
      if (!this.isChatOnline && this.offlineUrl !== '') {
        window.location.href = this.offlineUrl;
      } else {
        var url = this._buildChatUrl(this.isChatOnline);

        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
          window.open(url);
        } else {
          window.open(url,
            'libchat',
            'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + this.chatOptions.width + ', ' +
            'height=' + this.chatOptions.height);
        }
      }
    },

    /**
     * Builds chat url based on chat status
     *
     * @param {Boolean} Chat status online/offline
     * @return {String} Constructed chat URL */
    _buildChatUrl: function(isOnline) {
      var qs = window.location.protocol + '//' + this.chatOptions.baseDomain + '/chati.php?';
      qs += "iid=" + this.chatOptions.iid + "&hash=" + this.chatOptions.hash;
      qs += "&online=" + isOnline;

      try {
        if (typeof this.chatOptions.width === 'string' && this.chatOptions.width.indexOf("%") == -1)
          this.chatOptions.width = parseInt(this.chatOptions.width, 10);
      } catch (e) {
      }

      try {
        if (typeof this.chatOptions.height === 'string' && this.chatOptions.height.indexOf("%") == -1)
          this.chatOptions.height = parseInt(this.chatOptions.height, 10);
      } catch (e) {
      }

      if (isOnline)
        qs += '&referer=' + encodeURIComponent(window.location.href); //referer for IE

      return qs;
    }

  });
})();

