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

</head>

<body class="yui-skin-sam yui3-skin-sam">
<div id="rn_Container" >
  <div id="rn_SkipNav"><a href="#rn_MainContent">#rn:msg:SKIP_NAVIGATION_CMD#</a></div>

  <!-- commented out SA 19/08/2015 2:45 PM -->
  <!-- OLA Navigation -->
  <!-- <div class="dashboard-header-title col-xs-12 col-sm-12 col-md-9">
    <h1 class="h3 col-xs-12">
        <a title="Dashboard" id="link_to_dashboard" class="js-autosave" href="#rn:msg:CUSTOM_MSG_OLA_URL#">
        <i class="fa fa-th"></i> <span class="link-to-dashboard dashboard-text">Home</span>
        </a>
  </h1>
  </div> -->
  <!-- OLA Navigation -->

  <!-- PAGE TITLE -->
  <div class="row">
    <div class="small-12 large-12 columns">
      <!--
          <h1 class="crmmaintitle">Support</h1>
       -->
      <!-- LOGGED IN USER DETAILS -->
      <rn:condition logged_in="true">
        <div id="rn_LoginStatus">
          <div class="crmpersonaldetails"><rn:widget path="output/FieldDisplay" name="contacts.last_name" label=""/>,<rn:widget path="output/FieldDisplay" name="contacts.first_name" label=""/>
            <!--
            <rn:widget path="output/FieldDisplay" name="Contact.Emails.PRIMARY.Address" label=""/>
             -->
          </div>
          <!-- LOGGED IN USER DETAILS -->
        </div>
      </rn:condition>
    </div>
  </div>
  <!-- PAGE TITLE -->

  <!-- NAVIGATION -->




  <div class="row">
    <div id="rn_Navigation" class="small-12 large-12 columns">
      <style type="text/css">
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
      </style>
      <ol class="breadcrumb s-la-color-bars s-la-color-bars-border">
        <li><a href="http://www.library.uq.edu.au/">UQ Library</a></li>
        <li><a href="/">UQ Library FAQs</a></li>
      </ol>

      <rn:condition hide_on_pages="utils/help_search">
        <div id="rn_NavigationBar" role="navigation">
          <ul class="globaltabs">
            <li class="globaltabs-title"><rn:widget path="navigation/NavigationTab" label_tab="Search library answers" link="/app/library/answers/lib-answers" pages="uqola_support, library/answers/list, library/answers/detail, library/answers/intent, ask_confirm, library/lts_contact"/></li>
            <li class="globaltabs-title"><rn:widget path="navigation/NavigationTab" label_tab="Ask a question" link="/app/library/lts_contact" pages="ask, ask_confirm"/></li>
            <li class="globaltabs-title"><rn:widget path="navigation/NavigationTab" label_tab="Chat" link="/app/chat/chat_launch_lib" pages="ask, ask_confirm"/></li>

            <rn:condition logged_in="true">
              <li class="globaltabs-title"><rn:widget path="navigation/NavigationTab" label_tab="#rn:msg:SUPPORT_HISTORY_LBL#" link="/app/account/questions/list" pages="account/questions/list, account/questions/detail"/></li>
              <rn:condition_else />
              <li class="globaltabs-title globaltabs-orphan"><rn:widget path="navigation/NavigationTab" label_tab="Login" link="/app/account/questions/list" pages="account/questions/list, account/questions/detail"/></li>
            </rn:condition>

          </ul>
        </div>
      </rn:condition>
    </div>
  </div>
  <!-- NAVIGATION -->

  <!-- CONTENT -->
  <div class="row">
    <div id="rn_Body" class="small-12 large-12 columns">
      <div id="rn_MainColumn" role="main">
        <a id="rn_MainContent"></a>
        <rn:page_content/>
      </div>
    </div>
  </div>
  <!-- CONTENT -->


</div>
</body>
</html>
