(function () {
  Polymer({
    is: 'uql-chat-button',
    properties: {
      chatStatusUrl: {
        type: String,
        value: "https://api2.libanswers.com/1.0/chat/widgets/status/1193"
      },
      chatStatus: {
        type: Object,
        value: {
          online: false
        }
      },
      chatOptions: {
        type: Object,
        value: {
          "domain": "answers.library.uq.edu.au",
          "id": "1114",
          "iid": "1193",
          "hash": "fdbdf3c1190c1b6147b92d38c20194a8",
          "name": "Summon & Drupal widget",
          "ts": "2014-12-24T02:16:00.087Z",
          "uid": 6666,
          "ref": "",
          "key": "77d0569d531d167",
          "chat_title": "Ask us - online now",
          "byeMsg": "Thanks for chatting!",
          "dept_label": "Select Department:",
          "name_label": "Name (leave blank for anonymous chat)",
          "name_default": "",
          "guest_label": "Guest",
          "width": "350px",
          "height": "350px",
          "is_personal": false,
          "chat_button": "Start chat",
          "done_button": "Chat again",
          "press_enter": "Press ENTER to send",
          "submit_button": "Send",
          "email_trans": "Email chat transcript",
          "offline_text": "Ask us - offline",
          "slidebutton_url": "",
          "slidebutton_text": "Ask us - online now",
          "slidebutton_position": "b",
          "slidebutton_bcolor": "#007E9E",
          "slidebutton_color": "#FFFFFF",
          "slidebutton_width": "",
          "slidebutton_height": "",
          "la_hide": false,
          "la_hide_msg": "<p>Chat is currently offline.<\/p><p> <a href=\"http:\/\/answers.library.uq.edu.au\">Try browsing our FAQs<\/a>, or <a href=\"http:\/\/answers.library.uq.edu.au\/ask\">submit a question<\/a> and get an answer within 48 hours.<\/p>",
          "la_hide_msg2": "",
          "la_search_opt": {
            "group_id": "0",
            "label": "Search our FAQs",
            "button": "Search",
            "placeholder": "Search our FAQs"
          },
          "la_search_box": "<div id=\"s-la-content-search-1114\" class=\"s-la-content-search s-la-content\"><form method=\"get\" name=\"s-la-searchform\" id=\"s-la-searchform-1114\" action=\"\" onsubmit=\"return false;\" target=\"_parent\" role=\"search\" aria-labelledby=\"s-la-content-search-query-1114\"><div class=\"form-group\"><label for=\"s-la-content-search-query-1114\" class=\"s-la-searchform-label sr-only control-label\">Search our FAQs<\/label><input type=text id=s-la-content-search-query-0 class=\"s-la-content-search-query form-control\" name=\"q\" placeholder=\"Search our FAQs\" value=\"\" autocomplete=off \/><\/div><div class=\"form-group\"><button class=\"btn btn-sm btn-default s-la-searchform-button\" type=\"submit\" style=\"background-color: #007E9E; border-color: #007E9E; color: #FFFFFF;\">Search<\/button><\/div><\/form><\/div>",
          "sound_on": "Sound is On (click to toggle)",
          "sound_off": "Sound is Off (click to toggle)",
          "star_text": "Please rate this chat:",
          "rate_1": "Bad",
          "rate_2": "Okay",
          "rate_3": "Good",
          "rate_4": "Great",
          "trans": "Enter an email address to send this chat transcript to:",
          "error_sess": "Error starting session.",
          "error_send": "Error sending this message.",
          "error_tran": "Error sending transcript.",
          "left": " has left the chat",
          "typing": " is typing...",
          "joined": " has joined the chat",
          "initial_question": true,
          "initial_question_label": "How can we help?",
          "comments_label": "Any comments?",
          "comments_button_text": "Submit feedback",
          "enable_anon": true,
          "enable_comments": true,
          "enable_sound": false,
          "star_ratings": true,
          "file_uploads": true,
          "file_title": "Upload a file",
          "file_intro": "Note: Maximum file size is 5MB. File is removed after one month, it is not kept permanently.",
          "file_label": "Attach a file",
          "file_action": "Upload",
          "cancel_button": "Cancel",
          "css": "",
          "custom_css": "div, button {\nfont-family: \"Roboto\", sans serif, Helvetica, Arial !important;\n}\na {\ncolor: #007e9e !important;\n}\na:hover {\ncolor: #006880 !important;\n}\na i {\n  text-decoration: none;\n  color: #333 !important;\n}\nh2 {\ncolor: #333 !important;\n}\n.s-la-widget .btn-sm {\n  transition: background-color 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  border-radius: 2px !important;\n  background-color: #007e9e !important;\n  border-color: transparent !important;\n  color: #fff !important;\n}\n.s-la-widget .btn-sm:hover {\n  transition: background-color 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  background-color: #006880 !important;\n}\n.s-la-widget .btn-sm:active, .btn-sm:focus, {\n  transition: background-color 280ms cubic-bezier(0.4, 0, 0.2, 1);\n  background-color: #00576b !important;\n}\n.lcs_chat_button span {\n  margin: 4px;\n  border-width: 0px 0px 0px;\n}",
          "color_backg": "#FFFFFF",
          "color_head": "#007E9E",
          "color_btn": "#FFFFFF",
          "color_border": "",
          "user1": {
            "tag": 1,
            "name": "Are you from UQ or a visitor?",
            "id": 0,
            "show": 1,
            "required": 0,
            "type": "l",
            "val": "UQ student, UQ staff, Hospital staff, Alumni, Visitor"
          },
          "user2": {"tag": 2, "name": "click to edit", "id": 0, "show": 0, "required": 0, "type": "t", "val": ""},
          "user3": {"tag": 3, "name": "click to edit", "id": 0, "show": 0, "required": 0, "type": "t", "val": ""},
          "error_off": "Sorry it doesn't appear any librarians are online... Please try again later.",
          "wait": "Hi! We'll be with you in a moment...",
          "depart_id": [{"u": 0, "d": [809]}],
          "depart_dedicated": true,
          "depart_default_id": "0",
          "widget_type": 1,
          "autoload_time": 60,
          "autoload_head": "Do you need help?",
          "autoload_text": "A librarian is online ready to help.",
          "autoload_yes": "Chat Now",
          "autoload_no": "No Thanks",
          "missedchat_time": "60",
          "missedchat_message": "We apologise for the delay. Don't want to wait?",
          "missedchat_link": "Submit your question and get an answer by email",
          "missedchat_queue": "643",
          "fbwidget": false,
          "user4": {"tag": 4, "name": "click to edit", "id": 0, "show": 0, "required": 0, "type": "t", "val": ""},
          "user5": {"tag": 5, "name": "click to edit", "id": 0, "show": 0, "required": 0, "type": "t", "val": ""},
          "isBuilding": true,
          "autopop": false,
          "peel": "",
          "offline_url": "",
          "slidebutton_url_off": "",
          "slidebutton_text_off": "Offline - search FAQs",
          "base_domain": "v2.libanswers.com",
          "onlinerules": [{"u": 0, "d": [809]}]
        }
      }
    },

    openChat: function() {
      var url = this.buildChatUrl(this.chatStatus.online);

      window.open(url,
        'libchat',
        'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + this.chatOptions.width + ', ' +
        'height=' + this.chatOptions.height);


    },

    openOfflineHelp: function() {
      if (!this.chatStatus.online && this.chatOptions.offline_url !== '') {
        window.location.href = this.chatOptions.offline_url;
      } else {
        var url = this.buildChatUrl(this.chatStatus.online);

        window.open(url,
          'libchat',
          'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=yes, copyhistory=no, width=' + this.chatOptions.width + ', ' +
          'height=' + this.chatOptions.height);
      }
    },

    buildChatUrl: function(isOnline) {
      var qs = window.location.protocol + '//' + this.chatOptions.base_domain + '/chati.php?';
      qs += "iid=" + this.chatOptions.iid + "&hash=" + this.chatOptions.hash;

      if (typeof this.chatOptions['template'] !== 'undefined') {
        qs += "&template=" + encodeURIComponent(this.chatOptions['template']);
      }

      if (typeof this.chatOptions['template_css'] !== 'undefined') {
        qs += "&template_css=" + encodeURIComponent(this.chatOptions['template_css']);
      }

      qs += "&online=" + isOnline;

      try {
        if (typeof this.chatOptions.width === 'string' && this.chatOptions.width.indexOf("%") == -1)
          this.chatOptions.width = parseInt(this.chatOptions.width, 10);
      } catch (e) {
      }

      try {
        if (typeof this.chatOptions.height === 'string' && this.chatOptions.height.indexOf("%") == -1)
          this.chatOptions.height = parseInt(this.chatOptions.height, 10);
      } catch (e) {
      }

      if (isOnline)
        qs += '&referer=' + encodeURIComponent(window.location.href); //referer for IE

      return qs;
    }

  });
})();

