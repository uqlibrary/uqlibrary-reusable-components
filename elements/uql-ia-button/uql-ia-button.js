(function () {
  Polymer({
    is: 'uql-ia-button',
    properties: {
      showTitle: {
        type: Boolean,
        value: true
      },
      isIAEnabled: {
        type: Boolean,
        value: false,
        observer: '_IAEnabledChanged'
      },
      buttonTitle: {
        type: String,
        value: "Enable IA"
      }
    },

    ready: function() {
      this.isIAEnabled = (document.cookie.indexOf("iabutton") >= 0);
    },

    _IAEnabledChanged: function(newValue, oldValue) {
      this.buttonTitle = newValue ? "Old Site" : "New Site";
    },

    toggleIA: function() {
      if (this.isIAEnabled){
        document.cookie = "toggleia=1";
      } else {
        document.cookie = "toggleia=0; path=/";
      }

      window.location.reload(true);
    }

  });
})();

