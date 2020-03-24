# uqlibrary-reusable-components

[![Codeship Status for uqlibrary/uqlibrary-reusable-components](https://app.codeship.com/projects/ec94a770-2f74-0133-e71a-02dbfc2dcf25/status?branch=master)](https://codeship.com/projects/99389)
[![Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-reusable-components.svg)](https://david-dm.org/uqlibrary/uqlibrary-reusable-components)
[![Dev Dependency Status](https://david-dm.org/uqlibrary/uqlibrary-reusable-components/dev-status.svg)](https://david-dm.org/uqlibrary/uqlibrary-reusable-components?type=dev)

## Contents

- [Getting started](#getting-started)
- [Updating IA](#updating-ia)
- [Applications customisations](#applications-customisations)
- [Forcing IMS logins](#forcing-ims-logins)
- [Elements development](#elements-development)
- [Testing](#unit-testing)

The Central Repository contains:

- `/elements/` - Common elements, eg header/footer
  - View full demo [here](http://assets.library.uq.edu.au/master/reusable-components/elements/demo/index.html).
- `/test/` - Tests for elements
- `/applications/` - Application customisations such as LibGuides styles/scripts
- `/bin/` - Shell scripts for testing and deployment
- `/resources/` - Icons, uql-menu.json, etc
- `/templates/` - Simple layouts for static pages, used for EZProxy error display etc
- `/backup/` - Styles/scripts of applications before reusable components were applied

- NOTE! Whenever you push to production, confirm the branchName variable in `/applications/primo2/view_package/js/custom.js` is correct!!!! (It should be `/` for production).

[Overview of how the Polymer components interact](https://drive.google.com/open?id=1eV_KnLVfYBbn7lTl6AyiYQmHD1t1sBLo) (stored in [Projects](https://drive.google.com/drive/folders/0Bw6wOgp_LaKoZmZjUXM1eUNfU1E) for want of anywhere else to put it).

### Getting Started

Project requires the following major dependencies:

- Node.js, used to run JavaScript tools from the command line.
- NPM, the node package manager, installed with Node.js and used to install Node.js packages.
- Gulp, a Node.js-based build tool.
- Bower, a Node.js-based package manager used to install front-end packages (like Polymer).
- Nightwatch, the automated UI testing framework

With Node.js installed, run the following one liner from the root of the repo:

```sh
npm i -g gulp-cli bower nightwatch npm@6 && npm install
```

- IMPORTANT! Before each change, update our [saucelab browser versions](https://github.com/uqlibrary/uqlibrary-reusable-components/blob/master/bin/template.nightwatch-saucelabs.json) by using the [saucelabs configurator](https://wiki.saucelabs.com/display/DOCS/Platform+Configurator#/) so we are testing against current OS versions (browser versions are mostly automatic). Also check the [latest ESR version for firefox](https://www.mozilla.org/en-US/firefox/organizations/). (ESR versions are deployed in our Standard Environment across the Libraries).

### Updating IA

UX Services staff are able to make changes to the Mega Menu.

#### Instructions for UX Services staff

- Make sure your branch is set to `ux-services` (Using this branch means you can do your change at any time, without impacting other work which might be underway in master. Do, however, liaise with other UX Services staff who might be making other mega menu changes in this branch...)
- Changes can be made either through the GitHub interface or you can use a client like [GitHub Client](https://desktop.github.com/).
- Make your changes to this file:

  <https://github.com/uqlibrary/uqlibrary-reusable-components/blob/ux-services/resources/uql-menu.json>

If editing on the Github website, your screen should look like this:
![Demonstrating selecting the UX Services branch](https://github.com/uqlibrary/uqlibrary-reusable-components/raw/master/doc/uxservices-branch.png "Demonstrating selecting the UX Services branch")

- Once you have Committed the changes (and Pushed if using a client), a build will automatically be triggered. You can monitor the status of the build here: [Codeship for Reusable Components](https://codeship.com/projects/99389)

  This checks the syntax, runs the tests and then triggers a rebuild of the cache. This can take from 15-20 minutes to complete and the file should then be available for preview at [http://assets.library.uq.edu.au/ux-services/reusable-components/elements/demo/index.html](http://assets.library.uq.edu.au/ux-services/reusable-components/elements/demo/index.html).

- update the PT to indicate you have put your required changes in the `ux-services` branch.

#### Steps for devs after UX Services staff have pushed their changes

- For `uqlibrary-reusable-components`
  1. confirm `ux-services` branch build has passed
  1. Merge to master
- For `uqlibrary-pages`: start rebuild of production branch (after reusable master passes; it pulls master of reusable, no release necessary) - updates homepage
- For `uqlibrary-reusable-components`: build of production branch (merge master into prod and push) - updates drupal at web.library.uq.edu.au

If you are doing big changes to Polymer components, make sure you test everything is working on Drupal (<https://web.library.uq.edu.au>) as well. This can be tested before going live by running the master branch of reusable through codeship and, post-invalidation in AWS Cloudfront, viewing the Drupal staging site, for example, [the training page](https://library.stage.drupal.uq.edu.au/library-services/training).

(If you want to view the drupal staging site using staging data, you will have to build reusable master calling uqlibrary-api where uqlibrary-api.html has set the variable baseApiUrl to `https://api.library.uq.edu.au/staging`.)

### Applications Customisations

All custom styles/scripts are located in `/applications/[app name]/`

- `load.js` - Script contains injection of components for the application
- `custom-styles.scss/custom-styles.css` - Custom css for the application

Customised applications:

- [LibGuides](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/libapps)
- [LibAnswers](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/libapps)
- [UQ Drupal](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/libwww)
- [UQLAPP, FBS, Contacts, Exams, ACDB](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/uqlapp)
- [Primo UI](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/primo2)
- [Shared](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/shared)
- [Studenthub](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/careerhub)
- [Omeka](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/omeka)
- [Rightnow](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/rightnow)
- [Talis](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/talis)

- deprecated: [old Primo](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/primo)

### Forcing IMS logins

Embed the following if you want to force an IMS login for on campus workstations, as they will be unable to access the assets.library.uq.edu.au domain:

```html
<script src="https://www.library.uq.edu.au/js/ims.js"></script>
```

### Elements Development

Please, read [Style Guide](https://polymer-library.polymer-project.org/1.0/docs/devguide/styling) before starting development.

All common styles, colours, or mix-ins are located in `/elements/common-styles.html`

Follow [directions here](https://github.com/uqlibrary/uqlibrary-pages#updating-uql-component-dependencies) for post-dev steps to make sure that changes from child components make it to this repo.

#### Development/Deployment process

1. Create/update required component following [Style Guide](https://polymer-library.polymer-project.org/1.0/docs/devguide/styling)
1. Use common styles/variables/mix-ins from `/elements/common-styles.html`, customise styling in the element.
1. Create/update demo page for the component in `/elements/[component]/demo/index.html`
1. Create/update test suite in `/test/` directory
1. If new component is a stand alone component - add it to complete demo page /elements/demo/index.html
1. Run `gulp syntax` to check project passes validations
1. If component is to be included into a specific application, update `/applications/[app name]/load.js` for this application
1. If styling update is required for a specific application, make sure styles are compiled
1. Commit all changes

Codeship will deploy changes automatically by running deployment task `/bin/codeship.sh` (if Codeship is configured for deployment, by default it only builds a feature branch):

- Installs all dependencies
- Sets AWS configuration
- Runs checks/tests
- Runs vulcanization task
- Runs gulp publish task which uploads files to S3 bucket and invalidates cache

Distribution package on S3 looks like this:

- `[branch_name]/reusable-components/`
  - `/libapps/libguides/*`
  - `/libapps/libanswers/*`
  - `/libwww/*`
  - `/uqlapp/*`
  - `/other-uql-apps/*`
  - `/webcomponents/*`
  - `elements.vulcanized.html`
  - `elements.vulcanized.js`

Subdirectory [branch_name] only exists for non-production branches, eg master/uat.
Demo for feature branches is available at `http://assets.library.uq.edu.au/[branch_name]/reusable-components/elements/demo/index.html`

### Testing

#### Unit Testing

```bash
gulp test
```

#### Local testing

1. Run Selenium server. Selenium is required to run tests locally.

   - On Linux, install jdk, then download the Selenium Standalone Server jar file from [here](https://www.seleniumhq.org/download/) and then run the server with:

     ```bash
     java -jar selenium-server-standalone-{VERSION}.jar
     ```

     You may want to create a bash alias for this.

   - On OSX, `brew install selenium-server-standalone` to install, and then run the server with:

     ```bash
     selenium-server -port 4444
     ```

1. Run tests

   - To run the default test locally, you will need to [download the Firefox WebDriver](https://github.com/mozilla/geckodriver/releases) and put the location in your Path.
   - To run the Chrome tests locally you will need to [download the Chromium WebDriver](https://sites.google.com/a/chromium.org/chromedriver/) and put the location in your Path.
   - Test commands (run from the `bin` directory: `cd bin`):

     - Run all the tests using the default driver (`geckodriver`)

       ```bash
       nightwatch -c nightwatch.json --tag e2etest
       ```

     - Run all the tests using the Chrome driver

       ```bash
       nightwatch -c nightwatch.json --tag e2etest --env chrome
       ```

     - Run omeka-specific tests (tag defined in `test/e2e/e2e.omeka.js` )

       ```bash
       nightwatch -c nightwatch.json --tag omeka
       ```

       - Replace 'omeka' with whichever one you want to run, from `test/e2e/e2e.*.js` except the "minimal" one.
       - The nightwatch e2e tests are setup as one file per project, plus a file of minimal common items which isn't valid to run on its own. To only run the valid tests, use the tag `e2etest`.

#### Run Tests Remotely

```bash
gulp test:remote
```

When you run this command, you may get the error:

> Missing Sauce credentials. Did you forget to set SAUCE_USERNAME and/or SAUCE_ACCESS_KEY?

To set these fields,

1. Visit the [Reusable-components Codeship Environment Variable page](https://app.codeship.com/projects/99389/environment/edit)
1. Note the values for SAUCE_USERNAME and for SAUCE_ACCESS_KEY
1. Export these as local variables on your box, eg:

   ```bash
   export SAUCE_ACCESS_KEY='XXX'
   ```

Then run the `gulp test:remote` command again

## Workflow

### Suggested workflow for changing CSS on 3rd party sites

- Open the page that needs restyling
- Assuming Chrome, open the inspect page and tweak settings in the Elements > css pane until you have what you want
- Open the scss file in PhpStorm and make updates
- Run `gulp styles`
- Open the generated custom-styles.css file and copy all
- On the web page, in the inspector, goto Sources and navigate to the same custom-styles.css file
- Select all and overwrite with css copied from custom-styles.css, above
- Look at the page to check you got what you wanted
- Repeat

This lets you precisely check any changes without having to create a github release.

### Gotchas

If you run `gulp test` and you get the error:

```Error
Error: util_1.promisify is not a function
```

then your node version is too low, eg:

```bash
$ npm -v
6.4.1
```

Solution: update node to the version specified in `package.json`:

```bash
nvm install 11.10.1 # as of 19 Aug 2019
```

## Codeship backup at 03/Jan/2019

### Test Setup

```bash
jdk_switcher use oraclejdk8
chmod a+x -R bin/*
bin/codeship-setup.sh
```

### Pipelines

#### Test Commands

```bash
export PIPE_NUM=1
bin/codeship-testing.sh
```

#### Unit tests

```bash
export PIPE_NUM=2
bin/codeship-testing.sh
```

#### Saucelabs

```bash
export PIPE_NUM=3
bin/codeship-testing.sh
```

### Deployment (master and production)

CUSTOM SCRIPT

```bash
jdk_switcher use oraclejdk8
chmod a+x -R bin/*
bin/codeship-setup.sh
bin/codeship-deployment.sh
bin/codeship-prod-testing.sh
```

### Deployment (branches starting with `feature-` or `primo-`)

Same as above, except remove the last line.
