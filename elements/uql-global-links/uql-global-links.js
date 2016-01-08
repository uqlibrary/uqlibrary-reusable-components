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
       * array containing links as objects, ie: {url:string, title:string}
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

    /**
     * returns an access key based on the current item index
     * @param {Number} Item index
     * @return {Number}
     */
    getAccessKey: function(i) {
      return (i+1);
    },

    /**
     * handles if the separator string had been set and if it should be displayed at the current item index position
     * @param {Number} Item index
     * @return Boolean
     */
    displaySeparator: function(i) {
      return (this.separator!=='' && (this.links.length-1)>i);
    },

    ready: function() {

    }


  });
})();

