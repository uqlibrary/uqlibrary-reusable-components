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
- elements.html - contains imports of all polymer and custom components, it's used to vulcanize all required components into one distribution


### Applications Customisations

- LibGuides

include this code in Custom JS/CSS Code in LibGuides configuration

        <link type="image/x-icon" rel="shortcut icon" href="https://www.library.uq.edu.au/_/sites/all/themes/uq/images/favicon.ico">
        <script src="//d1t3p68j9z74e7.cloudfront.net/[master]/reusable-components/webcomponentsjs/webcomponents.js"></script>
        <link rel="import" href="//d1t3p68j9z74e7.cloudfront.net/[master]/reusable-components/elements.vulcanized.html">
        <script src="//d1t3p68j9z74e7.cloudfront.net/[master]/reusable-components/libguides/load.js"></script>
        <link rel="stylesheet" href="//d1t3p68j9z74e7.cloudfront.net/[master]/reusable-components/libguides/custom-styles.css" />
        <script src="//d1t3p68j9z74e7.cloudfront.net/[master]/reusable-components/resources/PgwBrowser/pgwbrowser.min.js"></script>
        <script src="//d1t3p68j9z74e7.cloudfront.net/[master]/reusable-components/resources/preloader.js"></script>

- LibAnswers

include this code in Custom JS/CSS Code in LinAnswers configuration

        <link type="image/x-icon" rel="shortcut icon" href="https://www.library.uq.edu.au/_/sites/all/themes/uq/images/favicon.ico">
        <script src="//d1t3p68j9z74e7.cloudfront.net/[master]/reusable-components/webcomponentsjs/webcomponents.js"></script>
        <link rel="import" href="//d1t3p68j9z74e7.cloudfront.net/[master]/reusable-components/elements.vulcanized.html">
        <script src="//d1t3p68j9z74e7.cloudfront.net/[master]/reusable-components/libanswers/load.js"></script>
        <link rel="stylesheet" href="//d1t3p68j9z74e7.cloudfront.net/[master]/reusable-components/libanswers/custom-styles.css" />

- Add more ...

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

- [branch_name]/applications/
    - /libguies/*
    - /libanswers/*
    - /other-uql-apps/*
    - /webcomponents/*
    - elements.vulcanized.html   
    
Subdirectory [branch_name] only exists for non-production branches, eg master/uat 

