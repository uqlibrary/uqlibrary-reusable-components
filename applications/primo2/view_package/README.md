# The New Primo UI Customization Package

## Package documentation

The development package allows you to configure :

- css
  - no customisation to be done in custom.css
  
- images includes
  - favicon.ico 
  
- html
  - landing page to contain NO elements

- JavaScript
  - reusable components are injected by custom.js
  - Browzine components injected

No changes are expected to be done to the package. All updates to be done in reusable-components/applications/primo2/*.(scss|js)

Exceptions:
- initial reusable injection
- add Browzine code (which is Angular; we cant do it in our Polymer conpomnents)

## Package deployment

- 'view_package' directory should be renamed to a name of desired view (eg 61UQ for production view, 61UQ_DEV for development, etc) 
- eg. `$cp -r ~/uqlibrary-reusable-components/applications/primo2/view_package/ ~/61UQ_DEV`
- make sure there are no hidden files (eg .idea, .git, etc)
- create a zip named after the Primo view, eg 61UQ_DEV view will have 61UQ_DEV.zip `$ zip -r 61UQ_DEV.zip 61UQ_DEV`
- also run `$ zip -d 61UE_DEV.zip \*.DS_Store` to remove the ds_dtore file, automatically created by the zipping process on mac.
- upload zip to Promo BO to corresponding view:
  - in menu `Deploy & Utilities -> Customization Manager`  
  - select view, eg 61UQ_DEV
  - upload package for `View Name` - choose and upload zip-file
  - once file is uploaded, click `Deploy` button

## Primo dev environment

Try setting up local environment following this: https://github.com/ExLibrisGroup/primo-explore-devenv














