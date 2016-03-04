(function () {
  Polymer({
    is: 'uql-apps-button',
    properties: {
      /**
       * Holds the account for the Applications API check
       */
      account: {
        type: Object,
        value: {
          hasSession: false
        }
      },
      /**
       * Base URL for the My Library Applications
       */
      _applicationUrl: {
        type: String,
        value: ""
      }
    },
    attached: function () {
      var self = this;

      // Event listener for Account
      this.$.apiAccount.addEventListener('uqlibrary-api-account-loaded', function (e) {
        if (e.detail.hasSession) {
          self.account = e.detail;
          self.$.apiApplications.get();
        }
      });
      this.$.apiAccount.get();

      // Event listener for Applications
      this.$.apiApplications.addEventListener('uqlibrary-api-applications-loaded', function (e) {
        self._generateCalloutMenu(e.detail);
      });

      this.$.apiApplications.get();
    },
    /**
     * Parses the API response from uqlibrary-api-applications into an object uqlibrary-callout reads
     * @param data
     * @private
     */
    _generateCalloutMenu: function (data) {
      var menu = {
        items: [],
        summary: {
          label: "Logout",
          link: "https://www.library.uq.edu.au/logout"
        }
      };

      // Generate menu items
      data.forEach(function (item) {
        if (item.isDivider || item.link === '/home' || item.link === "https://www.library.uq.edu.au/") { return; }

        menu.items.push({
          label: item.title,
          link: 'https://app.library.uq.edu.au/v1' + item.link,
          icon: item.icon
        });
      });

      this.$.callout.calloutItems = menu;
    }
  });
})();