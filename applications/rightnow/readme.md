#RightNow

RightNow is an Oracle CRM we are using to be in line with central UQ usage. It provides library clients with FAQ answers, replacing the old answers.library.uq.edu.au tool.

The github repo at [oracle-rightnow](https://github.com/uqlibrary/oracle-rightnow) is a repository of templates and views *backing up* code on the CRM servers for our pages at [https://uqcurrent.custhelp.com/](https://uqcurrent.custhelp.com/app/library/faqs) - changes are NOT made by updating github and pushing! Visit the oracle-rightnow repo for more details.

The RightNow pages feature Library styling on the page, including mega-menu to give users maximum possible information to answer questions. The Library login button is hidden, because there is the possibility of logging into RightNow, and the Ask Us button is shown because it links to the chat popup and other contact items.

The LibCal 'chat opening hours' element is included throughout - RightNow does provide an opening hours element, which can be seen at https://uqcurrent.custhelp.com/app/library/showHours (provided to let the WCT team check what RightNow is actually doing) but it isnt used publically as the formatting options are not to WCT's requirements. A Chat entry has been added to LibCal and the LibCal responsive layout has been adapted (duplicated) to give a sidebar Opening Hours display in RightNow.

At the time of writing, the chat button had been removed from the sidebar by RightNow UQ staff due to technical problems. This should be returned at some point and be the top item. The chat button can be implemented in two ways: as a "[Syndicated Widget](https://uqcurrent.custhelp.com/ci/tags/syndicated_widgets)" which is written in javascript and unfortunately conflicts with other RightNow code on the page (it is intended to be used on third party pages) and as a "[Standard Widget](https://uqcurrent.custhelp.com/ci/admin/docs/widgets/standard)" which uses RightNow tag-based language. The Standard Widget is the correct version to use on RightNow pages; the Syndicated Widget could be used on other library pages, but we are using our chat-status button instead.

