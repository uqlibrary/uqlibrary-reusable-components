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

No changes are expected to be done to the package. All updates to be done in reusable-components/applications/primo2/*.(scss|js)

Exceptions:
- initial reusable injection

## Package deployment

- 'view_package' directory should be renamed to a name of desired view (eg 61UQ for production view, 61UQ_DEV for development, etc) 
- eg.

  `$ cp -r ~/uqlibrary-reusable-components/applications/primo2/view_package/ ~/61UQ_DEV`
- make sure there are no hidden files (eg .idea, .git, etc)
- create a zip named after the Primo view, eg 61UQ_DEV view will have 61UQ_DEV.zip

  `$ zip -r 61UQ_DEV.zip 61UQ_DEV`

- OSX? Also run

  `$ zip -d 61UQ_DEV.zip \*.DS_Store`

  to remove the .ds_store file, automatically created by the zipping process on mac.
- upload zip to Promo BO ([Prod](https://primo-direct-apac.hosted.exlibrisgroup.com:1443/primo_publishing/admin/acegilogin.jsp) or [Sandbox](https://uq-edu-primo-sb.hosted.exlibrisgroup.com:1443/primo_publishing/admin/acegilogin.jsp)) to corresponding view:
  - in menu `Deploy & Utilities -> Customization Manager`  
  - select view, eg 61UQ_DEV
  - upload package for `View Name` - choose and upload zip-file
  - briefly announce to Stacey (or Eric in her absence) that you are about to deploy (Slack will do) for the rare case of conflict (if they arent at their desks then its very unlikely they are deploying) (Around 8am and 8pm each day Prmo will be doing a 'hotswap'
   and deploys will normally fail. Just wait.)
  - once file is uploaded, click the `Deploy` button

## Primo dev environment

Try setting up local environment following this: https://github.com/ExLibrisGroup/primo-explore-devenv














