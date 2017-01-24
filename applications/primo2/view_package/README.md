
# The Primo New UI Customization Workflow Development Environment


##Package documentation

The development package allows you to configure :

- css
  - no customisation to be done in custom.css
  - all CSS changes to be done in reusable-components/applications/primo2/custom-styles.scss

- images
  - TBA
  
- html
  - TBA

- JavaScript
  - reusable components are injected by custom.js
  - TODO: investigate colour theming from [Primo hackathon](http://initiatives.exlibrisgroup.com/2016/12/primo-hackathon-open-discovery-framework-community.html) 

No changes are expected to be done to the package. All updates to be done in reusable-components/applications/primo2/*.(scss|js)

##Package deployment

- 'view_package' directory should be renamed to a name of desired view (eg 61UQ for production view, 61UQ_DEV for development, etc)
- delete any hidden filese (eg .idea, .git, etc)
- create a zip, eg 61UQ_DEV.zip
- upload zip to Promo BO, run deployment














