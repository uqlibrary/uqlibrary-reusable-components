<rn:meta title="#rn:msg:ASK_QUESTION_HDG#" template="lib_full.php" login_required="false" clickstream="incident_create"/>

<div class="row">
  <div class="lib_pagetop small-12 large-12 columns">
    <!-- PAGE TITLE -->
    <div class="panel-pane__content">
      <h1 class="page__title">Frequently asked questions</h1>
    </div>
  </div>

  <!-- BREADCRUMBS -->
  <div id="rn_Navigation" class="small-12 large-12 columns breadcrumbs">
    <ol class="breadcrumb breadcrumb-trail">
      <li class="breadcrumb breadcrumb-0 breadcrumb-home"><a href="https://www.library.uq.edu.au/" title="Home"><span class="show-for-sr">Home</span> <iron-icon aria-hidden="true" icon="home"></iron-icon></a></li>
      <li class="breadcrumb breadcrumb-1"><a href="/app/library/faqs">Contact us</a></li>
    </ol>

  </div>
</div>

<!-- CONTENT -->
<div class="row">
  <div id="rn_Body" class="small-12 large-12 columns">
    <div id="rn_MainColumn" role="main">
      <a id="rn_MainContent"></a>
      <rn:widget path="knowledgebase/RssIcon"/>
      <rn:container report_id="107075">
        <div id="rn_PageTitle" class="rn_AnswerList">
          <div id="rn_SearchControls">
            <h1 class="rn_ScreenReaderOnly">#rn:msg:SEARCH_CMD#</h1>
            <form onsubmit="return false;">
              <div class="rn_SearchInput">
                <!-- commented out SA 29/06/2015 -->
                <!--<rn:widget path="search/AdvancedSearchDialog"/>-->
                <rn:widget path="search/KeywordText" label_text="#rn:msg:FIND_THE_ANSWER_TO_YOUR_QUESTION_CMD#" initial_focus="true" />
              </div>
              <rn:widget path="search/SearchButton" />
            </form>
            <rn:widget path="search/DisplaySearchFilters" />
          </div>
        </div>

        <div id="rn_PageContent" class="rn_AnswerList">
          <div class="rn_Padding">
            <h2 class="rn_ScreenReaderOnly">#rn:msg:SEARCH_RESULTS_CMD#</h2>
            <rn:widget path="reports/ResultInfo" report_id="107075" add_params_to_url="p,c"/>
            <!--
            related links
            <rn:widget path="knowledgebase/TopicWords"/>
             -->
            <rn:widget path="reports/Multiline" highlight="false" perpage="10"/>
            <rn:widget path="reports/Paginator" />
          </div>
        </div>
      </rn:container>
