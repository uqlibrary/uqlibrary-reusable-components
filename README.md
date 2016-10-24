# uqlibrary-reusable-components

## Contents:

* [Getting Started](#getting-started)
* [Updating IA](#updating-ia)
* [Applications Customisations](#applications-customisations)
* [LibGuides](#libguides)
* [LibAnswers](#libanswers-httpanswerslibraryuqeduau)
* [UQ Drupal](#uq-drupal-httpsweblibraryuqeduau)
* [UQLAPP, FBS, Training, Contacts, Exams, ACDB](#uqlapp-fbs-training-contacts-exams-acdb)
* [PRIMO](#primo-httpssearchlibraryuqeduau)
* [Shared](#shared-uqlais-ezproxy-static-pages)
* [Studenthub](#studenthub-httpswwwstudenthubuqeduau)
* [Omeka](#omeka)
* [Forcing IMS logins](#forcing-ims-logins)
* [Elements Development](#elements-development)

The Central Repository contains:

- /elements/ - common elements, eg header/footer
    - view full demo [here] (http://uqlibrary.github.io/uqlibrary-reusable-components/elements/demo)
    - full documentation [here] (http://uqlibrary.github.io/uqlibrary-reusable-components)
- /test/ - tests for elements
- /applications/ - applications customisations, eg LibGuides styles/scripts
- /bin/ - shell scripts, eg deployment, gh-pages
- /resources/ - icons, uql-menu.json, etc
- /templates/ - simple layouts for static pages, used for EZProxy error display etc
- /backup/ - styles/scripts of applications before reusable components were applied

### Getting Started

#### Prerequisites

Project requires the following major dependencies:

- Node.js, used to run JavaScript tools from the command line.
- npm, the node package manager, installed with Node.js and used to install Node.js packages.
- gulp, a Node.js-based build tool.
- bower, a Node.js-based package manager used to install front-end packages (like Polymer).

#### Viewing the Demo 

The demo page is available [here](http://assets.library.uq.edu.au/master/reusable-components/elements/demo/index.html).

(Swap out alternate branch names for 'master' in this url to test other branches).

#### Installing Dependencies 

With Node.js installed, run the following one liner from the root of the repo:

```sh
npm install -g gulp bower && npm install && bower install
```

### Updating IA

Make sure your branch is set to master.  Make your changes to this file, either through the GitHub interface or you can use the [GitHub Client](https://desktop.github.com/).  

https://github.com/uqlibrary/uqlibrary-reusable-components/blob/master/resources/uql-menu.json

Once you have committed (and pushed if using a client) the changes, a build will automatically be triggered.  You can monitor the status of the build here:

[Codeship for re-usable components](https://codeship.com/projects/99389)
    
This checks the syntax, runs the tests and then triggers a rebuild of the cache.  This can take from 15-20 minutes to complete and the file should then be live.

### Applications Customisations

All custom styles/scripts are located in /applications/[app name]/

- load.js - script contains injection of components for the application 
- custom-styles.scss/custom-styles.css - custom css for the application

#### LibGuides

test group (uses master branch): http://guides.library.uq.edu.au/test
include this code in Custom JS/CSS Code in LibGuides configuration

        <link type="image/x-icon" rel="shortcut icon" href="//assets.library.uq.edu.au/reusable-components/resources/favicon.ico">
        <script src="//assets.library.uq.edu.au/reusable-components/resources/preloader.js" async></script>
        <script src="//assets.library.uq.edu.au/reusable-components/webcomponentsjs/webcomponents-lite.js" async></script>
        <link rel="import" href="//assets.library.uq.edu.au/reusable-components/elements.vulcanized.html" async>
        <script src="//assets.library.uq.edu.au/reusable-components/libapps/load.js" async></script>
        <link rel="stylesheet" href="//assets.library.uq.edu.au/reusable-components/libapps/libguides/custom-styles.css" />

customisation of groups shall be done the same way as custom-styles, example:how-to-find-group.css

        <link rel="stylesheet" href="//assets.library.uq.edu.au/reusable-components/libapps/libguides/how-to-find-group.css" />
        
#### LibAnswers (http://answers.library.uq.edu.au)

test group (uses master branch): http://answers.library.uq.edu.au/test

include this code in Custom JS/CSS Code in LinAnswers configuration

        <link type="image/x-icon" rel="shortcut icon" href="//assets.library.uq.edu.au/reusable-components/resources/favicon.ico">
        <script src="//assets.library.uq.edu.au/reusable-components/resources/preloader.js" async></script>
        <script src="//assets.library.uq.edu.au/reusable-components/webcomponentsjs/webcomponents-lite.js" async></script>
        <link rel="import" href="//assets.library.uq.edu.au/reusable-components/elements.vulcanized.html" async>
        <script src="//assets.library.uq.edu.au/reusable-components/libapps/load.js" async></script>
        <link rel="stylesheet" href="//assets.library.uq.edu.au/reusable-components/libapps/libanswers/custom-styles.css" />

#### UQ Drupal (https://web.library.uq.edu.au)

UQ ITS is managing UQ Drupal library's CMS (web.library.uq.edu.au). Any components to be used in UQ Drupal require registration within UQ Drupal.

        <html manifest="//assets.library.uq.edu.au/reusable-components/libwww/reusable-components.appcache">

        <script type="text/javascript" src="//www.library.uq.edu.au/js/ims.js"></script>
        <script type="text/javascript" src="//assets.library.uq.edu.au/reusable-components/resources/preloader.js"></script>
        <script type="text/javascript" src="//assets.library.uq.edu.au/reusable-components/webcomponentsjs/webcomponents-lite.js"></script>
        <script type="text/javascript" src="//assets.library.uq.edu.au/reusable-components/libwww/load.js"></script>
        <link rel="import" href="//assets.library.uq.edu.au/reusable-components/elements.vulcanized.html" async>
        <link rel="stylesheet" href="//assets.library.uq.edu.au/reusable-components/libwww/custom-styles.css" />
                
        

reusable-components.appcache is a manifest file which contains a list of files that can be cached by a browser. Application cache file has a version number which signals to a browser that cached files were updated. Version is updated automatically at deployment time. 

#### UQLAPP, FBS, Training, Contacts, Exams, ACDB

Used in files:
- UQLAPP: frontend/app/index.html
- FBS: public/lib/Template.class.php
- Training: calendarfunctions.php
- Contacts: contacts/librarians/index.html
- Exams: help.html, search.html and eep.inc.php
- ACDB (https://www.library.uq.edu.au/acdba.html) : /usr/local/apache/uqlapi/auth/common1.inc (reusable_copyright_header function)

Include the following:

        <link type="image/x-icon" rel="shortcut icon" href="//assets.library.uq.edu.au/reusable-components/resources/favicon.ico"> 
        <script src="//assets.library.uq.edu.au/reusable-components/resources/preloader.js" async></script>
        <script src="//assets.library.uq.edu.au/reusable-components/webcomponentsjs/webcomponents-lite.js" async></script>
        <link rel="import" href="//assets.library.uq.edu.au/reusable-components/elements.vulcanized.html" async>
        
        <script src="//assets.library.uq.edu.au/reusable-components/uqlapp/load.js" async></script>
        <link rel="stylesheet" href="//assets.library.uq.edu.au/reusable-components/uqlapp/custom-styles.css" />
        
##### ACDB (https://www.library.uq.edu.au/acdba.html)

then in the /var/www/www.library.uq.edu.au/public_html/get-reusable.php file, call the following php function:

                reusable_copyright_header();

#### PRIMO (https://search.library.uq.edu.au)
Primo includes static_html/footer.html on every page which loads all UQL styling and JavaScript. 
footer.html is uploaded to Primo Back Office via File Uploader to 61UQ view (production).

Master branch is deployed and changes can be seen on [61UQ_DEV view] (http://search.library.uq.edu.au/primo_library/libweb/action/search.do?vid=61UQ_DEV)


Primo static_html/footer.html to include following:

        <link type="image/x-icon" rel="shortcut icon" href="//assets.library.uq.edu.au/reusable-components/resources/favicon.ico"> 
        <script src="//assets.library.uq.edu.au/reusable-components/resources/preloader.js" async></script>
        <script src="//assets.library.uq.edu.au/reusable-components/webcomponentsjs/webcomponents-lite.js" async></script>
        <link rel="import" href="//assets.library.uq.edu.au/reusable-components/elements.vulcanized.html" async>
        
        <script src="//assets.library.uq.edu.au/reusable-components/primo/load.js" async></script>
        <link rel="stylesheet" href="//assets.library.uq.edu.au/reusable-components/primo/custom-styles.css" />
        
Primo styling for Primo iframes.
When custom-styles.css is finalised, it has to be uploaded to Primo to apply styles to Primo iframes (not Alma iframes).

In Primo Back Office:

1. Upload custom-styles.css to 61UQ view via Deploy & Utilities -> File Uploader
2. In FE & Delivery -> Views List edit 61UQ view, Save & Continue all the way through, and Deploy.

To test your new CSS has been applied go to a Primo page and add attribute &wroDevMode=true to query string. This will stop CSS concat tool from merging all CSS files on server side.
More details [Primo CSS customisation](https://knowledge.exlibrisgroup.com/Primo/Product_Documentation/Technical_Guide/Customizing_Primo%E2%80%99s_User_Interface/Customizing_the_Default_CSS_File)
, [File Uploader Tool](https://knowledge.exlibrisgroup.com/Primo/Product_Documentation/Back_Office_Guide/Primo_Utilities/The_File_Uploader_Tool)
and [Debugging CSS/JS in Primo] (https://knowledge.exlibrisgroup.com/Primo/Product_Documentation/Technical_Guide/Customizing_Primo%E2%80%99s_User_Interface/Debugging_CSS_and_JavaScript)                

Styling for Alma iframes:

1. Login to https://uq.alma.exlibrisgroup.com/SAML
2. Go to Alma > Administration > General Configuration > General Configuration Menu
3. Select Delivery System Skins
4. Select "uqskin" and click on Action->Edit
5. Download the branding_skin.zip
6. Unzip the file and uncomment and edit css class in the mashup.css as required
7. Rezip the file (remember to remove all the system hidden folders and files e.g. .Dstore)
8. Upload the zip file and Save

Then Go To Primo Back Office:

1. Go to Advanced Configuration > Mapping Tables
2. Select "Delivery" for subsystem
3. Select "Templates" and click on Edit
4. Look for "Almagetit" and "Almaviewit" and make sure they have "&req.skin=uqskin" appended
5. If they dont, append the text and click Save and Deploy.

On the search result page, confirm the settings have been applied correctly:

1. Check the iframe src, it shall have "&req.skin=uqskin" appended
2. Check in the header section, it shall load the mashup.css from the uqskin:

        <link href="/view/branding_skin/css/mashup.css?skinName=uqskin&version=June2016&skinVersion=1466583814&customerId=3130&institutionId=3131" rel="stylesheet" type="text/css">

#### Shared (uqlais, ezproxy static pages)
https://github.com/uqlibrary/UQLAIS/blob/master/templates/header.tpl.html includes following:

        <link type="image/x-icon" rel="shortcut icon" href="//assets.library.uq.edu.au/reusable-components/resources/favicon.ico"> 
        <script src="//assets.library.uq.edu.au/reusable-components/resources/preloader.js" async></script>
        <script src="//assets.library.uq.edu.au/reusable-components/webcomponentsjs/webcomponents-lite.js" async></script>
        <link rel="import" href="//assets.library.uq.edu.au/reusable-components/elements.vulcanized.html" async>
                
        <script src="//assets.library.uq.edu.au/reusable-components/shared/load-minimal.js" async></script>
        <link rel="stylesheet" href="//assets.library.uq.edu.au/reusable-components/shared/common-minimal-styles.css" />

#### Studenthub (https://www.studenthub.uq.edu.au/)

A third party product that we are theming to match the general library theme.

Current area is the [Library Staff Development workgroup portal](https://studenthub.uq.edu.au/workgroups/library-staff-development/events/). We are theming this by putting our polymer reusable elements in the top of the body of the page via a GUI editor.

*Editing in the studenthub GUI interface does not return all the html lines that were supplied*, so start with the code block below - dont try to edit in place in the GUI.

Method to edit the theme:

- Decide what changes are needed and update below
- Visit the theme edit page [current link](https://www.studenthub.uq.edu.au/Admin/SubSites/Layout.aspx?id=14) or: login > left hand menu, click on Work Groups > centre block, click on name of Work Group > right hand menu, click on Work group settings > middle area, click on Layout
- Click on the word '(text)' in the header of the example-layout (if this isnt available, drag the 'text' item from
the layout options into the header field, then click)
- Click on the angle bracket icon ('<>') - a very short area will load with white markup on a black background. This is the editing area
- Select the current markup and delete (the GUI does not return everything we provide them)
- Paste in the markup from below
- Click OK
- Reload the workgroup portal page to confirm (the change should be instant)

Code to include in the GUI editor (keep this up to date as it can't be reviewed reliably in the GUI):

        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0">
        <script src="//assets.library.uq.edu.au/reusable-components/resources/preloader.js" async></script>
        <script src="//assets.library.uq.edu.au/reusable-components/webcomponentsjs/webcomponents-lite.js" async></script>
        <link rel="import" href="//assets.library.uq.edu.au/reusable-components/elements.vulcanized.html" async>    
        <script src="//assets.library.uq.edu.au/reusable-components/careerhub/load.js" async></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="//assets.library.uq.edu.au/reusable-components/careerhub/custom-styles.css">

Notes:

* Careerhub have said they will put the meta viewport line in the template. It hasnt appeared yet - if it does, this line can be removed here
* Material design icons are being used, so the font family is included

#### Omeka

A third party product we are using for online library exhibits

[View](https://uqlibraryonlineexhibitions.omeka.net/)

Login as admin [here](https://uqlibraryonlineexhibitions.omeka.net/admin/) - user email and password are in Vault.

The prefered method of styling is to style [the assets css file](https://github.com/uqlibrary/uqlibrary-reusable-components/blob/master/applications/omeka/custom-styles.scss)

CSS can also be updated in the [CSS Plugin](http://uqlibraryonlineexhibitions.omeka.net/admin/plugins)
which has major restrictions, eg:

* any styling of html header and footer elements are removed!!!
* any styling of the body element is removed
* any property set to a value of 'inherit' is removed
* omeka doesnt recognise rem unit values and removes the property, so supply a px default
* the following properties are removed:
** transition
** transition-delay
** max-width
** width
** min-height
* it strips :before attributes
* any styling on a child element rewrites the '>' to \3E
* doubtless more

The [load.js](//assets.library.uq.edu.au/reusable-components/omeka/load.js) file:

* loads the responsive meta
* applies the uq favicon
* applies the uq apple icon
* attaches the above css file
* loads the reusable components

JS is applied in the footer, which can be edited [on this page](http://uqlibraryonlineexhibitions.omeka.net/admin/exhibits/theme-config/1) (or... click on exhibits in the left hand nav, click 'edit' on the chosen exhibit, scroll down to the theme dropdown, choose the correct theme and click Configure).

Once on that page, scroll down to 'Footer Text', click the 'HTML' icon on the edit area, and update the html for the footer. Maintain the following code block as the correct code:

        <script type="text/javascript" src="//assets.library.uq.edu.au/reusable-components/omeka/load.js"></script>
        <script type="text/javascript" src="//assets.library.uq.edu.au/reusable-components/webcomponentsjs/webcomponents.js"></script>

If you have a specific theme that needs special styling, add a new class name in by adding these lines to the bottom of the footer, as above. It will add a class to the body element (base it on the theme name) - then you can write css to taregt just this theme (it will affect all exhibits that have had this classname added to the body)

        <script type="text/javascript">// <![CDATA[
          AddClassNameToBody('bigtheme');
        ]]></script>  

### Forcing IMS logins

Embed the following if you want to force an IMS login for on campus workstations, as they will be unable to access the assets.library.uq.edu.au domain:

        <script src="https://www.library.uq.edu.au/js/ims.js"></script>

### Elements Development

Please, read [Style Guide](http://polymerelements.github.io/style-guide/) before starting development.

All common styles, colours, or mix-ins are located in /elements/common-styles.html

#### Development/Deployment process

1. Create/update required component following [Style Guide](http://polymerelements.github.io/style-guide/)
1. Use common styles/variables/mix-ins from /elements/common-styles.html, customise styling in the element.
1. Create/update demo page for the component in /elements/[component]/demo/index.html
1. Create/update test suite in /test/ directory
1. If new component is a stand alone component - add it to complete demo page /elements/demo/index.html
1. Run 'gulp syntax' to check project passes validations
1. If component is to be included into a specific application, update /applications/[app name]/load.js for this application
1. If styling update is required for a specific application, make sure styles are compiled
1. Commit all changes
1. Update documentation for the project:
 - create a new temporary non-git directory
 - run /bin/generate-gh-pages.sh from this new empty directory
 - script will update gh-pages branch of the project
 - check gh-pages were updated successfully
    - view full demo [here](http://uqlibrary.github.io/uqlibrary-reusable-components/elements/demo)
    - full documentation [here](http://uqlibrary.github.io/uqlibrary-reusable-components)

Codeship will deploy changes automatically by running deployment task /bin/codeship.sh:
- installs all dependencies
- sets AWS configuration
- runs checks/tests
- runs vulcanization task
- runs gulp publish task which uploads files to S3 bucket and invalidates cache

Distribution package on S3 looks like this:

- [branch_name]/reusable-components/
    - /libapps/libguides/*
    - /libapps/libanswers/*
    - /libwww/*
    - /uqlapp/*
    - /other-uql-apps/*
    - /webcomponents/*
    - elements.vulcanized.html
    - elements.vulcanized.js
    
Subdirectory [branch_name] only exists for non-production branches, eg master/uat .

### Testing

#### Local testing

* install selenium server

Run Selenium server. Selenium is required to run tests locally Selenium Installer

  `java -jar selenium-server-standalone-{VERSION}.jar`
  
or `brew install selenium-server-standalone` then `selenium-server -p 4444`

* run tests

To run the Chrome tests locally you will need to [download the WebDriver](https://sites.google.com/a/chromium.org/chromedriver/) and put the location in your Path.

`$ cd bin`

`$ nightwatch`

Sample test commands:

`$ nightwatch -c nightwatch.json --tag e2etest` #  run default test (with e2e tag to exclude minimal include)

`$ nightwatch -c nightwatch.json  --tag omeka` #  run omeka specific tests (tag defined in test/e2e/e2e.omeka.js )

`$ nightwatch -c nightwatch.json --env safari-on-mac` #  run test on safari browser (name must match object name in nightwatch.json)

(The nightwatch e2e tests are setup as one file per project, plus a file of minimal common items which isn't valid to run on its own. To only run the valid tests, use the tag e2etest.)








