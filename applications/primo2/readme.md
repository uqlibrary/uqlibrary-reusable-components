# PRIMO2 Customisations

* New Primo UI URL: [master](https://search.library.uq.edu.au/primo-explore/search?vid=61UQ_DEV) / [production](https://search.library.uq.edu.au/primo-explore/search?vid=61UQ)

UQ Library is a Hosted Multi-Tenant Customer of Ex Libris (the alternative is to be an On-Premises Customer).

## Theming for new Primo UI includes

* Customisation package `/view_package/*` - [readme](https://github.com/uqlibrary/uqlibrary-reusable-components/blob/master/applications/primo2/view_package/README.md)
* `load.js` - Any custom scripts
* `custom.scss` - Compiles styles from `/www/*` (Primo's SCSS package) and customisations in `/styles-imports/*`

## Styling guidelines

* All global overrides (eg fonts, colours, etc) to be updated in Primo's SASS package
  * `/www/styles/main.scss` - Contains a list of SCSS imports
  * Any global overrides of a partial to be copied to `styles-imports/www` (variables example below):
    * Global variables(colours) override is imported from `@import "../../styles-imports/www/variables";`
    * Original variables import is kept in the `main.scss` for reference `//@import "partials/variables";`
  * Keep overrides to a minimum
* All local customisations/fixes to be done in `reusable-components/applications/primo2/custom-styles.scss`
* SASS package can be downloaded from <https://search.library.uq.edu.au/primo-explore/lib/scsss.tar.gz>
* SASS package for SandBox (pre-release) can be downloaded from [here](https://uq-edu-primo-sb.hosted.exlibrisgroup.com/primo-explore/lib/scsss.tar.gz)
* When ExLibris deployes a new release to Primo Sand Box (2-3 weeks before going to production):
  * In primo-sand-box branch: update SASS package to use latest from Primo Sand Box, might require a merge of overrides
  * Test/verify customisations are not broken
* New SASS package to be merged with any styling customisations

## Primo sand box

New Primo UI is in active development. All releases are scheduled by ExLibris and are available in Primo Sand Box a couple of weeks before going to production.

* New Primo UI SB 61UQ_DEV view is configured/customised with uqlibrary-reusable-components#primo-sand-box
* Merge uqlibrary-reusable-components#primo-sand-box into master VERY CAREFULLY (view_package contents are referencing sandbox assets - ALWAYS check the branchName value is correct (matches the current branch) in view_package/js/custom.js before pushing)
* [Primo SB BO](https://uq-edu-primo-sb.hosted.exlibrisgroup.com:1443/primo_publishing/admin/acegilogin.jsp)
* [Primo SB 61UQ_DEV](https://uq-edu-primo-sb.hosted.exlibrisgroup.com/primo-explore/search?sortby=rank&vid=61UQ_DEV)
* [Primo SB Default View](https://uq-edu-primo-sb.hosted.exlibrisgroup.com/primo-explore/search?sortby=rank&vid=61UQ_DEV_LOGIN)

## Primo release notes/dev notes

* ExLibris Primo release notes [here](https://knowledge.exlibrisgroup.com/Primo/Release_Notes)
* Community Primo dev notes [here](https://docs.google.com/document/d/1pfhN1LZSuV6ZOZ7REldKYH7TR1Cc4BUzTMdNHwH5Bkc/edit#)
* Community Primo cookbook notes [here](https://docs.google.com/document/d/1z1D5II6rhRd2Q01Uqpb_1v6OEFv_OksujEZ-htNJ0rw/edit#heading=h.ti1szv6s9yu0)

## Alma skin customisation

some items in Primo UI are embedded from Alma as iframes and styling has to be applied to Alma skin in Alma back office (see Primo's notes)
Alma skin/css has been customised, but there's not way currently to run Alma current/new skin in parallel (one possible solution is to create a new Alma skin just for a new Primo UI, have a separate view in Primo for a new Primo UI and apply new skin to new Primo view - too much overhead for a little benefit)

*Solution (as discussed with SvG): wait until new Primo UI is production live and old Primo UI is not in use anymore and update the skin for new UI only.*

## Miscellaneous

To make a link that forces login, prepend the link with:

<https://search.library.uq.edu.au/primo-explore/login?vid=61UQ&targetURL=...>

eg [Link to Saved Items](https://search.library.uq.edu.au/primo-explore/login?vid=61UQ&targetURL=https%3A%2F%2Fsearch.library.uq.edu.au%2Fprimo-explore%2Ffavorites%3Fvid%3D61UQ%26lang%3Den_US%C2%A7ion%3Ditems)

[This repo](https://github.com/mehmetc/primo-extract) may be useful if we ever have to get into the depths of Primo Angular - it gives access to the sourcemaps of Primo Angular code.

## Developing

Stacey is likely to ask for various changes to be done in various environments.

There are 6 basic environments:


| Primo Environment Name | Primo Url        | Git&nbsp;Branch&nbsp;Name  | Notes |
| ---------------------- | ---------------- | --------------- | ---- |
| prod | [search.library.uq.edu.au](https://search.library.uq.edu.au/primo-explore/search?vid=61UQ&sortby=rank) with vid=61UQ | `production` | live, public primo |
| prod-dev | [search.library.uq.edu.au](https://search.library.uq.edu.au/primo-explore/search?sortby=rank&vid=61UQ_DEV) with vid=61UQ_DEV | `primo-prod-dev` | development on the live server |
| prod-otb | [search.library.uq.edu.au](https://search.library.uq.edu.au/primo-explore/search?sortby=rank&vid=61UQ_DEV_LOGIN) with vid=61UQ_DEV_LOGIN | - | Blue out of the box primo in the prod environment - it would be very unusual for us to make changes to this |
| sandbox | [uq-edu-primo-sb.hosted.exlibrisgroup.com](https://uq-edu-primo-sb.hosted.exlibrisgroup.com/primo-explore/search?vid=61UQ&sortby=rank) with vid=61UQ | `primo-sand-box` | sandbox area |
| sandbox-dev | [uq-edu-primo-sb.hosted.exlibrisgroup.com](https://uq-edu-primo-sb.hosted.exlibrisgroup.com/primo-explore/search?vid=61UQ_DEV&sortby=rank) with vid=61UQ_DEV | <nobr>`primo-sand-box-dev`</nobr> | sandbox dev area |
| sandbox-otb | [uq-edu-primo-sb.hosted.exlibrisgroup.com](https://uq-edu-primo-sb.hosted.exlibrisgroup.com/primo-explore/search?vid=61UQ_DEV_LOGIN&sortby=rank) | - | sandbox out of the box - it would be very unusual for us to make changes to this |

The branch is set in [applications/primo2/view_package/custom.js](https://github.com/uqlibrary/uqlibrary-reusable-components/blob/master/applications/primo2/view_package/js/custom.js) - [more info](https://github.com/uqlibrary/uqlibrary-reusable-components/blob/master/applications/primo2/view_package/README.md)

### Workflow

Stacey sometimes asks for different changes in different environments so she can demonstrate the differences to WAG (Web Advisory Group). This may mean changes to the package that gets uploaded to Primo or it may mean changes to the js & css that is called from assets.library.uq.edu.au, or both.

Here is a workflow that covers both of these:

* Start by making sure the branch you are altering is up to date:
  * Merge master into the branch eg `primo-sand-box-dev`
  * Correct branch name to match current branch name in `applications/primo2/view_package/js/custom.js` & commit
* Do development:
  * Make changes
  * [Upload package](https://github.com/uqlibrary/uqlibrary-reusable-components/blob/master/applications/primo2/view_package/README.md) to back office if an angular change
  * Push to github if an assets.library element changes (and also at appropriate times to record any angular changes)
* Eventually, get acceptance from stacey that she wants it live - now you need to put any changes to the primo package in the 3 other environments, so they all match
* For each of the 3 other branches (where there is an change to the primo package):
  * Merge in, preferably from master
  * Change the branch name in `custom.js` (NOTE: for prod branch just use a single slash e.g var branchName = '/';)
  * Recommit
  * Upload the package (if angular changes involved)
  * Push (to make a polymer changes live, or to store an angular change)

Its very tedious and involves a lot of changing the branch name back and forth :(

*Key Item!!*: always make sure to commit the correct branch name in `custom/custom.js` before you push to github!!!!

## Alma Styling

Parts of the primo pages are inside iframes, eg the 'Get It' block. This means our main custom-styles.css file wont affect it.

Ex libris provides a _second_ css upload that can be used to control the styling inside the iframes.

Workflow:

1. make your changes
- Choose your workarea (eg [primo sandbox dev](https://uq-edu-primo-sb.hosted.exlibrisgroup.com/primo-explore/search?vid=61UQ_DEV&sortby=rank) )
- In the inspect panel, edit the css source file at AlmagetitMashupiframe > uq-psb.alma.exlibrisgroup.com > view > branding_skin > css > mashup_new.css until you are happy with the result
2. create the package for upload
- Copy your changes to mashup_new.scss here
- Run  `gulp almastyles` to create the .css files from the .scss files
- Run `gulp almazip` to create upload.zip, containing the updates files
3. upload the package to alma
- Login to the Alma back office, then visit [https://uq-psb.alma.exlibrisgroup.com/infra/action/pageAction.do...](https://uq-psb.alma.exlibrisgroup.com/infra/action/pageAction.do?xmlFileName=configuration_setup.configuration_mngUXP.xml&almaConfiguration=true&pageViewMode=Edit) and choose 'General' in the sidebar, look for 'User Interface Settings' heading and then click 'Delivery System Skins'
- Upload the .zip file
- Reload the primo sandbox page and confirm your changes worked

There are 2 gulp tasks for this process:

- `gulp almastyles`, will build the .scss files at applications/primo2/alma/brianding_skin/css into .css files
-  `gulp almazip`, will build a zip file ready to be uploaded to alma

The upload is done in Alma back office. Paths are:

- [sandbox](https://uq-psb.alma.exlibrisgroup.com/infra/action/pageAction.do?xmlFileName=configuration_setup.configuration_mngUXP.xml&almaConfiguration=true&pageViewMode=Edit) and choose 'General' in the sidebar and then clock 'Delivery System Skins' under User Interface Settings
- [prod](https://uq.alma.exlibrisgroup.com/SAML)

(if you cant access this page ask Stacey for access, or she may want to do the upload herself)
