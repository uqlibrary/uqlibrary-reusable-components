<rn:meta title="#rn:msg:LIVE_CHAT_LBL#"  clickstream="chat_request"/>
<html xmlns="http://www.w3.org/1999/xhtml" lang="#rn:language_code#" xml:lang="#rn:language_code#" >
<head>
  <meta http-equiv="content-type" content="text/html; charset=utf-8" />
  <meta http-equiv="Content-Style-Type" content="text/css" />
  <meta http-equiv="Content-Script-Type" content="text/javascript" />
  <meta http-equiv="X-UA-Compatible" content="chrome=1" />
  <title>#rn:msg:LIVE_ASSISTANCE_LBL#</title>
  <rn:theme path="/euf/assets/themes/standard" css="site.css,/rnt/rnw/yui_2.7/container/assets/skins/sam/container.css" />
  <rn:head_content/>
  <link href="/euf/assets/themes/standard/upgrades.css" rel="stylesheet" type="text/css" />
  <style type="text/css">
    .rn_GridTextInput.rn_TextInput {
      width: 37.5%;
      margin-top:10px;
      margin-bottom:10px;
    }
    .rn_Padding {
      padding:0;
      height:580px;
    }

    #rn_PageContent {
      margin:0;
      overflow: visible;
    }

    #rn_ChatLaunchFormDiv {
      padding:15px;
    }
    .rn_ChatLaunchFormHeader {
      font-size: 1.222em
    }
    input[type="text"], input[type="email"]{
      height: 48px;
      width: 418px !important;
      margin-bottom:25px;
      font-size:1.222em;
    }
    label {
      font-weight: bold;
      font-size:16px;
      margin-bottom: 11px;
      color: #313131;
    }
    .rn_TextInput .rn_Label {
      display: block;
      margin-bottom: 11px;
    }

    input[type="submit"], button {
      width:418px;
      background-color: #3A7DDA;
      background-image: none;
      height: 48px;
      -moz-border-radius: 0;
      -webkit-border-radius: 0;
      -moz-box-shadow: 0px 0px 0px rgba(0,0,0,0);
      -webkit-box-shadow: 0px 0px 0px;
      border: solid 1px #3A7DDA;
      font-size: 1.222em;
      text-shadow: none;

    }

    body.lib_chatlaunch {
      background-image: none;
      background-color:#F5F5F5;
      overflow: hidden;
    }
    div#rn_ChatLaunchFormDiv {
      background-image: none;
    }

    div#rn_PageTitle {
      background-color:#49075E;
      padding-left:20px;
    }

    div#rn_PageTitle h1 {
      color: #fff;
      font-weight:normal;
      font-size: 2.083em;
    }
    div.lib_chatlaunch_header {
      padding:15px 0 0 0;
      color:#313131;
      font-size: 1.222em;
    }
    div.lib_chatlaunch_header .rn_ChatLaunchFormHeader.welcometext {
      font-weight:normal;
    }
    hr {
      margin: 25px 0px;
      border-width: 1px 0 0 0;
      border-style: solid;
      border-color: #E9E9E9;
    }
    .productcategoryinput {
      display:none
    }
    .subline {
      display: block;
      font-weight: normal;
      margin: 4px 0;
    }
    .rn_Required {
      display: none;
    }
    p, li {
      font-size: 16px;
      font-size: 1rem;
    }

    .libcal-hours-block.chatunavailable {
      max-width: 400px;
      max-width: 25rem;
    }
    .chatunavailable h2 {
      text-align: center;
    }
    .moreways {
      padding-top: 16px;
      padding-top: 1rem;
    }

  </style>
