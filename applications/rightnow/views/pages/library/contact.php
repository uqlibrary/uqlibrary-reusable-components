<rn:meta title="#rn:msg:ASK_QUESTION_HDG#" template="lib_full.php" login_required="false" clickstream="incident_create"/>

<div class="row">
  <div class="lib_pagetop small-12 large-12 columns">
    <!-- PAGE TITLE -->
    <div class="panel-pane__content">
      <h1 class="page__title">Contact form</h1>
    </div>
  </div>

  <!-- BREADCRUMBS -->
  <div id="rn_Navigation" class="small-12 large-12 columns breadcrumbs">
    <ol class="breadcrumb breadcrumb-trail">
      <li class="breadcrumb breadcrumb-0 breadcrumb-home"><a href="https://www.library.uq.edu.au/" title="Home"><span class="show-for-sr">Home</span> <iron-icon aria-hidden="true" icon="home"></iron-icon></a></li>
      <li class="breadcrumb breadcrumb-1"><a href="/app/library/answers">Library FAQs</a></li>
    </ol>

  </div>
</div>

</div> <!-- /lib_pagetop -->

<!-- CONTENT -->
<div class="row">
  <div id="rn_Body" class="small-12 large-12 columns">
    <div id="rn_MainColumn" role="main">
      <a id="rn_MainContent"></a>
      <rn:widget path="knowledgebase/RssIcon"/>
      <div class="s-la-public-header-description">The AskUs team will respond to your enquiry within one business day.</div>
      <!-- remove after dev phase -->
      <p>(Note: this submits to the actual Rightnow interface, so prefix any trials with 'test')</p>
      <!-- /remove after dev phase -->
    </div>
    <div id="rn_PageContent" class="rn_AnswerList">
      <div class="rn_Padding">
        <form id="rn_QuestionSubmit" method="post" action="/ci/ajaxRequest/sendForm">
          <div id="rn_ErrorLocation"></div>
          <div style="display:none">
            <rn:widget path="input/ProductCategoryInput" data_type="product" default_value="45" required="true">
          </div>

          <h2>Your question</h2>
          <rn:widget path="input/FormInput" name="Incident.Subject" required="true" label_input="Question" initial_focus="true" />
          <rn:widget path="input/FormInput" name="Incident.Threads" required="true" label_input="More detail/ explanation"/>
          <rn:widget path="input/FileAttachmentUpload"/>



          <rn:condition logged_in="false">
            <h2>Your details</h2>
            <rn:widget path="input/FormInput" name="Contact.Emails.PRIMARY.Address" required="true" label_input="#rn:msg:EMAIL_ADDR_LBL#"/>
            <rn:widget path="input/FormInput" name="Contact.first_name" required="false" label_input="First name"/>
            <rn:widget path="input/FormInput" name="Contact.last_name" required="false" initial_focus="false" label_input="Last name"/>
          </rn:condition>


          <rn:widget path="input/FormSubmit" label_button="#rn:msg:CONTINUE_ELLIPSIS_CMD#" on_success_url="/app/ask_confirm" error_location="rn_ErrorLocation"/>
          <rn:condition answers_viewed="2" searches_done="1">
            <rn:condition_else/>
            <rn:widget path="input/SmartAssistantDialog"/>
          </rn:condition>

        </form>
      </div>
    </div>
