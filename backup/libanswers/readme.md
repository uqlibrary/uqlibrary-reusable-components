### Backup of Libanswers setup before application of reusable components

Header:

    <!-- header --> 
    <div class="navbar navbar-default navbar-static-top uq-header" role="navigation">
        <div class="container">
            <div class="navbar-header">
                <a href="http://www.uq.edu.au">
                    <img src="https://app.library.uq.edu.au/images/uq_theme/uqbanner.png" class="uq-header-logo" alt="University of Queensland Homepage">
                </a>
                <img src="https://app.library.uq.edu.au/images/uq_theme/line.png" class="navbar-brand uq-line hidden-xs" alt="">
                <a class="uq-library-header-logo" href="https://www.library.uq.edu.au">UQ Library</a>
            </div>
        </div>
    </div>

Footer:

    <!-- footer -->
     <div class="uq-footer" role="navigation">
         <div class="container">
             <div class="row">
                 <div class="col-md-6 col-sm-6">
                     <p>Authorised by: University Librarian
                         <br>CRICOS Provider No: <a href="http://www.uq.edu.au/about/cricos-link">00025B</a>
                         <br>© 2015 The University of Queensland</p>
                 </div>
                 <div class="col-md-6 col-sm-6">
                     <p><a href="http://www.uq.edu.au/terms-of-use/">Privacy &amp; Terms of use</a> | <a href="http://www.uq.edu.au/feedback/">Feedback</a>
                     </p>
                 </div>
             </div>
         </div>
     </div>

