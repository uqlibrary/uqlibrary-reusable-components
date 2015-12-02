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
      this.isIAEnabled = document.cookie.indexOf("toggleia=1") >= 0;
    },

    _IAEnabledChanged: function(newValue, oldValue) {
      this.buttonTitle = newValue ? "Disable IA" : "Enable IA";
    },

    toggleIA: function() {
      if (this.isIAEnabled){
        document.cookie = "toggleia=0; path=/";
      } else {
        document.cookie = "toggleia=1";
      }

      window.location.reload(true);
    }

  });
})();

