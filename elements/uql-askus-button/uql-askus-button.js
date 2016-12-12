(function () {
  Polymer({
    is: 'uql-askus-button',
    properties: {

    },
    listeners: {
      'uqlibrary-callout-link-clicked': '_linkClicked',
      'uqlibrary-callout-button-opened': '_calloutOpened',
      'uqlibrary-callout-summary-clicked': '_linkClicked'
    },
    attached: function () {
      this.$.callout.calloutItems = {
        "items": [
        {
          "label": "FAQ",
          "icon": "communication:import-contacts",
          "link": "https://uqcurrent.custhelp.com/app/library/faqs"
        },
        {
          "label": "Chat",
          "icon": "communication:chat",
          "link": "https://uqcurrent.custhelp.com/app/chat/chat_launch_lib",
          "disabled": "chat-offline",
          "target": "chatWindow",
          "targetOptions": "width=400, height=460"
        },
        {
          "label": "Email",
          "icon": "communication:email",
          "link": "mailto:askus@library.uq.edu.au"
        },
        {
          "label": "Phone",
          "icon": "communication:call",
          "link": "https://www.library.uq.edu.au/contact-us",
          "linkMobile": "tel: +61733464312",
          "disabled": "chat-offline"
        },
        {
          "label": "Contact form",
          "icon": "device:dvr",
          "link": "https://uqcurrent.custhelp.com/app/library/contact"
        },
        {
          "label": "Come see us",
          "icon": "social:people",
          "link": "https://web.library.uq.edu.au/locations-hours/service-points"
        }
      ],
        "summary": {
        "label": "More ways to contact us",
          "link": "https://web.library.uq.edu.au/contact-us"
      }
      };

    },
		/**
     * Called when a link is clicked in the uqlibrary-callout
     * @param e
     * @private
     */
    _linkClicked: function (e) {
      this.$.ga.addEvent('Click', e.detail);
    },
		/**
     * Called when the callout is opened
     * @param e
     * @private
     */
    _calloutOpened: function (e) {
      this.$.ga.addEvent('Navigation', 'Opened');
    }
  });
})();