<rn:meta title="#rn:php:SEO::getDynamicTitle('answer', getUrlParm('a_id'))#" template="lib_full.php" answer_details="true" clickstream="answer_view"/>

<div class="row">
  <div class="lib_pagetop small-12 large-12 columns">
    <!-- PAGE TITLE -->
    <div class="panel-pane__content">
      <h1 class="page__title summary">
        <rn:widget path="output/DataDisplay" name="answers.summary" label="" highlight="false" />
      </h1>
      <rn:widget path="output/DataDisplay" name="answers.description" left_justify="true" label="" highlight="false" label_no_results="xxx" />
    </div>
  </div>

  <!-- BREADCRUMBS -->
  <div id="rn_Navigation" class="small-12 large-12 columns breadcrumbs">
    <ol class="breadcrumb breadcrumb-trail">
      <li class="breadcrumb breadcrumb-0 breadcrumb-home"><a href="https://www.library.uq.edu.au/" title="Home"><span class="show-for-sr">Home</span> <iron-icon aria-hidden="true" icon="home"></iron-icon></a></li>
      <li class="breadcrumb breadcrumb-1"><a href="/app/library/lib_answers">Contact us</a></li>
      <li class="breadcrumb breadcrumb-2">Frequently asked questions</li>
    </ol>

  </div>
</div>

</div> <!-- /lib_pagetop -->

<!-- CONTENT -->
<div class="row">
  <div id="rn_Body" class="small-12 large-12 columns">
    <div id="rn_MainColumn" role="main">
      <a id="rn_MainContent"></a>




      <div id="rn_PageContent" class="rn_AnswerList">
        <div id="page-answer-text"style="margin-left:-5px;"  >
          <rn:widget path="output/DataDisplay" name="answers.solution" label="" highlight="false" />
        </div>

        <!--
        <div id="page-feedback">
          <rn:widget path="feedback/AnswerFeedback" options_count="5" dialog_threshold="2" />
        </div>
        -->

        <br/>
        <rn:widget path="knowledgebase/RelatedAnswers" />
        <rn:widget path="knowledgebase/PreviousAnswers" />

        <rn:condition is_spider="false">
          <div id="navigation-icons">
            <div id="back-icon"><a href="javascript:history.back();">Back to search results</a></div>
            <div id="print-icon"><rn:widget path="utils/PrintPageLink" /></div>
            <div id="email-icon"><rn:widget path="utils/EmailAnswerLink" /></div>
          </div>
        </rn:condition>

        </form>
      </div>

      <div id="uq_AskQuestionContent" class="rn_AnswerList">
        <? /* adding in Search Controls area */ ?>
        <rn:condition is_spider="false">
          <!--<div id="rn_SearchControls" style="width: 98.5%; height: 125px;">-->
          <div id="rn_SearchControls">

            <div class="search-box">
              <form action="/ci/no_script/search" method="post" onSubmit="return false">
                <rn:container report_id="106195">
                  <div class="rn_UQKeyword">
                    <!-- <h2>Search again?</h2> -->

                    <rn:widget path="search/KeywordText" label=" " placeholder="Type what you are looking for ...." />
                  </div>

                  <?php /*
<div class="rn_UQProdCatFilter">
<h3>Search by category</h3>
<rn:widget path="search/ProductCategorySearchFilter" filter_type="products"  />
</div>
 */ ?>

                  <div class="search-tips"><a href="/app/utils/help_search" onclick="window.open(this.href,'Tips','resizable=0,top=200,left=300,location=0,status=0,width=800,height=555,scrollbars=0,menubars=0');YAHOO.util.Event.preventDefault(event);">#rn:msg:SEARCH_TIPS_LBL#</a>
                    <rn:widget path="search/SearchButton" report_page_url="/app/answers/list" report_id="106195"/>
                  </div>
                  <script>

                    var node = getElementsByIdStartsWith("rn_SearchControls", "Input", "rn_KeywordText_");
                    var a = document.createAttribute("placeholder");
                    a.nodeValue = "Type what you are looking for... ";
                    node.setAttributeNode(a);

                    function getElementsByClassName(node, classname) {
                      var a = [];
                      var re = new RegExp('(^| )'+classname+'( |$)');
                      var els = node.getElementsByTagName("*");
                      for(var i=0,j=els.length; i<j; i++)
                        if(re.test(els[i].className))a.push(els[i]);
                      return a;
                    }


                    function getElementsByIdStartsWith(container, selectorTag, prefix) {

                      var SearchInput;
                      var mySearchItem;
                      mySearchItem = document.getElementById(container).getElementsByTagName(selectorTag);

                      for (var i = 0; i < 1; i++) {
                        //omitting undefined null check for brevity
                        if (mySearchItem[i].id.lastIndexOf(prefix, 0) === 0) {
                          SearchInput = mySearchItem[i];
                        }
                      }
                      return SearchInput;
                    }
                  </script>
                </rn:container>
              </form>
            </div>
          </div>
        </rn:condition>
        <? /* end of adding in Search Controls area */ ?>
      </div>
    </div>
