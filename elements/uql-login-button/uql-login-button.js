(function () {
  Polymer({
    is: 'uql-login-button',
    properties: {
      user: {
        type: Object,
        value: { }
      },
      verbose: {
        type: Boolean,
        value: false
      },
      isLoggedIn: {
        type: Boolean,
        value: false
      },
      showTitle: {
        type: Boolean,
        value: true
      }
    },

    ready: function() {
      var that = this;

      this.$.accountApi.addEventListener('uqlibrary-api-account-loaded', function(response) {
        if (response.detail.hasSession !== null) {
          that.isLoggedIn = response.detail.hasSession;

          if (response.detail.hasSession) {
            that.user = response.detail;
          }
        } else {
          that.user = {};
          that.isLoggedIn = false;
        }
      });
    },

    performLogin: function() {
      this.$.accountApi.login(window.location.href);
    },

    performLogout: function() {
      this.user = {};
      this.isLoggedIn = false;

      this.$.accountApi.logout();
    }

  });
})();

