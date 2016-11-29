<!DOCTYPE html>
<html lang="#rn:language_code#">
<rn:meta javascript_module="standard"/>
<head>
  <meta charset="utf-8"/>
  <title>UQ Library FAQ Answers</title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <!--[if lt IE 9]><script src="/euf/core/static/html5.js"></script><![endif]-->
  <rn:widget path="search/BrowserSearchPlugin" pages="home, answers/list, answers/detail" />
  <!--
  <rn:theme path="/euf/assets/themes/uqola" css="
  {YUI}/widget-stack/assets/skins/sam/widget-stack.css,
  {YUI}/widget-modality/assets/skins/sam/widget-modality.css,
  {YUI}/overlay/assets/overlay-core.css,
  {YUI}/panel/assets/skins/sam/panel.css" />
  -->
  <rn:theme path="/euf/assets/themes/uqola" css="
{YUI}/widget-stack/assets/skins/sam/widget-stack.css" />
  <rn:head_content/>
  <link href="/euf/assets/themes/uqola/uq-crm-styles.css" type="text/css" rel="stylesheet">

  <!--
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
  -->
  <link rel="icon" href="images/favicon.png" type="image/png"/>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>

  <!-- ?= $this->render('views.library.partials-polymer') ? -->
  <link type="image/x-icon" rel="shortcut icon" href="//assets.library.uq.edu.au/master/reusable-components/resources/favicon.ico">
  <script src="//assets.library.uq.edu.au/reusable-components/resources/preloader.js" async></script>
  <script src="//assets.library.uq.edu.au/reusable-components/webcomponentsjs/webcomponents-lite.js" async></script>
  <link rel="import" href="//assets.library.uq.edu.au/reusable-components/elements.vulcanized.html" async>
  <script src="//assets.library.uq.edu.au/reusable-components/libapps/load.js" async></script>
  <link rel="stylesheet" href="//assets.library.uq.edu.au/reusable-components/libapps/libanswers/custom-styles.css" />

  <style type="text/css">
    body.library {
      background-color: #fff;
      color: inherit;
      font-family: "Roboto","Helvetica Neue",Helvetica,Arial,sans-serif;
    }
    #rn_PageTitle,
    #rn_PageContent,
    #uq_AskQuestionContent {
      background-color: #fff;
      color: inherit;
      border-radius: 2px;
      border-width: 1px;
      border-style: solid;
      margin: 10px 0px 20px 0px;
      border-color: #ccc;
      box-shadow: 0 2px 2px 0 rgba(0,0,0,.14),0 1px 5px 0 rgba(0,0,0,.12),0 3px 1px -2px rgba(0,0,0,.2);
    }
    #rn_PageContent {
      padding-top: 16px;
    }
    #rn_Body .rn_AnswerList {
      width: 69%;
    }
    #rn_Body #rn_SearchControls {
      padding-top: 16px;
    }
    .rn_AskQuestion {
      padding-top: 1px;
      padding-left: 70%;
    }
    #uq_AskQuestionContent h2 {
      font-size: 16px;
      margin: 0;
      line-height: normal;
      color: #333;
      background-color: inherit;
      padding: 16px;
      border-bottom: 1px solid #ccc;
    }
    #uq_AskQuestionContent ul {
      padding: 16px;
    }
    .rn_AskQuestion ul,
    .rn_AskQuestion ul li {
      list-style: none;
      padding: 0 0 16px 0;
      margin : 0;
    }
    #uq_AskQuestionContent .rn_NavigationTab a {
      padding: 0;
      font-weight: normal;
    }
    .rn_AskQuestion ul li.hasIcon > span:first-child {
      padding-right: 7px;
    }
    .rn_Hours,
    .rn_HoursPrefix {
      font-size: 0.9rem;
    }
    ul .rn_ChatHours .rn_HoursBlock {
      margin-top: 0;
    }
    div.rn_CurrentTime {
      display: none;
    }

    /* style the chat online/offline link */
    .rn_ConditionalChatLink div a {
      display: inline-block;
      padding: 6px 12px;
      margin-bottom: 0;
      text-align: center;
      white-space: nowrap;
      vertical-align: middle;
      cursor: pointer;
      background-image: none;
      border: 1px solid transparent;
      border-radius: 4px;
      background-color: #007E9E;
      color: #FFFFFF;
    }
    .rn_ConditionalChatLink div span {
      font-weight: bold;
      display: block;
      color: red;
      background-color: inherit;
    }

    /* login/out link */
    #rn_LoginStatus {
      float: right;
      margin-left: 20px;
      padding-top: 20px;
    }
    .crmpersonaldetails {
      float: right;
      padding-top: 40px;
    }

    ol.breadcrumb {
      padding: 8px 15px;
      margin-bottom: 20px;
      margin-left: 0;
      list-style: none;
      display: block;
    }
    ol.breadcrumb > li {
      display: inline-block;
    }
    .breadcrumb > li + li:before {
      padding: 0 5px;
      color: #ccc;
      content: "/\00a0";
    }
    .breadcrumb-home iron-icon {
      height: 24px;
      margin-top: -3px;
    }

    div.breadcrumbs,
    #rn_Container,
    .lib_pagetop {
      background-color: #f2f2f2;
      color: inherit;
    }
    .lib_pagetop {
    }
    div.breadcrumbs {
      padding-bottom: 16px;
      padding-bottom: 1rem;
      margin-bottom: 24px;
      margin-bottom: 1.5rem;

    }
    .breadcrumb-trail a {
      color: #676767;
    }
  </style>


