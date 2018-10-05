(function () {
  Polymer({
    is: 'uql-callout-button',
    properties: {
      /**
       * Sets the width of the callout window
       */
      calloutWidth: {
        type: Number,
        value: 280
      },
      /**
       * The menu for the callout. See http://github.com/uqlibrary/uqlibrary-callout for more details
       */
      calloutItems: {
        type: Object,
        observer: "_calloutItemsChanged"
      },
      /**
       * Icon to be used in the paper-button
       */
      icon: {
        type: String,
        value: "social:people"
      },
      /**
       * Label to place on the paper-button
       */
      buttonLabel: {
        type: String,
        value: "My button"
      },
      /**
       * Class for the paper button
       */
      buttonClass: {
        type: String,
        value: "button-colored-theme"
      },
			/**
       * A hack. Last timestamp the iron dropdown was closed. Iron dropdown does not prevent default of an event
       * so tapping the menu button will first close the dropdown (clicked outside of dropdown) and then toggle it
       * again.
       */
      _lastCloseTimestamp: {
        type: Number,
        value: 0
      }
    },
    listeners: {
      'iron-overlay-closed': '_overlayClosed',
      'iron-overlay-canceled': '_overlayClosed'
    },
    ready: function () {

    },
    _calloutItemsChanged: function () {
      this.$.callout.menu = this.calloutItems;
    },
    /**
     * Opens the Ask Us callout. Calculates whether to move the whole callout and/or the arrow
     * @private
     */
    _openCallout: function (e) {
      this._alignCallout();

      // Due to how bad iron-dropdown is made, we need to check timestamps here.
      var max = this._lastCloseTimestamp + 200;
      if (this._lastCloseTimestamp !== 0) {
        if (e.timeStamp <= this._lastCloseTimestamp || e.timeStamp < max) {
          return;
        }
      }

      this.$.dropdown.toggle();

      if (this.$.dropdown.opened) {
        this.fire('uqlibrary-callout-button-opened');
      }
    },
    /**
     * Aligns the callout appropriate to the screen
     * @private
     */
    _alignCallout: function () {
      var screenWidth = window.innerWidth || document.getElementsByTagName('body')[0].clientWidth;
      var buttonBounds = this.$.button.getBoundingClientRect();

      if (this._canFitRight(screenWidth, buttonBounds)) {
        // Right align the callout
        this._alignRight(buttonBounds);
      } else if (this._canFitCenter(screenWidth, buttonBounds)) {
        // Center align the callout
        this._alignCenter(buttonBounds);
      } else if (this._canFitLeft(screenWidth, buttonBounds)) {
        this._alignLeft(buttonBounds);
      } else {
        this._alignCenterScreen(buttonBounds, screenWidth);
      }
    },
    /**
     * Aligns the callout to the left of the button
     * @param buttonBounds
     * @private
     */
    _alignLeft: function (buttonBounds) {
      var offset = ((buttonBounds.right - buttonBounds.left) / 2 - 20);
      this.$.dropdown.horizontalOffset = 0 - this.calloutWidth + (buttonBounds.width) - offset;

      this.$.callout.arrowHorizontalAlign = "left";
      this.$.callout.arrow = true;
    },
    /**
     * Aligns the callout on the right of the button
     * @private
     */
    _alignRight: function (buttonBounds) {
      this.$.dropdown.horizontalOffset = ((buttonBounds.right - buttonBounds.left) / 2 - 20);

      this.$.callout.arrowHorizontalAlign = "right";
      this.$.callout.arrow = true;

      // the ask us dropdown overlaps the primo results area badly at larger widths - move it over
      if (this._isPrimoPage(window.location.hostname) && window.innerWidth >= 1300) {
        this.$.dropdown.horizontalOffset = 0 - this.$.button.offsetWidth;
        this.$.callout.arrowHorizontalAlign = "center";
      }
    },
    /**
     * Aligns the callout on the center of the button
     * @param buttonBounds
     * @private
     */
    _alignCenter: function (buttonBounds) {
      this.$.dropdown.horizontalOffset = 0 - (this.calloutWidth - buttonBounds.width) / 2;
      this.$.callout.arrowHorizontalAlign = "center";
      this.$.callout.arrow = true;
    },
    /**
     * Aligns the callout on the center of the screen
     * @param buttonBounds
     * @param screenWidth
     * @private
     */
    _alignCenterScreen: function (buttonBounds, screenWidth) {
      var desiredX = (screenWidth - (screenWidth - this.calloutWidth) / 2);
      if (desiredX < 0) { desiredX = screenWidth; }

      this.$.dropdown.horizontalOffset = (desiredX - buttonBounds.right) * -1;
      this.$.callout.arrow = false;
    },
    /**
     * Checks if the callout can fit when left aligned on the button
     * @param screenWidth
     * @param buttonBounds
     * @returns {boolean}
     * @private
     */
    _canFitLeft: function (screenWidth, buttonBounds) {
      var offset = ((buttonBounds.right - buttonBounds.left) / 2 + 20);
      return (screenWidth - buttonBounds.left >= this.calloutWidth);
    },
    /**
     * Checks if the callout can fit when right aligned on the BUTTON
     * @param screenWidth
     * @param buttonBounds
     * @private
     */
    _canFitRight: function (screenWidth, buttonBounds) {
      var offset = ((buttonBounds.right - buttonBounds.left) / 2 - 20);

      return (buttonBounds.right - offset >= this.calloutWidth);
    },
    /**
     * Checks if the callout will fit when center aligned on the BUTTON
     * @param screenWidth
     * @param buttonBounds
     * @returns {boolean}
     * @private
     */
    _canFitCenter: function (screenWidth, buttonBounds) {
      var pokingOut = (this.calloutWidth - buttonBounds.width) / 2;

      if (buttonBounds.left >= pokingOut && (screenWidth - buttonBounds.right) >= pokingOut) {
        return true;
      } else {
        return false;
      }
    },
		/**
     * Called whenever the iron dropdown closes
     * @param e
     * @private
     */
    _overlayClosed: function (e) {
      this._lastCloseTimestamp = e.timeStamp;
    },

    _isPrimoPage: function(hostname) {
        return (
            this._isPrimoProdPage(hostname) || this._isPrimoSandboxPage(hostname)
        );
    },

    _isPrimoProdPage: function(hostname) {
        return ('search.library.uq.edu.au' === hostname);
    },

    _isPrimoSandboxPage: function(hostname) {
        var regExp = /(.*)exlibrisgroup.com/i;
        return regExp.test(hostname);
    }
  });
})();