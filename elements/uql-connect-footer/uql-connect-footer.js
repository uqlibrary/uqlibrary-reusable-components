(function() {
  Polymer({
    is: 'uql-connect-footer',
    properties: {

      mainDomain: {
        type: String,
        value: ""
      },

      autoLoad: {
        type: Boolean,
        value: false
      },

      footerMenuUrl: {
        type: String
      },

      verbose: {
        type: Boolean,
        value: true
      },

      menu: {
        type: Object,
        value: function() {
          var menuJsonFileData = null;
          var menuJson = menuJsonFileData;
          if (menuJson !== null) {
            return menuJson;
          }
          else {
            this.autoLoad = true;
            return null;
          }
        }
      }
    },

    ready: function() {
      var that = this;

      setTimeout(function() {
        //reveal elements with easing in effect
        var content = that.querySelectorAll(".loading");

        for(var i=0; i< content.length; i++){
          var element = content[i];
          element.removeAttribute('unresolved');
        }
      }, 0);
    },

    _handleError: function (event) {
      console.log(event);
    },

    _handleResponse: function (event) {
      this.menu = event.detail.response;
    }
  });
})();