</head>

<body class="yui-skin-sam yui3-skin-sam library">
<div id="rn_Container" >
  <div id="rn_SkipNav"><a href="#rn_MainContent">#rn:msg:SKIP_NAVIGATION_CMD#</a></div>

  <!-- PAGE TITLE -->
  <div class="row">
    <div class="small-12 large-12 columns">

      <!-- LOGGED IN USER DETAILS -->
      <noscript><h2>#rn:msg:SCRIPTING_ENABLED_SITE_MSG#</h2></noscript>
      <div id="rn_LoginStatus">
        <rn:condition logged_in="true">
          <div class="LoggedInName">
            #rn:msg:WELCOME_BACK_LBL#,
            <strong>
              <rn:field name="contacts.full_name"/>
            </strong>
            <div style="display: inline;">
              <rn:field name="contacts.organization_name"/>
            </div>
          </div>
          <rn:widget path="login/LogoutLink2" />
          <rn:condition_else/>
          <rn:condition is_spider="false">
            <rn:widget path="login/LogoutLink2" />
          </rn:condition>
        </rn:condition>
      </div>
      <!-- LOGGED IN USER DETAILS -->
    </div>
  </div>
</div>

<!-- there should be a chunk more right here, but havent yet found a way to set the page title by a variable -->

<rn:page_content/>

<!-- LIBRARY SIDEBAR -->

<div class="rn_AskQuestion">
  <div id="uq_AskQuestionContent">
    <h2>AskUs contacts </h2>
    <ul>
      <li>
        <rn:widget path="chat/ConditionalChatLink" open_in_new_window="true" chat_login_page_height="500" chat_login_page_width="500" />
      </li>
      <li class="hasIcon">
        <span><a aria-hidden="true"><iron-icon icon="search"></iron-icon></a></span>
        <rn:widget path="navigation/NavigationTab" label_tab="Search Library FAQs" link="/app/library/answers" pages="uqola_support, library/answers/list, library/answers/detail, library/answers/intent, ask_confirm, library/lts_contact"/>
      </li>
      <li class="hasIcon">
        <span><a aria-hidden="true" href="tel:61733464312"><iron-icon icon="communication:call"></iron-icon></a></span>
        <a href="tel:61733464312">+ 61 7 334 64312</a>
      </li>
      <li class="hasIcon">
        <span><a aria-hidden="true" href="/app/library/contact"><iron-icon icon="communication:import-contacts"></iron-icon></a></span>
        <a href="/app/library/contact">Contact form</a>
      </li>
      <li class="hasIcon">
        <span><a aria-hidden="true" href="mailto:askus@library.uq.edu.au"><iron-icon icon="communication:email"></iron-icon></a></span>
        <a href="mailto:askus@library.uq.edu.au">askus@library.uq.edu.au</a>
      </li>
      <li>
        <a href="http://www.library.uq.edu.au/contact-us">More ways to contact us</a>
      </li>
      <li>
        <rn:widget path="chat/ChatHours"/>
      </li>
    </ul>
  </div>
  <!-- LIBRARY SIDEBAR -->




</div>
</div>
</div>
<!-- CONTENT -->


</div>
</body>
</html>
