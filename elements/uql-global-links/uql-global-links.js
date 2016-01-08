(function () {
  Polymer({
    is: 'uql-global-links',
    properties: {
      /**
       * character to be displayed between links
       * @type String
       */
      separator: {
        type: String,
        value: ''
      },

      /**
       * array containing links as objects
       * {url:string, title:string}.
       *
       * @type {{elements: Array<HTMLElement>, level: object}}
       */
      links: {
        type: Array,
         value: function() {
           var links = [
             { url: "http://www.uq.edu.au/", title: "UQ Home" },
             { url: "http://www.uq.edu.au/contacts/", title: "Contacts" },
             { url: "http://www.uq.edu.au/study/", title: "Study" },
             { url: "http://www.uq.edu.au/maps/", title: "Maps" },
             { url: "http://www.uq.edu.au/news/", title: "News" },
             { url: "http://www.uq.edu.au/events/", title: "Events" },
             { url: "http://jobs.uq.edu.au/", title: "Jobs" },
             { url: "http://my.uq.edu.au/", title: "my.UQ" }
           ];
           return links;
         }
      }
    },

    getAccessKey: function(i) {
      return (i+1);
    },

    displaySeparator: function(i) {
      return (this.separator!=='' && (this.links.length-1)>i);
    },

    ready: function() {

    }


  });
})();

