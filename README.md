# uqlibrary-reusable-components

central repository contains:

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

        <link type="image/x-icon" rel="shortcut icon" href="//assets.library.uq.edu.au/reusable-components/resources/favicon.ico" />
        <link rel="stylesheet" href="//assets.library.uq.edu.au/[master]/reusable-components/libguides/custom-styles.css" />
        <link rel="stylesheet" href="//assets.library.uq.edu.au/[master]/reusable-components/shared/common-minimal-styles.css" />
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/resources/preloader.js"></script>
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/webcomponentsjs/webcomponents-lite.js"></script>
        <link rel="import" href="//assets.library.uq.edu.au/[master]/reusable-components/elements.vulcanized.html">
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/shared/load-minimal.js"></script>

#### LibAnswers

test group (uses master branch): http://answers.library.uq.edu.au/test

include this code in Custom JS/CSS Code in LinAnswers configuration

        <link type="image/x-icon" rel="shortcut icon" href="//assets.library.uq.edu.au/reusable-components/resources/favicon.ico" />
        <link rel="stylesheet" href="//assets.library.uq.edu.au/[master]/reusable-components/libanswers/custom-styles.css" />
        <link rel="stylesheet" href="//assets.library.uq.edu.au/[master]/reusable-components/shared/common-minimal-styles.css" />
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/resources/preloader.js"></script>
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/webcomponentsjs/webcomponents.js"></script>
        <link rel="import" href="//assets.library.uq.edu.au/[master]/reusable-components/elements.vulcanized.html">
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/shared/load-minimal.js"></script>
        
#### UQL Drupal (libwww)

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

#### UQLAPP
frontend/app/index.html includes following:

        <link type="image/x-icon" rel="shortcut icon" href="//assets.library.uq.edu.au/[master]/reusable-components/resources/favicon.ico" />
        <link rel="stylesheet" href="//assets.library.uq.edu.au/[master]/reusable-components/uqlapp/custom-styles.css" />
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/resources/preloader.js"></script>
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/webcomponentsjs/webcomponents-lite.js" async></script>
        <link rel="import" href="//assets.library.uq.edu.au/[master]/reusable-components/elements.vulcanized.html" async>
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/uqlapp/load.js"></script>

#### Shared (uqlais, ezproxy static pages)
[TODO: add details here]

        <link type="image/x-icon" rel="shortcut icon" href="//assets.library.uq.edu.au/[master]/reusable-components/resources/favicon.ico" />
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/resources/preloader.js"></script>
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/webcomponentsjs/webcomponents-lite.js" async></script>
        <link rel="import" href="//assets.library.uq.edu.au/[master]/reusable-components/elements.vulcanized.html" async>
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/shared/load-minimal.js"></script>
    

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
    - view full demo [here] (http://uqlibrary.github.io/uqlibrary-reusable-components/elements/demo)
    - full documentation [here] (http://uqlibrary.github.io/uqlibrary-reusable-components)

Codeship will deploy changes automatically by running deployment task /bin/codeship.sh:
- installs all dependencies
- sets AWS configuration
- runs checks/tests
- runs vulcanization task
- runs gulp publish task which uploads files to S3 bucket and invalidates cache

Distribution package on S3 looks like this:

- [branch_name]/reusable-components/
    - /libguides/*
    - /libanswers/*
    - /libwww/*
    - /uqlapp/*
    - /other-uql-apps/*
    - /webcomponents/*
    - elements.vulcanized.html   
    
Subdirectory [branch_name] only exists for non-production branches, eg master/uat 


