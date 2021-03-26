# SpringShare Customisation

## LibGuides

* LibGuides URL: <https://guides.library.uq.edu.au>

Include the following code in Custom JS/CSS Code in LibGuides configuration at <https://uq.libapps.com/libguides/lookfeel.php?action=1>:

```html
<link type="image/x-icon" rel="shortcut icon" href="//assets.library.uq.edu.au/reusable-components/resources/favicon.ico">
<script src="//assets.library.uq.edu.au/reusable-components/resources/preloader.js" async></script>
<script src="//assets.library.uq.edu.au/reusable-components/webcomponentsjs/webcomponents-lite.js" async></script>
<link rel="import" href="//assets.library.uq.edu.au/reusable-components/elements.vulcanized.html" async>
<script src="//assets.library.uq.edu.au/reusable-components/libapps/load.js" async></script>
<link rel="stylesheet" href="//assets.library.uq.edu.au/reusable-components/libapps/libguides/custom-styles.css" />
```

Customisation of groups shall be done the same way as custom-styles, example:how-to-find-group.css

```html
<link rel="stylesheet" href="//assets.library.uq.edu.au/reusable-components/libapps/libguides/how-to-find-group.css" />
```

(Dana has a repo of styling at <https://github.com/uqlibrary/libguides-local>)

## LibWizard

LibWizard is a Springshare product which allows users to create quizzes (and forms generally)

Login at <https://uq.libapps.com/> Lots of people have admin to add users - Jake, Nick, Rob, Eric...

libwizard.js is inserted here: <https://uq.libwizard.com/admin/settings>

This appears on pages like <https://uq.libwizard.com/f/APA6-referencing-quiz> which popsup on pages like <https://guides.library.uq.edu.au/referencing/apa6#s-lg-box-21298070>

## LibAnswers - replaced by Rightnow

* LibGuides URL: <https://answers.library.uq.edu.au>
* Development environment (master branch): <https://answers.library.uq.edu.au/test>

Include this code in Custom JS/CSS Code in LibAnswers configuration

```html
<link type="image/x-icon" rel="shortcut icon" href="//assets.library.uq.edu.au/reusable-components/resources/favicon.ico">
<script src="//assets.library.uq.edu.au/reusable-components/resources/preloader.js" async></script>
<script src="//assets.library.uq.edu.au/reusable-components/webcomponentsjs/webcomponents-lite.js" async></script>
<link rel="import" href="//assets.library.uq.edu.au/reusable-components/elements.vulcanized.html" async>
<script src="//assets.library.uq.edu.au/reusable-components/libapps/load.js" async></script>
<link rel="stylesheet" href="//assets.library.uq.edu.au/reusable-components/libapps/libanswers/custom-styles.css" />
```

## LibCal

* LibCal URL: <https://calendar.library.uq.edu.au/>

Include the following code in Custom JS/CSS Code in LibCal configuration at <https://calendar.library.uq.edu.au/admin_look.php?action=0>:

```html
<link type="image/x-icon" rel="shortcut icon" href="//assets.library.uq.edu.au/reusable-components/resources/favicon.ico">
<script src="//assets.library.uq.edu.au/reusable-components/resources/preloader.js" async></script>
<script src="//assets.library.uq.edu.au/reusable-components/webcomponentsjs/webcomponents-lite.js" async></script>
<link rel="import" href="//assets.library.uq.edu.au/reusable-components/elements.vulcanized.html" async>
<script src="//assets.library.uq.edu.au/reusable-components/libapps/load.js" async></script>
<link rel="stylesheet" href="//assets.library.uq.edu.au/reusable-components/libapps/libcal/custom-styles.css" />
```
