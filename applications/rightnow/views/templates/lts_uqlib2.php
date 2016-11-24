<!DOCTYPE html>
<html lang="#rn:language_code#">
<rn:meta javascript_module="standard"/>
<head>
  <meta charset="utf-8"/>
  <title><rn:page_title/></title>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
  <!--[if lt IE 9]><script src="/euf/core/static/html5.js"></script><![endif]-->
  <rn:widget path="search/BrowserSearchPlugin" pages="home, answers/list, answers/detail" />
  <rn:theme path="/euf/assets/themes/uqola" css="
        {YUI}/widget-stack/assets/skins/sam/widget-stack.css,
        {YUI}/widget-modality/assets/skins/sam/widget-modality.css,
        {YUI}/overlay/assets/overlay-core.css,
        {YUI}/panel/assets/skins/sam/panel.css" />
  <rn:head_content/>

  <link href="/euf/assets/themes/uqola/uq-crm-styles.css" type="text/css" rel="stylesheet">
  <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css" rel="stylesheet">
  <link rel="icon" href="images/favicon.png" type="image/png"/>
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
</head>

<body class="yui-skin-sam yui3-skin-sam">
<div id="rn_Container" >
  <div id="rn_SkipNav"><a href="#rn_MainContent">#rn:msg:SKIP_NAVIGATION_CMD#</a></div>

  <!-- UQ Header -->
  <a href="#main-content" class="show-on-focus">Skip to main content</a>

  <div class="site-header">
    <div class="site-header__content">
      <div class="columns large-8">
        <a href="http://www.uq.edu.au/" class="uq-logo">The University of Queensland</a>
        <h2 class="site-title"><a class="site-title__link" rel="home" title="Online Application" href="#rn:msg:CUSTOM_MSG_OLA_URL#">UQ Library</a></h2>
      </div>
      <!-- temporarily commenting out login block as it is not needed SA 2/7/2015 4:40 PM -->
      <!--<div id="rn_LoginStatus">
            <rn:condition logged_in="true">
                 #rn:msg:WELCOME_BACK_LBL#
                <strong>
                    <rn:field name="Contact.LookupName"/><rn:condition language_in="ja-JP">#rn:msg:NAME_SUFFIX_LBL#</rn:condition>
                </strong>
                <div>
                    <rn:field name="Contact.Organization.LookupName"/>
                </div>
                <rn:widget path="login/LogoutLink"/>
            <rn:condition_else />
            <rn:condition config_check="PTA_ENABLED == true">
                    <a href="javascript:void(0);" id="rn_LoginLink">#rn:msg:LOG_IN_LBL#</a>&nbsp;|&nbsp;<a href="javascript:void(0);">#rn:msg:SIGN_UP_LBL#</a>
                <rn:condition_else>
                    <a href="javascript:void(0);" id="rn_LoginLink">#rn:msg:LOG_IN_LBL#</a>&nbsp;|&nbsp;<a href="/app/utils/create_account#rn:session#">#rn:msg:SIGN_UP_LBL#</a>
                    <rn:condition hide_on_pages="utils/create_account, utils/login_form, utils/account_assistance">
                        <rn:widget path="login/LoginDialog" trigger_element="rn_LoginLink"/>
                    </rn:condition>
                    <rn:condition show_on_pages="utils/create_account, utils/login_form, utils/account_assistance">
                        <rn:widget path="login/LoginDialog" trigger_element="rn_LoginLink" redirect_url="/app/account/overview"/>
                    </rn:condition>
                </rn:condition>
            </rn:condition>
      </div> -->
    </div>
  </div>
  <!-- UQ Header -->
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
      <div class="crmpersonaldetails"><rn:widget path="output/FieldDisplay" name="contacts.last_name" label=""/>,<rn:widget path="output/FieldDisplay" name="contacts.first_name" label=""/><rn:widget path="output/FieldDisplay" name="Contact.Emails.PRIMARY.Address" label=""/></div>
      <!-- LOGGED IN USER DETAILS -->

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
        <li ><a href="/">UQ Library FAQs</a></li></ol>

      <rn:condition hide_on_pages="utils/help_search">
        <div id="rn_NavigationBar" role="navigation">
          <!--            <ul class="globaltabs"> -->
          <!--<li><rn:widget path="navigation/NavigationTab" label_tab="#rn:msg:SUPPORT_HOME_TAB_HDG#" link="/app/#rn:config:CP_HOME_URL#" pages="home, "/></li>-->
          <!--
                          <li class="globaltabs-title"><rn:widget path="navigation/NavigationTab" label_tab="#rn:msg:ANSWERS_HDG#" link="/app/uqola_support" pages="uqola_support, answers/list, answers/detail, answers/intent, ask_confirm"/></li>
           -->
          <rn:condition config_check="COMMUNITY_ENABLED == true">
            <li class="globaltabs-title"><rn:widget path="navigation/NavigationTab" label_tab="#rn:msg:COMMUNITY_LBL#" link="#rn:config:COMMUNITY_HOME_URL:RNW##rn:community_token:?#" external="true"/></li>
          </rn:condition>
          <!-- commented out navigation tabs as they are not needed SA 29/06/2015 12:05 PM -->
          <!--<li class="globaltabs-title"><rn:widget path="navigation/NavigationTab" label_tab="#rn:msg:ASK_QUESTION_HDG#" link="/app/ask" pages="ask, ask_confirm"/></li>-->
          <!--<li class="globaltabs-title"><rn:widget path="navigation/NavigationTab" label_tab="#rn:msg:YOUR_ACCOUNT_LBL#" link="/app/account/overview" pages="utils/account_assistance, account/overview, account/profile, account/notif, account/change_password, account/questions/list, account/questions/detail, account/notif/list, utils/login_form, utils/create_account, utils/submit/password_changed, utils/submit/profile_updated"
          subpages="#rn:msg:ACCOUNT_OVERVIEW_LBL# > /app/account/overview, #rn:msg:SUPPORT_HISTORY_LBL# > /app/account/questions/list, #rn:msg:ACCOUNT_SETTINGS_LBL# > /app/account/profile, #rn:msg:NOTIFICATIONS_LBL# > /app/account/notif/list"/></li>-->
          <!-- commented out account overview navigation tab SA 13/10/2015 3:05 PM -->
          <!--<li class="globaltabs-title"><rn:widget path="navigation/NavigationTab" label_tab="#rn:msg:YOUR_ACCOUNT_LBL#" link="/app/account/overview" pages="account/overview"/></li>-->
          <!--
                  <li class="globaltabs-title"><rn:widget path="navigation/NavigationTab" label_tab="#rn:msg:SUPPORT_HISTORY_LBL#" link="/app/account/questions/list" pages="account/questions/list, account/questions/detail"/></li>
           -->
          <!-- commented out "Back to Appliction" tab as it isn't needed SA 19/08/2015 2:45 PM -->
          <!-- <li class="globaltabs-title globaltabs-orphan">
                  <span id="rn_NavigationTab_2" class="rn_NavigationTab">
                    <a class="" href="#rn:msg:CUSTOM_MSG_OLA_URL#" target="_self"><span>Back to Application</span></a>
                  </span>
                </li> -->
          <!--            </ul> -->
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

  <!-- Main Footer -->

  <!--
  <div id="footer">
              <ul>
                  <li><a target="_blank" href="http://apply.uq.edu.au/terms">OA Terms of Use</a></li>
                  <li><a target="_blank" href="http://apply.uq.edu.au/terms/privacy">OA Privacy Notice</a></li>
              </ul>
  </div>
   -->

  <!-- Main Footer -->

  <!-- Footer -->
  <div id="rn_Footer" role="contentinfo">
    <p>&copy; UQ Library</p>
  </div>
  <!-- Footer -->


</div>
</body>
</html>
