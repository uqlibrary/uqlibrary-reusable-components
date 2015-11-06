(function () {
  Polymer({
    is: 'uql-login-button',
    properties: {
      loginUrl: {
        type: String,
        value: "https://www.library.uq.edu.au/uqlais/login?return="
      },
      logoutUrl: {
        type: String,
        value: "https://www.library.uq.edu.au/logout"
      },
      isLoggedIn: {
        type: Boolean,
        value: false
      }
    },

    performLogin: function() {
      if (document.cookie.indexOf("UQLMockData") >= 0) {
        this.isLoggedIn = true;
      } else {
        var url = window.location.href;
        document.location.href = this.loginUrl + window.btoa(url);
      }
    },

    performLogout: function() {
      this.isLoggedIn = false;

      if (document.cookie.indexOf("UQLMockData") === -1) {
        document.location.href = this.logoutUrl;
      }

    },

    hasSession: function()  {
      this.isLoggedIn = document.cookie.indexOf("UQLID") >= 0;
    }

  });
})();

