# PRIMO Customisations

THIS VERSION OF PRIMO IS DEPRECATED - SEE [NEW PRIMO](https://github.com/uqlibrary/uqlibrary-reusable-components/tree/master/applications/primo2) FOR CURRENT DOCS

- Primo URL: <https://search.library.uq.edu.au>
- Development environment (master branch): <https://search.library.uq.edu.au/primo_library/libweb/action/search.do?vid=61UQ_DEV>

Primo includes static_html/footer.html on every page which loads all UQL styling and JavaScript.
footer.html is uploaded to Primo Back Office via File Uploader to 61UQ view (production).

Primo static_html/footer.html to include following:

```html
<link
  type="image/x-icon"
  rel="shortcut icon"
  href="//assets.library.uq.edu.au/reusable-components/resources/favicon.ico"
/>
<script
  src="//assets.library.uq.edu.au/reusable-components/resources/preloader.js"
  async
></script>
<script
  src="//assets.library.uq.edu.au/reusable-components/webcomponentsjs/webcomponents-lite.js"
  async
></script>
<link
  rel="import"
  href="//assets.library.uq.edu.au/reusable-components/elements.vulcanized.html"
  async
/>

<script
  src="//assets.library.uq.edu.au/reusable-components/primo/load.js"
  async
></script>
<link
  rel="stylesheet"
  href="//assets.library.uq.edu.au/reusable-components/primo/custom-styles.css"
/>
```

## Styling for Primo iframes

When custom-styles.css is finalised, it has to be uploaded to Primo to apply styles to Primo iframes (not Alma iframes).

In Primo Back Office:

1. Upload custom-styles.css to 61UQ view via Deploy & Utilities -> File Uploader
2. In FE & Delivery -> Views List edit 61UQ view, Save & Continue all the way through, and Deploy.

To test your new CSS has been applied go to a Primo page and add attribute &wroDevMode=true to query string. This will stop CSS concat tool from merging all CSS files on server side.
More details [Primo CSS customisation](https://knowledge.exlibrisgroup.com/Primo/Product_Documentation/Technical_Guide/Customizing_Primo%E2%80%99s_User_Interface/Customizing_the_Default_CSS_File)
, [File Uploader Tool](https://knowledge.exlibrisgroup.com/Primo/Product_Documentation/Back_Office_Guide/Primo_Utilities/The_File_Uploader_Tool)
and [Debugging CSS/JS in Primo](https://knowledge.exlibrisgroup.com/Primo/Product_Documentation/Technical_Guide/Customizing_Primo%E2%80%99s_User_Interface/Debugging_CSS_and_JavaScript)

## Styling for Alma iframes

1. Login to <https://uq.alma.exlibrisgroup.com/SAML>
1. Go to Alma > Administration > General Configuration > General Configuration Menu
1. Select Delivery System Skins
1. Select "uqskin" and click on Action->Edit
1. Download the branding_skin.zip
1. Unzip the file and uncomment and edit css class in the mashup.css as required
1. Rezip the file (remember to remove all the system hidden folders and files e.g. .Dstore)
1. Upload the zip file and Save

Then Go To Primo Back Office:

1. Go to Advanced Configuration > Mapping Tables
1. Select "Delivery" for subsystem
1. Select "Templates" and click on Edit
1. Look for "Almagetit" and "Almaviewit" and make sure they have "&req.skin=uqskin" appended
1. If they dont, append the text and click Save and Deploy.

On the search result page, confirm the settings have been applied correctly:

1. Check the iframe src, it shall have "&req.skin=uqskin" appended
1. Check in the header section, it shall load the mashup.css from the uqskin:

```html
<link
  href="/view/branding_skin/css/mashup.css?skinName=uqskin&version=June2016&skinVersion=1466583814&customerId=3130&institutionId=3131"
  rel="stylesheet"
  type="text/css"
/>
```

## Miscellaneous

To make a link that forces login, prepend the link with:

`http://search.library.uq.edu.au/primo_library/libweb/action/login.do?loginFn=signin&vid=61UQ&targetURL=...`

eg [Link to Saved Searches](http://search.library.uq.edu.au/primo_library/libweb/action/login.do?loginFn=signin&vid=61UQ&targetURL=http%3A%2F%2Fsearch.library.uq.edu.au%2Fprimo_library%2Flibweb%2Faction%2Fquery.do%3Ffn%3Ddisplay%26vid%3D61UQ)
