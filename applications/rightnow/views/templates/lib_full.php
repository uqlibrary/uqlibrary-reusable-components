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
  <script src="//assets.library.uq.edu.au/rightnow/reusable-components/rightnow/load.js" async></script>
  <link rel="stylesheet" href="//assets.library.uq.edu.au/rightnow/reusable-components/rightnow/custom-styles.css" />

  <style type="text/css">
    body.library #rn_Container {
      background-color: #fff;
      color: #000;
    }

    body.library #rn_Container .columns {
      height: 0;
    }

    .libcal-hours-block caption,
    .libcal-hours-block tbody tr.s-lc-whw-loc td {
      position: absolute;
      top: -9999px;
      left: -9999px
    }

    .libcal-hours-block tbody td,
    .libcal-hours-block thead th {
      text-align: center
    }

    .libcal-hours-block tbody td.s-lc-whw-locname,
    .libcal-hours-block tbody td.s-lc-whw-sublocname,
    .libcal-hours-block tr.s-lc-whw-footnote td {
      text-align: left
    }

    .libcal-hours-block td.s-lc-whw-today,
    .libcal-hours-block th.s-lc-whw-today-h,
    .libcal-hours-block thead tr th {
      background-color: #F5F5F5;
      border-color: #e5e5e5
    }

    .libcal-hours-block tr.s-lc-whw-loc {
      background-color: #fcfcfc
    }

    .libcal-hours-block tbody tr.s-lc-whw-loc td.s-lc-whw-locname {
      font-weight: 500
    }

    .libcal-hours-block .s-lc-whw-bh {
      min-width: 21rem
    }

    /* use mobile view for rightnow column insert */
    .libcal-hours-block table {
      width: 90%
    }
    .libcal-hours-block table,
    .libcal-hours-block tbody,
    .libcal-hours-block td,
    .libcal-hours-block th,
    .libcal-hours-block thead,
    .libcal-hours-block tr {
      display: block
    }
    .libcal-hours-block thead tr {
      position: absolute;
      top: -9999px;
      left: -9999px;
      border-width: 0
    }
    .libcal-hours-block tbody tr.s-lc-whw-loc td.s-lc-whw-locname {
      display: block;
      padding-left: 0;
      margin: 0 auto;
      text-align: center;
      font-weight: 700
    }
    .libcal-hours-block tbody td.s-lc-whw-sublocname {
      padding-left: 1rem;
      font-weight: 700
    }
    .libcal-hours-block tbody tr {
      border: 1px solid #ccc
    }
    .libcal-hours-block td {
      border: none;
      border-bottom: 1px solid #eee;
      position: relative;
      padding-left: 50%
    }
    .libcal-hours-block td:before {
      position: absolute;
      top: 6px;
      left: 6px;
      width: 45%;
      padding-right: 10px;
      white-space: nowrap
    }

    .libcal-hours-block td {
      height: 32px;
      height: 2rem;
    }

    /* hide service point name */
    .libcal-hours-block td:nth-of-type(1) {
      display: none;
    }

    .libcal-hours-block td:nth-of-type(2):before {
      content: "Monday"
    }
    .libcal-hours-block td:nth-of-type(3):before {
      content: "Tuesday"
    }
    .libcal-hours-block td:nth-of-type(4):before {
      content: "Wednesday"
    }
    .libcal-hours-block td:nth-of-type(5):before {
      content: "Thursday"
    }
    .libcal-hours-block td:nth-of-type(6):before {
      content: "Friday"
    }
    .libcal-hours-block td:nth-of-type(7):before {
      content: "Saturday"
    }
    .libcal-hours-block td:nth-of-type(8):before {
      content: "Sunday"
    }
    .libcal-hours-block td.s-lc-whw-today:before {
      content: "Today";
      font-weight: 700
    }
    .libcal-hours-block tr.s-lc-whw-footnote td {
      text-align: left;
      padding-left: 1rem
    }

    h3 {
      font-size: 16px;
      font-size: 1rem;
    }
    .libcal-hours-block h3 {
      text-align: center;
    }

    /* get the mega menu layout right */
    .paper-tab-0:not(.iron-selected) > .tab-content.paper-tab {
      border-width: 0;
      box-shadow: 0 0 #fff;
    }
    .lib_pagetop.small-12.large-12.columns {
      margin-top: 3px;
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
        <rn:widget path="chat/ConditionalChatLink"/>
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
        <!--
        <rn:widget path="chat/ChatHours"/>
        -->
        <p style="font-size: 10px; font-style: italic">dummy library - update with id for chat</p>
        <script src="//api3.libcal.com/js/hours_grid.js?002"></script>
        <div class="libcal-hours-block">
          <h3>Chat opening hours</h3>
          <div id="libcal-hours-block"></div>
        </div>
        <script>
          $(function(){
            const LibCalUQID = 3633;
            const LibCalIdChatServicePoint = 3823;
            var week3823 = new $.LibCalWeeklyGrid( $("#libcal-hours-block"), { iid: LibCalUQID, lid: LibCalIdChatServicePoint,  weeks: 1 });

          });
        </script>

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
