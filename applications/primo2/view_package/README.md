
# The Primo New UI Customization Workflow Development Environment


##Package documentation

The development package allows you to configure :

- css
  - no customisation to be done in custom.css
  - all CSS changes to be done in reusable-components/applications/primo2/custom-styles.scss
  - all global updates (eg fonts, colours, etc) to be updated in Primo's SASS package
  - SASS package can be downloaded from https://search.library.uq.edu.au/primo-explore/lib/scsss.tar.gz (check for changes after every PrimoUI update)

- images includes
  - favicon.ico 
  
- html
  - landing page to contain NO elements

- JavaScript
  - reusable components are injected by custom.js
  
No changes are expected to be done to the package. All updates to be done in reusable-components/applications/primo2/*.(scss|js)

##Package deployment

- 'view_package' directory should be renamed to a name of desired view (eg 61UQ for production view, 61UQ_DEV for development, etc)
- delete any hidden filese (eg .idea, .git, etc)
- create a zip, eg 61UQ_DEV.zip `$ zip -r 61UQ_DEV.zip 61UQ_DEV`
- upload zip to Promo BO, run deployment


##Primo dev environment

Try setting up local environment following this: https://github.com/ExLibrisGroup/primo-explore-devenv














