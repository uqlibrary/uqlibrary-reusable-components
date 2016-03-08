(function () {
  Polymer({
    is: 'uql-askus-button',
    properties: {

    },
    attached: function () {
      this.$.callout.calloutItems = {
        "items": [
          {
            "label": "FAQ",
            "icon": "communication:import-contacts",
            "link": "http://answers.library.uq.edu.au/"
          },
          {
            "label": "In Person",
            "icon": "social:people",
            "link": "https://www.library.uq.edu.au/locations-hours/service-points"
          },
          {
            "label": "Chat",
            "icon": "communication:chat",
            "link": "https://v2.libanswers.com/chati.php?iid=1193&hash=fdbdf3c1190c1b6147b92d38c20194a8&online=true&referer=https%3A%2F%2Fwww.library.uq.edu.au%2F",
            "disabled": "chat-offline",
            "target": "chatWindow",
            "targetOptions": "width=400, height=400"
          },
          {
            "label": "Phone",
            "icon": "communication:call",
            "link": "https://www.library.uq.edu.au/contact-us",
            "linkMobile": "tel: +61733464312",
            "disabled": "chat-offline"
          },
          {
            "label": "Email",
            "icon": "communication:email",
            "link": "mailto:askus@library.uq.edu.au"
          },
          {
            "label": "Form",
            "icon": "hardware:desktop-mac",
            "link": "http://answers.library.uq.edu.au/ask"
          }
        ],
        "summary": {
          "label": "More ways to contact us",
          "link": "https://www.library.uq.edu.au/contact-us"
        }
      };
    }
  });
})();