</head>
<body class="lib_chatlaunch" class="yui-skin-sam" onload="resizeTo(400,460);">
<div id="rn_PageContent" class="rn_Live">
  <div class="rn_Padding" >
    <div id="rn_PageTitle" class="rn_livehelp">
      <h1>#rn:msg:LIVE_HELP_HDG#</h1>
    </div>
    <div id="rn_ChatLaunchFormDiv" class="rn_ChatForm">
      <rn:condition chat_available="true">
        <p>All fields are required.</span></p>
        <!--
                    <div class="lib_chatlaunch_header">
                        <span class="rn_ChatLaunchFormHeader">Welcome, </span><span class="rn_ChatLaunchFormHeader welcometext">#rn:msg:CHAT_MEMBER_OUR_SUPPORT_TEAM_LBL#</span>
                    </div>
                    <hr />
         -->
        <form id="rn_ChatLaunchForm" method="post" action="/app/chat/chat_landing">
          <!--Added by TM to stop people bypassing chat login-->
          <input type="hidden" name="chat_valid" value="1" />
          <!--end-->
          <div class="productcategoryinput">
            <rn:widget path="input/ProductCategoryInput" data_type="product" default_value="45" required="true">
          </div>
          <div id="rn_ErrorLocation"></div>
          <div>
            <rn:widget path="input/TextInput"  name="Contact.Name.First" label_input="FIRST NAME" required="true"/>
          </div>

          <div>
            <rn:widget path="input/TextInput"  name="Contact.Emails.PRIMARY.Address" label_input="EMAIL ADDRESS<span class='subline'>(Use your UQ email if you have one)</span>" required="true" />
          </div>

          <rn:widget path="input/TextInput"  name="Incident.Subject" label_input="QUESTION" required="true"/>

          <rn:condition config_check="MOD_VA_ENABLED == 0">
            <rn:widget path="chat/ChatLaunchButton"
                       launch_height="620"
                       launch_width="450"
                       label_button="Chat - online now"
                       open_in_new_window="false"
                       error_location="rn_ErrorLocation"
                       add_params_to_url="q_id,pac,request_source,p,c,survey_send_id,survey_send_delay,survey_comp_id,survey_term_id,chat_data,survey_term_auth,survey_comp_auth,survey_send_auth,i_id"/>
            <rn:condition_else/>
            <rn:widget path="chat/ChatLaunchButton"
                       launch_height="620"
                       launch_width="450"
                       label_button="Chat - online now"
                       error_location="rn_ErrorLocation"
                       add_params_to_url="q_id,pac,request_source,p,c,survey_send_id,survey_send_delay,survey_comp_id,survey_term_id,chat_data,survey_term_auth,survey_comp_auth,survey_send_auth,i_id"/>
          </rn:condition>
          <br /><br />
        </form>
        <rn:condition_else/>


        <p>Sorry, AskUs Chat is currently unavailable.</p>
        <p>You can <a href="/app/library/faqs">check our FAQs</a> or <a href="/app/library/contact">ask a question</a> anytime using our contact form.</p>
        <link rel="stylesheet" href="//assets.library.uq.edu.au/rightnow/reusable-components/rightnow/custom-styles.css" />
        <script src="//code.jquery.com/jquery-1.12.2.min.js"></script>
        <script src="//api3.libcal.com/js/hours_grid.js?002"></script>
        <div class="libcal-hours-block chatunavailable">
          <h2>Our chat hours</h2>
          <div id="libcal-hours-block"></div>
        </div>
        <script>
          $(function(){
            const LibCalUQID = 3633;
            const LibCalIdChatServicePoint = 4986;
            var theWeeks = new $.LibCalWeeklyGrid( $("#libcal-hours-block"), { iid: LibCalUQID, lid: LibCalIdChatServicePoint,  weeks: 1 });

          });
        </script>
        <p class="moreways"><a href="http://www.library.uq.edu.au/contact-us">More ways to contact us</a>.</p>


      </rn:condition>
    </div>
    <!--<rn:widget path="chat/ChatStatus"/> -->
    <!--<rn:widget path="chat/ChatHours"/> -->
    <br/> <br/>
  </div>
</div>
</body>

