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
</head>
<body class="yui-skin-sam" style="background-color:#F5F5F5; overflow: hidden;">


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

  div#rn_ChatLaunchFormDiv {
    background-image: none;
  }

</style>
<div id="rn_PageContent" class="rn_Live">
  <div class="rn_Padding" >
    <div id="rn_PageTitle" style="background-color:#49075E;padding-left:20px;" class="rn_livehelp">
      <h1 style="color: #ffffff;font-weight:normal; font-size: 2.083em;">#rn:msg:LIVE_HELP_HDG#</h1>
    </div>
    <rn:condition chat_available="true">
      <div id="rn_ChatLaunchFormDiv" class="rn_ChatForm">
        <div style="padding:15px 0 0 0; color:#313131; font-size: 1.222em;">
          <span class="rn_ChatLaunchFormHeader">Welcome, </span><span class="rn_ChatLaunchFormHeader" style="font-weight:normal;">#rn:msg:CHAT_MEMBER_OUR_SUPPORT_TEAM_LBL#</span>
        </div>
        <hr style="margin: 25px 0px; border-width: 1px 0 0 0; border-style: solid; border-color: #E9E9E9;" />
        <form id="rn_ChatLaunchForm" method="post" action="/app/chat/chat_landing">
          <!--Added by TM to stop people bypassing chat login-->
          <input type="hidden" name="chat_valid" value="1" />
          <!--end-->
          <div style="display:none">
            <rn:widget path="input/ProductCategoryInput" data_type="product" default_value="45" required="true">
          </div>
          <div id="rn_ErrorLocation"></div>
          <div>
            <rn:widget path="input/TextInput"  name="Contact.Name.First" label_input="FIRST NAME" required="true"/>
          </div>

          <div>
            <rn:widget path="input/TextInput"  name="Contact.Emails.PRIMARY.Address" label_input="EMAIL ADDRESS" required="true" />
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
      </div>
    </rn:condition>
    <!--<rn:widget path="chat/ChatStatus"/> -->
    <!--<rn:widget path="chat/ChatHours"/> -->
    <br/> <br/>
  </div>
</div>
</body>

