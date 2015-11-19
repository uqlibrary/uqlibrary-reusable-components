(function () {
  Polymer({
    is: 'uql-chat-button',
    properties: {

      chatStatusUrl: {
        type: String,
        value: "https://api2.libanswers.com/1.0/chat/widgets/status/1193"
      },

      isChatOnline: {
        type: Boolean,
        value: false
      },

      showTitle : {
        type: String,
        value: true
      },

      buttonTitle: {
        type: String,
        value: "Ask Us"
      },

      chatOnlineText: {
        type: String,
        value: "Chat with us now!"
      },

      chatOfflineText: {
        type: String,
        value: "Click here for help."
      },

      offlineUrl: {
        type: String,
        value: "http://answers.library.uq.edu.au"
      },

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

    handleChatStatusResponse: function(response) {
      this.isChatOnline = response.detail.data.online;
      this.setupChatTooltip();
    },

    handleChatStatusError: function(response) {
      this.isChatOnline = false;
      this.setupChatTooltip();
    },

    setupChatTooltip: function() {
      var tooltip = document.getElementById('chatStatusTooltip');

      if (this.isChatOnline && document.cookie.indexOf("UQL-Show-Chat=1") <= -1) {
        //set cookie for this session not to show tooltip on load
        document.cookie = 'UQL-Show-Chat=1';

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

    openChat: function() {
      if (!this.isChatOnline && this.offlineUrl !== '') {
        window.location.href = this.offlineUrl;
      } else {
        var url = this.buildChatUrl(this.isChatOnline);

        window.open(url,
          'libchat',
          'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + this.chatOptions.width + ', ' +
          'height=' + this.chatOptions.height);
      }
    },

    buildChatUrl: function(isOnline) {
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

