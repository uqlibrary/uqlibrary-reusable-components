# reusable-components

central repository contains:

- /elements/ - common elements, eg header/footer
- /test/ - tests for elements
- /applications/ - applications customisations, eg LibGuides styles/scripts
- /bin/ - deployment scripts
- /resources/ - icons, uql-menu.json, etc

#### Polymer style guide documentation for development

Please, read [Style Guide](http://polymerelements.github.io/style-guide/) before starting development.

#### Prerequisites

Project requires the following major dependencies:

- Node.js, used to run JavaScript tools from the command line.
- npm, the node package manager, installed with Node.js and used to install Node.js packages.
- gulp, a Node.js-based build tool.
- bower, a Node.js-based package manager used to install front-end packages (like Polymer).

### Getting Started

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


### Elements

- common-styles
- uq-minimal-header
- uq-minimal-footer
- uql-menu - contains uql-menu-menu and uql-drawer-panel, shows either menu, depending on desktop/mobile screen
- uql-mega-menu - horizontal menu, based on paper-tabs and
- uql-drawer-panel
- uql-global-links
- uql-ezproxy
- header buttons (uql-apps-button, uql-chat-button, uql-ia-button, uql-login-button, uql-search-button)
- elements.html - contains imports of all polymer and custom components, it's used to vulcanize all required components into one distribution


### Applications Customisations

- LibGuides

test group (uses master branch): http://guides.library.uq.edu.au/test
include this code in Custom JS/CSS Code in LibGuides configuration

        <link type="image/x-icon" rel="shortcut icon" href="//assets.library.uq.edu.au/reusable-components/resources/favicon.ico" />
        <link rel="stylesheet" href="//assets.library.uq.edu.au/[master]/reusable-components/libguides/custom-styles.css" />
        <link rel="stylesheet" href="//assets.library.uq.edu.au/[master]/reusable-components/shared/common-minimal-styles.css" />
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/resources/preloader.js"></script>
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/webcomponentsjs/webcomponents-lite.js"></script>
        <link rel="import" href="//assets.library.uq.edu.au/[master]/reusable-components/elements.vulcanized.html">
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/shared/load-minimal.js"></script>

- LibAnswers

test group (uses master branch): http://answers.library.uq.edu.au/test

include this code in Custom JS/CSS Code in LinAnswers configuration

        <link type="image/x-icon" rel="shortcut icon" href="//assets.library.uq.edu.au/reusable-components/resources/favicon.ico" />
        <link rel="stylesheet" href="//assets.library.uq.edu.au/[master]/reusable-components/libanswers/custom-styles.css" />
        <link rel="stylesheet" href="//assets.library.uq.edu.au/[master]/reusable-components/shared/common-minimal-styles.css" />
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/resources/preloader.js"></script>
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/webcomponentsjs/webcomponents.js"></script>
        <link rel="import" href="//assets.library.uq.edu.au/[master]/reusable-components/elements.vulcanized.html">
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/shared/load-minimal.js"></script>
        
- UQL Drupal

include this code in Omega's html.tpl.php 

        <link type="image/x-icon" rel="shortcut icon" href="//assets.library.uq.edu.au/reusable-components/resources/favicon.ico" />
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/resources/preloader.js"></script>
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/webcomponentsjs/webcomponents-lite.min.js"></script>
        <link rel="import" href="//assets.library.uq.edu.au/[master]/reusable-components/elements.vulcanized.html">
        <link rel="stylesheet" href="//assets.library.uq.edu.au/[master]/reusable-components/libwww/custom-styles.css" />
        <script>
            var menuJson = '//path/to/menu.json';
        </script>
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/libwww/load.js"></script>

- Add more ...

### Forcing IMS logins

Embed the following if you want to force an IMS login for on campus workstations, as they will be unable to access the assets.library.uq.edu.au domain:

        <script src="https://www.library.uq.edu.au/js/ims.js"></script>

### Development/Deployment process

1. Update styles
1. Update any custom elements
1. Compile all styles 
1. Run build task
```sh
gulp build
```

1. Commit all changes
1. Codeship will deploy changes automatically by running
deployment task /bin/codeship.sh:
- installs all dependencies
- sets AWS configuration
- runs gulp publish task which uploads files to S3 bucket

Distribution package on S3 looks like this:

- [branch_name]/reusable-components/
    - /libguides/*
    - /libanswers/*
    - /libwww/*
    - /other-uql-apps/*
    - /webcomponents/*
    - elements.vulcanized.html   
    
Subdirectory [branch_name] only exists for non-production branches, eg master/uat 


