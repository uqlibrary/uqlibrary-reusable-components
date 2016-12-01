<!DOCTYPE html>
<html lang="#rn:language_code#">
<rn:meta javascript_module="standard"/>
<head>
  <meta charset="utf-8"/>
  <meta name="viewport" content="width=device-width,initial-scale=1" />
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
        <rn:widget path="chat/ConditionalChatLink" chat_login_page="/app/chat/chat_launch_lib" instance_id="ss_widget" p="45" label_unavailable_busy_template="All our operators are busy - please wait"
                   label_unavailable_hours="Chat is currently closed."
        />
      </li>

      <?php /* ?>
<li>
<script type="text/javascript" src="https://uqcurrent--tst1.widget.custhelp.com/euf/rightnow/RightNow.Client.js"></script>
<script type="text/javascript">
RightNow.Client.Controller.addComponent(
                                        {
                                        chat_login_page: "/app/chat/chat_launch_lib",
                                        container_element_id: "myChatLinkContainer",
                                        info_element_id: "myChatLinkInfo",
                                        label_default: "Live Chat",
                                        label_available_immediately_template: "Live Chat",
                                        label_unavailable_busy_template: "All our operators are busy.",
                                        label_unavailable_hours: "Chat is currently closed.",
                                        link_element_id: "myChatLink",
                                        p: "45",
                                        instance_id: "sccl_2",
                                        module: "ConditionalChatLink",
                                        type: 7
                                        },
                                        "https://uqcurrent--tst1.widget.custhelp.com/ci/ws/get"
                                        );
</script>
<div id="myChatLinkContainer">
<div id="myChatLink">
<div id="myChatLinkInfo">
</div>
</div>
</div>
</li>
<?php */ ?>


      <li class="hasIcon">
        <span><a aria-hidden="true"><iron-icon icon="search"></iron-icon></a></span>
        <rn:widget path="navigation/NavigationTab" label_tab="Search Library FAQs" link="/app/library/lib_answers" pages="uqola_support, library/answers/list, library/answers/detail, library/answers/intent, ask_confirm, library/lts_contact"/>
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

        <div>----- CRM opening hours widget</div>

        <rn:widget path="chat/ChatHours" label_chat_hours="Chat opening hours" />

        <div>----- libcal opening hours widget</div>

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
            var theWeeks = new $.LibCalWeeklyGrid( $("#libcal-hours-block"), { iid: LibCalUQID, lid: LibCalIdChatServicePoint,  weeks: 1 });

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
