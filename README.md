# uqlibrary-reusable-components

[![Codeship Status for uqlibrary/uqlibrary-reusable-components](https://app.codeship.com/projects/ec94a770-2f74-0133-e71a-02dbfc2dcf25/status?branch=master)](https://codeship.com/projects/99389)
[![Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-reusable-components.svg)](https://david-dm.org/uqlibrary/uqlibrary-reusable-components)
[![Dev Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-reusable-components/dev-status.svg)](https://david-dm.org/uqlibrary/uqlibrary-reusable-components?type=dev)

## Contents:

* [Getting started](#getting-started)
* [Updating IA](#updating-ia)
* [Applications customisations](#applications-customisations)
* [Forcing IMS logins](#forcing-ims-logins)
* [Elements development](#elements-development)
* [Testing](#unit-testing)

The Central Repository contains:

- /elements/ - common elements, eg header/footer
    - view full demo [here](http://assets.library.uq.edu.au/master/reusable-components/elements/demo/index.html)
- /test/ - tests for elements
- /applications/ - applications customisations, eg LibGuides styles/scripts
- /bin/ - shell scripts, eg deployment, gh-pages
- /resources/ - icons, uql-menu.json, etc
- /templates/ - simple layouts for static pages, used for EZProxy error display etc
- /backup/ - styles/scripts of applications before reusable components were applied

### Getting Started

Project requires the following major dependencies:

- Node.js, used to run JavaScript tools from the command line.
- npm, the node package manager, installed with Node.js and used to install Node.js packages.
- gulp, a Node.js-based build tool.
- bower, a Node.js-based package manager used to install front-end packages (like Polymer).

With Node.js installed, run the following one liner from the root of the repo:

```sh
npm install -g gulp bower && npm install && bower install
```

### Updating IA

BUEA staff are able to make changes to the Mega Menu. Instructions:

* Make sure your branch is set to master.
* Changes can be made either through the GitHub interface or you can use the [GitHub Client](https://desktop.github.com/).
* Make your changes to this file:

https://github.com/uqlibrary/uqlibrary-reusable-components/blob/master/resources/uql-menu.json

* Once you have committed (and pushed if using a client) the changes, a build will automatically be triggered.  You can monitor the status of the build here:

[Codeship for re-usable components](https://codeship.com/projects/99389)
    
This checks the syntax, runs the tests and then triggers a rebuild of the cache.  This can take from 15-20 minutes to complete and the file should then be live.

After BUEA staff have pushed their changes, developers should:

* for uqlibrary-reusable-components: confirm master build passes (it should start from initial push to github by BUEA)
* for uqlibrary-pages: start rebuild of production branch (after reusable master passes; it pulls master of reusable, no release necessary) - updates homepage
* for uqlibrary-reusable-components: build of production branch (merge master into prod and push) - updates drupal at web.library.uq.edu.au
* for uqlibrary-mylibrary: if affected, start rebuild of production (pulls production of reusable) - updates https://www.library.uq.edu.au/mylibrary/

### Applications Customisations

All custom styles/scripts are located in /applications/[app name]/

- load.js - script contains injection of components for the application 
- custom-styles.scss/custom-styles.css - custom css for the application

Customised applications:

* [LibGuides](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/libapps)
* [LibAnswers](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/libapps)
* [UQ Drupal](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/libwww)
* [UQLAPP, FBS, Contacts, Exams, ACDB](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/uqlapp)
* [Primo UI](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/primo2)
* [Shared](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/shared)
* [Studenthub](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/careerhub)
* [Omeka](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/omeka)
* [Rightnow](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/rightnow)
* [Talis](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/talis)

* deprecated: [old Primo](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/primo)*

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
    - view full demo [here](http://assets.library.uq.edu.au/master/reusable-components/elements/demo/index.html)

Codeship will deploy changes automatically by running deployment task /bin/codeship.sh (if Codeship is configured for deployment, by default it only builds a feature branch):
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
    
Subdirectory [branch_name] only exists for non-production branches, eg master/uat.
Demo for feature branches is available at **http://assets.library.uq.edu.au/[branch_name]/reusable-components/elements/demo/index.html** 

### Testing

#### Unit Testing

`gulp test`

#### Local testing

* install selenium server

Run Selenium server. Selenium is required to run tests locally Selenium Installer

  `java -jar selenium-server-standalone-{VERSION}.jar`
  
or `brew install selenium-server-standalone` then `selenium-server -port 4444`

* run tests

To run the Chrome tests locally you will need to [download the WebDriver](https://sites.google.com/a/chromium.org/chromedriver/) and put the location in your Path.

`$ cd bin`

`$ nightwatch -c nightwatch.json --env chrome  --tag e2etest`

Sample test commands:

`$ nightwatch -c nightwatch.json --tag e2etest` #  run default test (with e2e tag to exclude minimal include)

`$ nightwatch -c nightwatch.json  --tag omeka` #  run omeka specific tests (tag defined in test/e2e/e2e.omeka.js )

`$ nightwatch -c nightwatch.json --env chrome` #  run test on safari browser (name must match object name in nightwatch.json)

(The nightwatch e2e tests are setup as one file per project, plus a file of minimal common items which isn't valid to run on its own. To only run the valid tests, use the tag e2etest.)

## Workflow

### Suggested workflow for changing CSS on 3rd party sites:

* Open the page that needs restyling
* Assuming Chrome, open the inspect page and tweak settings in the Elements > css pane until you have what you want
* Open the scss file in PhpStorm and make updates
* Run `gulp styles`
* Open the generated custom-styles.css file and copy all
* On the web page, in the inspector, goto Sources and navigate to the same custom-styles.css file
* Select all and overwrite with css copied from custom-styles.css, above
* Look at the page to check you got what you wanted
* Repeat

This lets you precisely check any changes without having to create a github release.

## Codeship backup at 30/june/2017

### Test Setup

jdk_switcher use oraclejdk8
chmod a+x -R bin/*
bin/codeship-setup.sh

### Pipelines

#### Test Commands

export PIPE_NUM=1
bin/codeship-testing.sh

#### Unit tests

export PIPE_NUM=2
bin/codeship-testing.sh

#### Saucelabs

export PIPE_NUM=3
bin/codeship-testing.sh

### Deployment (mastr and production)

CUSTOM SCRIPT
jdk_switcher use oraclejdk8
chmod a+x -R bin/*
bin/codeship-setup.sh
bin/codeship-deployment.sh
bin/codeship-prod-testing.sh
