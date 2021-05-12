# PRIMO2 Customisations

## REPOSITORY RELOCATED

Future work on the contents of this directory is being done elsewhere. Please do not make any more modifications here.

* The custom styles for Primo views (`custom-styles.scss` and everything that is imported by it) has moved to <https://github.com/uqlibrary/reusable-webcomponents/tree/master/src/applications/primo>
* The view package and alma styles have moved to <https://github.com/uqlibrary/exlibris-primo/>.

---

## Overview

UQ Library is a Hosted Multi-Tenant Customer of Ex Libris (the alternative is to be an On-Premises Customer).

Primo is managed by the Library's "Discovery and Access Coordinator", referred to below as DAC. This is currently Stacey van Groll.

There are 6 basic environments:

| Primo Environment Name | Primo Url        | Git&nbsp;Branch&nbsp;Name  | Notes |
| ---------------------- | ---------------- | --------------- | ---- |
| prod | [search.library.uq.edu.au](https://search.library.uq.edu.au/primo-explore/search?vid=61UQ&sortby=rank) (ie vid=61UQ) | `production` | live, public primo |
| prod-dev | [search.library.uq.edu.au](https://search.library.uq.edu.au/primo-explore/search?sortby=rank&vid=61UQ_DEV) (ie vid=61UQ_DEV) | `primo-prod-dev` | development on the live server |
| prod-dac | [search.library.uq.edu.au](https://search.library.uq.edu.au/primo-explore/search?sortby=rank&vid=61UQ_DAC) (ie vid=61UQ_DAC) | (uses prod) | DAC's personal area. Keep it up to date with the others - deploy prod-dev changes here |
| prod-otb | [search.library.uq.edu.au](https://search.library.uq.edu.au/primo-explore/search?sortby=rank&vid=61UQ_DEV_LOGIN) (ie vid=61UQ_DEV_LOGIN) | - | Blue out of the box primo in the prod environment - it would be very unusual for us to make changes to this |
| sandbox | [uq-edu-primo-sb.hosted.exlibrisgroup.com](https://uq-edu-primo-sb.hosted.exlibrisgroup.com/primo-explore/search?vid=61UQ&sortby=rank) (ie vid=61UQ) | `primo-sand-box` | sandbox area |
| sandbox-dev | [uq-edu-primo-sb.hosted.exlibrisgroup.com](https://uq-edu-primo-sb.hosted.exlibrisgroup.com/primo-explore/search?vid=61UQ_DEV&sortby=rank) (ie vid=61UQ_DEV) | `primo-sand-box-dev` | sandbox dev area |
| sandbox-dac | [uq-edu-primo-sb.hosted.exlibrisgroup.com](https://uq-edu-primo-sb.hosted.exlibrisgroup.com/primo-explore/search?vid=61UQ_DAC&sortby=rank) (ie vid=61UQ_DAC) | (uses primo-sand-box) | DAC's personal area. Keep it up to date with the others - deploy sandbox-dev changes here |
| sandbox-otb | [uq-edu-primo-sb.hosted.exlibrisgroup.com](https://uq-edu-primo-sb.hosted.exlibrisgroup.com/primo-explore/search?vid=61UQ_DEV_LOGIN&sortby=rank) (ie vid=61UQ_DEV_LOGIN) | - | sandbox out of the box - it would be very unusual for us to make changes to this |

The branch is set in [applications/primo2/view_package/custom.js](https://github.com/uqlibrary/uqlibrary-reusable-components/blob/master/applications/primo2/view_package/js/custom.js) (and of course there is the `master` branch, but this does not map to any of the live environments)

Primo UI is in active development. All releases are scheduled by ExLibris and are available in Primo Sand Box a couple of weeks before going to production.

## Theming for new Primo UI

Styling of primo pages is done by editing `/applications/primo2/custom-styles.scss`. While you _can_ dig deeper into the scss files, its not recommended (it makes maintenance harder, not easier).

* Customisation package `/view_package/*` - [readme](https://github.com/uqlibrary/uqlibrary-reusable-components/blob/master/applications/primo2/view_package/README.md)
* `load.js` - Any custom scripts
* `custom.scss` - Compiles styles from `/www/*` (Primo's SCSS package) and customisations in `/styles-imports/*`

See also notes on Alma Styling, below.

## Styling guidelines

* All global overrides (eg fonts, colours, etc found in uqlibrary-styles) to be updated in Primo's SASS package
  * `/www/styles/main.scss` - Contains a list of SCSS imports
  * Any global overrides of a partial to be copied to `styles-imports/www` (variables example below):
    * Global variables(colours) override is imported from `@import "../../styles-imports/www/variables";`
    * Original variables import is kept in the `main.scss` for reference `//@import "partials/variables";`
  * Keep overrides to a minimum
* All local customisations/fixes to be done in `reusable-components/applications/primo2/custom-styles.scss`
* SASS package can be downloaded from <https://search.library.uq.edu.au/primo-explore/lib/scsss.tar.gz>
* SASS package for SandBox (pre-release) can be downloaded from [here](https://uq-edu-primo-sb.hosted.exlibrisgroup.com/primo-explore/lib/scsss.tar.gz)
* When ExLibris deploys a new release to Primo Sand Box (2-3 weeks before going to production):
  * In primo-sand-box branch: update SASS package to use latest from Primo Sand Box, might require a merge of overrides
  * Test/verify customisations are not broken
* New SASS package to be merged with any styling customisations

[Primo SandBox Back Office](https://uq-edu-primo-sb.hosted.exlibrisgroup.com:1443/primo_publishing/admin/acegilogin.jsp)

## Primo release notes/dev notes

* [ExLibris Primo release notes](https://knowledge.exlibrisgroup.com/Primo/Release_Notes)
* [Community Primo dev notes](https://docs.google.com/document/d/1pfhN1LZSuV6ZOZ7REldKYH7TR1Cc4BUzTMdNHwH5Bkc/edit#)
* [Community Primo cookbook notes](https://docs.google.com/document/d/1z1D5II6rhRd2Q01Uqpb_1v6OEFv_OksujEZ-htNJ0rw/edit#heading=h.ti1szv6s9yu0)

## Development Workflow

DAC sometimes asks for different changes in different environments (see table, above) so WAG (Web Advisory Group) can compare the differences. For example she may want Change A in primo-sand-box-dev and Change B in primo-prod-dev.

You might change the package that gets uploaded to Primo if it is angular changes or you might change the js & css that is called from assets.library.uq.edu.au, or both.

Here is a workflow that covers both of these:

* Start by making sure the branch you are altering is up to date:
  * Merge master into the branch eg `primo-sand-box-dev`
* Do development:
  * Make changes
  * [Upload package](https://github.com/uqlibrary/uqlibrary-reusable-components/blob/master/applications/primo2/view_package/README.md) to back office if an angular change
  * Push to github if an assets.library element changes (and also at appropriate times to record any angular changes)
* Eventually, get acceptance from DAC that she wants it live - now you need to put any changes to the primo package in the 3 other environments, so they all match
* For each of the 3 other branches (where there is an change to the primo package):
  * Merge in, preferably from master
  * Recommit
  * if angular changes involved, [Zip](https://github.com/uqlibrary/uqlibrary-reusable-components/blob/master/applications/primo2/view_package/README.md) and Upload the package
  * Push (to make a polymer changes live, or to store an angular change)

One useful technique to avoid lots of commits and codeship builds is to edit the css in the browser by Inspecting and editing the source file at assets.library.uq.edu.au > reusable-components > primo2 > custom-styles.css, then paste your changes into the custom_styles.scss file in this repo. (Alchemy is a useful Chrome extension for unpacking vulcanized css)

The command `gulp styles` will let you create the required .css file from the .scss for a final check prior to commit. (Paste it back into the browser)

## Alma Styling

Parts of the Primo pages are inside iframes, eg the 'Get It' block on the full display page. This means our main custom-styles.css file wont affect it.

Ex libris provides a _second_ css upload that can be used to control the styling inside the iframes.

### Workflow

1. Make your changes
    1. Choose your workarea (eg [primo sandbox dev](https://uq-edu-primo-sb.hosted.exlibrisgroup.com/primo-explore/search?vid=61UQ_DEV&sortby=rank) )
    1. In the inspect panel, edit the css source file at AlmagetitMashupiframe > uq-psb.alma.exlibrisgroup.com > view > branding_skin > css > mashup_new.css until you are happy with the result

1. Create the zip for upload

    1. Checkout the appropriate branch
    1. Copy your changes to mashup_new.scss at applications/primao2/alma/branding_skin/css/
    1. Run  `gulp almastyles` to create the .css files from the .scss files (probably worth checking the genrated css works by pasting it back into the inspect window in the browser)
    1. Run `gulp almazip` to create branding_skin.zip, containing the updates files

1. Upload the zip to alma

    1. Login to the Alma back office (links below), then visit the configuration page (click on the Cog) and choose 'General' in the sidebar, look for 'User Interface Settings' heading and then click 'Delivery System Skins'. Check with DAC which skin to update if it is unclear.
    1. Upload the .zip file (there is no rebuild process here)
    1. Reload the primo sandbox page and confirm your changes worked
    1. commit your changes

There are 2 gulp tasks for this process:

* `gulp almastyles`, will build the .scss files at applications/primo2/alma/branding_skin/css into .css files
* `gulp almazip`, will build a zip file ready to be uploaded to alma

The upload is done in Alma back office. Paths are:

* [Sandbox Alma Back Office](https://uq-psb.alma.exlibrisgroup.com/mng/action/home.do)
* [Prod Alma Back Office](https://uq.alma.exlibrisgroup.com/SAML)

(if you cant access Alma Back Office Config, ask DAC for access, or she may want to do the upload herself)

## Miscellaneous

1. To make a link that forces login, prepend the link with:

    <https://search.library.uq.edu.au/primo-explore/login?vid=61UQ&targetURL=...>

    e.g.: [Link to Saved Items](https://search.library.uq.edu.au/primo-explore/login?vid=61UQ&targetURL=https%3A%2F%2Fsearch.library.uq.edu.au%2Fprimo-explore%2Ffavorites%3Fvid%3D61UQ%26lang%3Den_US%C2%A7ion%3Ditems)

2. [This repo](https://github.com/mehmetc/primo-extract) may be useful if we ever have to get into the depths of Primo Angular - it gives access to the sourcemaps of Primo Angular code.
