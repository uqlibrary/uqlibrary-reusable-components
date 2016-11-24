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
  @font-face {
    font-family: 'Material Icons';
    font-style: normal;
    font-weight: 400;
    src: local('Material Icons'), local('MaterialIcons-Regular'), url(https://fonts.gstatic.com/s/materialicons/v18/2fcrYFNaTjcS6g4U3t-Y5UEw0lE80llgEseQY3FEmqw.woff2) format('woff2');
  }

  .rn_Chat:before {
    /*content: "communication:chat"*/
  }
</style>
<div id="uq_AskQuestionContent" class="rn_AskQuestion" style="padding-top: 40px; padding-left: 60%;">
  <h2>AskUs contacts </h2>
  <!--
  http://documentation.custhelp.com/euf/assets/docs/november2016/olh/index_frames.html?q=/euf/assets/docs/november2016/olh/CustomerPortal/topicrefs/t_Add_a_chat_link_to_the_Support_Home_page_ax1229140.html
  when unavailable:
  <div id="rn_ConditionalChatLink_13" class="rn_ConditionalChatLink">
  <div class="rn_Chat">
  <a href="javascript:void(0);">Live Chat</a>
  <span id="rn_ConditionalChatLink_13_UnavailableBusyMessage">Chat is not currently available.</span>
  </div>
  </div>
   -->
  <rn:widget path="chat/ConditionalChatLink" open_in_new_window="true" chat_login_page_height="500" chat_login_page_width="500" />
  <div>
    <div>
      <a aria-hidden="true" href="tel:61733464312"><iron-icon icon="communication:call"></iron-icon></a>
      <a href="tel:61733464312">+ 61 7 334 64312</a>
    </div>
    <div>
      <a aria-hidden="true" href="/ask"><iron-icon icon="communication:import-contacts"></iron-icon></a>
      <a href="/ask">Contact form</a>
    </div>
    <a aria-hidden="true" href="mailto:askus@library.uq.edu.au"><iron-icon icon="communication:email"></iron-icon></a>
    <a href="mailto:askus@library.uq.edu.au">askus@library.uq.edu.au</a>
  </div>
  <div>
    <a href="http://www.library.uq.edu.au/contact-us">More ways to contact us</a>
  </div>
  <div>
    <rn:widget path="chat/ChatHours"/>
  </div>
</div>