Styles:

    <!-- GIT: https://github.com/uqlibrary/LibGuides2/blob/master/libAnswers.html -->
    <link type="image/x-icon" rel="shortcut icon" href="https://www.library.uq.edu.au/_/sites/all/themes/uq/images/favicon.ico">
    <style>
    * {
     margin: 0;
     padding: 0;
     border-radius: 2px;
    }
    
    html,
    body {
     height: 100%;
    }
    
    body {
     font-family: Helvetica, Arial, Roboto, sans-serif;
     font-weight: 400;
     padding-left: 0px;
     padding-right: 0px;
     background: #fafafa;
    }
    
    #s-la-bc .breadcrumb {
     background: none;
     font-size: 12px;
    }
    
    .s-la-header {
     padding: 0px 10px 10px 0px;
    }
    
    a {
     color: #007e9e;
    }
    
    a:hover {
     color: #006880;
    }
    
    a:active {
     color: #00576b;
    }
    
    .s-lib-header {
     padding-left: 15px;
     padding-right: 15px;
    }
    
    .btn-primary,
    .btn-default {
     background-color: #007e9e;
     background-image: none;
     border: none;
     border-radius: 2px;
     color: white;
    }
    
    .btn-primary:hover,
    .btn-default:hover {
     background-color: #006880;
     background-image: none;
     border: none;
     color: white;
    }
    
    .btn-primary:active,
    .btn-primary:focus,
    .btn-default:active,
    .btn-default:focus {
     background-color: #00576b;
     background-image: none;
     border: none;
     color: white;
    }
    
    .uq-header {
     border-radius: 0px;
     background-color: #49075e;
     height: 60px;
     margin-bottom: 0px;
     border: none;
     -webkit-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .5);
     -moz-box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .5);
     box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .5);
    }
    
    .uq-footer {
     border-radius: 0px;
     background-color: #49075e;
     padding-top: 16px;
     font-size: 12px;
     height: auto;
     color: white;
     margin: 0;
    }
    
    .uq-footer a {
     color: white;
    }
    
    .uq-line {
     height: 62px;
     margin: -2px -15px;
    }
    
    #s-la-public-footer {
     padding-bottom: 10px;
     border-top: none;
     background-color: transparent;
    }
    
    .container>.navbar-header,
    .container-fluid>.navbar-header,
    .container>.navbar-collapse,
    .container-fluid>.navbar-collapse {
     margin: 0;
    }
    
    .uq-header-logo {
     float: left;
     height: 40px;
     margin-top: 10px;
     padding-right: 15px;
    }
    
    .uq-header-logo:hover,
    .uq-header-logo:focus,
    .uq-header-logo:active {
     -webkit-filter: drop-shadow(0 0 1px #aaa);
    }
    
    .uq-library-header-logo {
     float: left;
     color: #fff;
     font-size: 24px;
     margin-top: 14px;
     margin-left: 15px;
     -webkit-font-smoothing: antialiased;
    }
    
    .uq-library-header-logo:hover,
    .uq-library-header-logo:active,
    .uq-library-header-logo:focus {
     color: #fff;
     text-decoration: none;
     -webkit-filter: drop-shadow(0 0 1px #aaa);
    }
    
    .uq-library-header-logo:hover {
     color: #fff;
     text-decoration: none;
    }
    /* styles for enclosing side nav */
    
    .s-lg-tabs-side > .nav {
     background: #fdfdfd;
     border: 3px solid #F3f3f3;
     padding: 12px 25px 25px 20px;
     margin: 1.5em 0px;
    }
    /* little dropdown containing sub-menu items */
    
    .dropdown-menu {
     position: absolute;
     top: 100%;
     z-index: 1000;
     display: none;
     float: left;
     padding: 0px 12px;
     min-width: 160px;
     font-size: 14px;
     text-align: left;
     list-style: none;
     background-color: #fff;
     -webkit-background-clip: padding-box;
     background-clip: padding-box;
     border: 1px solid #ccc;
     border: 1px solid rgba(0, 0, 0, .15);
     box-shadow: 0 3px 4px 0 rgba(0, 0, 0, 0.14),
     0 1px 8px 0 rgba(0, 0, 0, 0.12),
     0 3px 3px -2px rgba(0, 0, 0, 0.4);
    }
    
    #s-lg-tabs-container .nav-pills > li > ul > li > a {
     background: none !important;
    }
    
    #s-lg-guide-tabs .s-lg-tabs-side .nav .dropdown a,
    #s-lg-tabs-container .nav-tabs > li > a,
    #s-lg-tabs-container .nav-pills > li > a {
     border-radius: 0px 2px 2px 0px !important;
     background: #eee;
     font: 14px/1.2 Arial, Helvetica, sans-serif;
     cursor: pointer;
     color: #2662E3;
     border-bottom: 1px solid #eee;
     margin: 0 0 1px 0;
     background: url("https://dl.dropboxusercontent.com/u/590445/sidemenu-theming/arrow-right.png") no-repeat scroll right 12px transparent;
     padding: 0.6em 0;
    }
    /* submenu items */
    
    #s-lg-guide-tabs .s-lg-tabs-side .nav .dropdown a:hover,
    #s-lg-tabs-container .nav-tabs > li > a:hover,
    #s-lg-tabs-container .nav-pills > li > a:hover {
     background-color: transparent;
     color: #840c99;
     border-bottom: 1px solid #eee;
    }
    /* main nav item when selected */
    
    #s-lg-tabs-container .nav-tabs > .active,
    #s-lg-tabs-container .nav-pills > .active {}
    /* currently selected main nav link */
    
    #s-lg-tabs-container li > .dropdown-toggle {
     color: #333 !important;
     font-weight: bold !important;
     background: url("https://dl.dropboxusercontent.com/u/590445/sidemenu-theming/arrow-down.png") no-repeat scroll right 12px transparent !important;
    }
    /* non-currently-selected main nav links */
    
    #s-lg-tabs-container .dropdown > .dropdown-toggle {
     color: #2662E3 !important;
     font-weight: normal !important;
     background: url("https://dl.dropboxusercontent.com/u/590445/sidemenu-theming/arrow-right.png") no-repeat scroll right 12px transparent !important;
    }
    
    #s-lg-tabs-container .dropdown > .dropdown-toggle:hover {
     color: #840c99 !important;
    }
    /* always bold the top-level selected menu item */
    
    #s-lg-tabs-container ul > .active > .active {
     font-weight: bold !important;
    }
    
    #s-lg-tabs-container .nav-tabs > .active > a,
    #s-lg-tabs-container .nav-pills > .active > a {
     color: #333;
     background-color: transparent;
     background: url("https://dl.dropboxusercontent.com/u/590445/sidemenu-theming/arrow-down.png") no-repeat scroll right 12px transparent;
     font-weight: normal;
     padding: 0.6em 0;
     border-bottom: 1px solid #eee;
    }
    
    #s-lg-tabs-container .nav-tabs > .active > a:hover,
    #s-lg-tabs-container .nav-pills > .active > a:hover {
     color: #333;
     background-color: transparent;
     border-bottom: 1px solid #eee;
     font-weight: normal;
    }
    
    #s-lg-tabs-container .caret {
     display: none;
    }
    
    .s-lib-box {
     border-radius: 4px;
     box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }
    
    #s-lg-guide-main {
     padding: 0;
    }
    
    .s-lib-box .s-lib-box-title {
     font-size: 14px;
     margin-bottom: 0;
     padding: 12px 9px;
     color: #fff;
     font-weight: 400;
     background: #333;
     border-top: 1px solid #000;
    }
    
    #s-lib-scroll-top {
     display: none !important;
    }
    
    .uq-header .navbar-header {
     float: none;
    }
    
    .s-la-box-container {
     background-color: white;
    }
    
    .s-la-box-borderless {
     background: none;
    }
    
    .s-la-color-bars {
     background-image: none !important;
    }
    
    .s-la-box-title {
     background-color: #fefefe;
     border-radius: 2px 2px 0px 0px !important;
    }
    
    .form-control {
     border-radius: 2px;
    }
    
    .s-la-navbrowse {
     border-radius: 2px;
    }
    
    .fileinput-new {
     color: white !important;
    }
    
    h1#s-la-public-header-title {
     font-size: 32px;
    }
    
    p,
    .s-la-faq-answer li {
     font-size: 12px;
    }
    
    .s-la-navbrowse .navbar-text {
     font-size: 14px;
    }
    
    .breadcrumb {
     padding-left: 0 !important;
    }
    
    .s-la-public-home.s-la-public-header-text {
     float: left !important;
     margin-bottom: 0px;
    }
    
    .nav-tabs li {
     margin-bottom: -1px;
     margin-top: 2px;
     margin-right: 4px;
     border-radius: 2px 2px 0px 0px;
     background-color: #E6E6E6;
     /*padding: 0px 8px;*/
    
     border-top: 1px solid #007e9e;
     border-right: 1px solid #007e9e;
     border-left: 1px solid #007e9e;
    }
    
    .nav-tabs li:hover {
     background-color: #DADADA;
    }
    
    .nav-tabs li a {
     color: #3B5400 !important;
     border: none !important;
     padding: 10px 8px !important;
     line-height: 1 !important;
    }
    
    .nav-tabs > li.active > a,
    .nav-tabs > li.active > a:hover,
    .nav-tabs > li.active > a:focus {
     border: none !important;
    }
    
    .nav-tabs > li > a:hover {
     border-color: none !important;
     background-color: none !important;
     background: none !important;
    }
    
    .nav-tabs > li.active > a,
    .nav-tabs > li.active > a:hover,
    .nav-tabs > li.active > a:focus,
    .nav-tabs li.active {
     background-color: #007e9e !important;
     color: white !important;
    }
    
    .nav-tabs li.active a {
     font-weight: normal !important;
    }
    
    .nav-tabs {
     padding-bottom: 1px;
     margin-bottom: 20px;
     border-radius: 0px;
    }
    
    .nav-tabs ul li a {
     color: white;
     background: transparent !important;
     background-color: transparent;
     border: none !important;
    }
    
    .tab-content {
     background-color: #ffffff;
     padding: 5px 16px 16px 16px;
     margin-top: -8px;
     border: 1px solid #ccc;
     box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
     border-radius: 0px 0px 2px 2px;
    }
    
    .nav-tabs > li.active > a,
    .nav-tabs > li.active > a:hover,
    .nav-tabs > li.active > a:focus,
    .nav-tabs li.active {
     background-color: transparent !important;
     color: #333 !important;
     border: none;
     border-bottom: 4px solid #8CB800;
     cursor: pointer;
    }
    
    .nav-tabs li {
     background-color: transparent !important;
     color: #333 !important;
     border: none;
     border-bottom: 4px solid transparent;
     transition: all .1s ease;
    }
    
    .nav-tabs li:hover {
     background-color: transparent !important;
     color: #333 !important;
     border: none;
     border-bottom: 4px solid #8CB800;
     transition: all .1s ease;
    }
    
    .s-la-box-container {
     box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }
    
    .s-la-box-borderless {
     box-shadow: none;
    }
    
    .s-la-faq-listing-q {
     font-weight: 400;
    }
    
    .navbar-text {
     margin-top: 18px;
    }
    
    .s-la-faq-action-bar .s-la-color-bars {
     border-radius: 2px;
     background-color: #fefefe;
     box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
    }
    
    #s-la-browsebar-collapse {
     background: white;
    }
    
    #s-la-page-title-bar {
     box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12), 0 3px 1px -2px rgba(0, 0, 0, 0.2);
     border-radius: 2px;
    }
    
    ul, ol {
     margin-left: 36px;
    }
    
    #s-la-vote {
     display:none;
    }
    </style>