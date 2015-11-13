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
        value: "Chat is offline."
      },

      chatOptions : {
        type: Object,
        value : {
          height: '350px',
          width: '350px',
          offlineUrl: '',
          baseDomain: "v2.libanswers.com",
          iid: "1193",
          hash: "fdbdf3c1190c1b6147b92d38c20194a8"
        }
      }
    },

    handleChatStatusResponse: function(response) {
      var that = this;
      this.isChatOnline = response.detail.data.online;

      if (this.isChatOnline) {
        this.$.chatStatusTooltip.for='chatOnlineButton';
        this.$.chatStatusTooltip.text = this.chatOnlineText;

        setTimeout(this.openChatTooltip, 1000);
      }
    },

    handleChatStatusError: function(response) {
      this.isChatOnline = false;
    },

    openChatTooltip: function() {
      var tooltip = document.getElementById('chatStatusTooltip');
      tooltip.updatePosition();
      tooltip.show();
    },

    openChat: function() {
      if (!this.isChatOnline && this.chatOptions.offlineUrl !== '') {
        window.location.href = this.chatOptions.offlineUrl;
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

