# reusable-components

central repository contains:

- /styles/ - common style templates, eg brand colors in scss 
- /elements/ - common elements, eg header/footer
- /applications/ - applications customisations, eg LibGuides styles/scripts
- /bin/ - deployment scripts

#### Prerequisites 

The full starter kit requires the following major dependencies:

- Node.js, used to run JavaScript tools from the command line.
- npm, the node package manager, installed with Node.js and used to install Node.js packages.
- gulp, a Node.js-based build tool.
- bower, a Node.js-based package manager used to install front-end packages (like Polymer).

### Getting Started

With Node.js installed, run the following one liner from the root of the repo:

```sh
npm install -g gulp bower && npm install && bower install
```

### Elements

- uq-minimal-header
- uq-minimal-footer
- uq-mega-menu
- uq-menu
- uq-sidebar (menu)
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
        <link rel="stylesheet" href="//assets.library.uq.edu.au/[master]/reusable-components/shared/common-minimal-styles.css" />
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/resources/preloader.js"></script>
        <script src="//assets.library.uq.edu.au/[master]/reusable-components/webcomponentsjs/webcomponents.js"></script>
        <link rel="import" href="//assets.library.uq.edu.au/[master]/reusable-components/elements.vulcanized.html">
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
2. Update any custom elements
3. Compile all styles 
4. Run vulcanize task
```sh
gulp vulcanize
```

5. Commit all changes
6. Codeship will deploy changes automatically by running
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


