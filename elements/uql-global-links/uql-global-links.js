(function () {
  Polymer({
    is: 'uql-global-links',
    properties: {
      /**
       * string/character to be used / displayed between links
       * (only in use if the link object has the settings showSeparator=true)
       *
       * @type {{elements: Array<HTMLElement>, level: o}}
       */
      separator: {
        type: String,
        value: ''
      },

      /**
       * array containing links as objects.
       * [
       *   { url: "http://www.uq.edu.au/", title: "UQ Home", accessKey: 1, showSeparator: true },
       *   { url: "http://www.uq.edu.au/contacts/", title: "Contacts", accessKey: 2, showSeparator: true },
       *   { url: "http://www.uq.edu.au/study/", title: "Study", accessKey: 3, showSeparator: true },
       *   { url: "http://www.uq.edu.au/maps/", title: "Maps", accessKey: 4, showSeparator: true },
       *   { url: "http://www.uq.edu.au/news/", title: "News", accessKey: 5, showSeparator: true },
       *   { url: "http://www.uq.edu.au/events/", title: "Events", accessKey: 6, showSeparator: true },
       *   { url: "http://jobs.uq.edu.au/", title: "Jobs", accessKey: 7, showSeparator: true },
       *   { url: "http://my.uq.edu.au/", title: "my.UQ", accessKey: 9, showSeparator: false }
       * ];
       *
       * @type {{elements: Array<HTMLElement>, level: object}}
       */
      links: {
        type: Array,
         value: function() {
           var links = [
             { url: "http://www.uq.edu.au/", title: "UQ Home", accessKey: 1, showSeparator: true },
             { url: "http://www.uq.edu.au/contacts/", title: "Contacts", accessKey: 2, showSeparator: true },
             { url: "http://www.uq.edu.au/study/", title: "Study", accessKey: 3, showSeparator: true },
             { url: "http://www.uq.edu.au/maps/", title: "Maps", accessKey: 4, showSeparator: true },
             { url: "http://www.uq.edu.au/news/", title: "News", accessKey: 5, showSeparator: true },
             { url: "http://www.uq.edu.au/events/", title: "Events", accessKey: 6, showSeparator: true },
             { url: "http://jobs.uq.edu.au/", title: "Jobs", accessKey: 7, showSeparator: true },
             { url: "http://my.uq.edu.au/", title: "my.UQ", accessKey: 9, showSeparator: false }
           ];
           return links;
         }
      }
    },

    ready: function() {

    }


  });
})();

