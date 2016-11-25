<rn:meta title="#rn:msg:ASK_QUESTION_HDG#" template="lib_full.php" login_required="false" clickstream="incident_create"/>

<rn:widget path="knowledgebase/RssIcon"/>
<rn:container report_id="105305">
  <div id="rn_PageTitle" class="rn_AnswerList">
    <div id="rn_SearchControls">
      <h1 class="rn_ScreenReaderOnly">#rn:msg:SEARCH_CMD#</h1>
      <form onsubmit="return false;">
        <div class="rn_SearchInput">
          <!-- commented out SA 29/06/2015 -->
          <!--<rn:widget path="search/AdvancedSearchDialog"/>-->
          <rn:widget path="search/KeywordText" label_text="#rn:msg:FIND_THE_ANSWER_TO_YOUR_QUESTION_CMD#" initial_focus="true"/>
        </div>
        <rn:widget path="search/SearchButton"/>
      </form>
      <rn:widget path="search/DisplaySearchFilters"/>
    </div>
  </div>
  <div id="rn_PageContent" class="rn_AnswerList">
    <div class="rn_Padding">
      <h2 class="rn_ScreenReaderOnly">#rn:msg:SEARCH_RESULTS_CMD#</h2>
      <rn:widget path="reports/ResultInfo"/>
      <rn:widget path="knowledgebase/TopicWords"/>
      <rn:widget path="reports/Multiline"/>
      <rn:widget path="reports/Paginator"/>
    </div>
  </div>
</rn:container>

<style type="text/css">
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
  .rn_AskQuestion ul li > span {
    padding-right: 7px;
  }
  .rn_Hours,
  .rn_HoursPrefix {
    font-size: 0.9rem;
  }
  ul .rn_ChatHours .rn_HoursBlock {
    margin-top: 0;
  }
</style>
<div class="rn_AskQuestion">
  <div id="uq_AskQuestionContent">
    <h2>AskUs contacts </h2>
    <ul>
      <li><rn:widget path="chat/ConditionalChatLink" open_in_new_window="true" chat_login_page_height="500" chat_login_page_width="500" />
      </li>
      <li>
        <span><a aria-hidden="true" href="tel:61733464312"><iron-icon icon="communication:call"></iron-icon></a></span>
        <a href="tel:61733464312">+ 61 7 334 64312</a>
      </li>
      <li>
        <span><a aria-hidden="true" href="/app/library/contact"><iron-icon icon="communication:import-contacts"></iron-icon></a></span>
        <a href="/app/library/contact">Contact form</a>
      </li>
      <li>
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


