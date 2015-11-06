(function () {
  Polymer({
    is: 'uql-login-button',
    properties: {
      loginUrl: {
        type: String,
        value: "https://www.library.uq.edu.au/uqlais/login?return="
      },
      accountUrl: {
        type: String,
        value: 'https://app.library.uq.edu.au/api/account?'
      },
      logoutUrl: {
        type: String,
        value: "https://www.library.uq.edu.au/logout"
      },
      isLoggedIn: {
        type: Boolean,
        value: false
      },
      verbose: {
        type: Boolean,
        value: false
      }
    },

    ready: function() {
      if (this.hasSession() && document.cookie.indexOf("UQLMockData") === -1) {
        var now = new Date().getTime();
        this.$.getAccountApi.url = this.accountUrl + now;

        this.$.getAccountApi.headers = {
          "X-Uql-Token": this.getCookie("UQLID")
        };

        this.$.getAccountApiJsonp.url = this.$.getAccountApi.url;
        this.$.getAccountApiJsonp.headers = this.$.getAccountApi.headers;

        this.$.getAccountApi.generateRequest();
        this.$.getAccountApiJsonp.generateRequest();
      }
    },

    accountResponse: function(response) {
      console.log('response: ');
      console.log(response);
    },

    accountResponseError: function(response) {
      console.log('error: ');
      console.log(response);
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
      return document.cookie.indexOf("UQLID") >= 0;
    },

    /**
     * Gets a cookie by name
     * @param name the name of the cookie to return
     * @returns {String}
     */
    getCookie: function (name) {
      var parts = document.cookie.split(";");
      for (var i = 0, l = parts.length; i < l; i++) {
        var cookieParts = parts[i].trim().split('=');
        if (cookieParts[0] === name) {
          return cookieParts[1];
        }
      }
    }
  });
})();

