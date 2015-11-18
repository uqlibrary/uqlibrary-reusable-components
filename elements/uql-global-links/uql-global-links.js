(function () {
  Polymer({
    is: 'uql-global-links',
    properties: {
      links: {
        type: Array,
         value: function() {
           var links = [
             { url: "http://www.uq.edu.au/contacts/", title: "Contacts", accessKey: 2 },
             { url: "http://www.uq.edu.au/study/", title: "Study", accessKey: 3 },
             { url: "http://www.uq.edu.au/maps/", title: "Maps", accessKey: 4 },
             { url: "http://www.uq.edu.au/news/", title: "News", accessKey: 5 },
             { url: "http://www.uq.edu.au/events/", title: "Events", accessKey: 6 },
             { url: "http://jobs.uq.edu.au/", title: "Jobs", accessKey: 7 },
             { url: "http://library.uq.edu.au/", title: "Library", accessKey: 8 },
             { url: "http://my.uq.edu.au/", title: "my.UQ", accessKey: 9 }
           ];
           return links;
         }
      }
    },

    ready: function() {

    }


  });
})();

