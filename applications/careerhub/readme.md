#Studenthub (aka Careerhub)  Customisation

A third party product that we are theming to match the general library theme.

Current area is the [Library Staff Development workgroup portal](https://studenthub.uq.edu.au/workgroups/library-staff-development/events/). We are theming this by putting our polymer reusable elements in the top of the body of the page via a GUI editor.

*Editing in the studenthub GUI interface does not return all the html lines that were supplied*, so start with the code block below - dont try to edit in place in the GUI.

Method to edit the theme:

- Decide what changes are needed and update below
- Visit the theme edit page [current link](https://www.studenthub.uq.edu.au/Admin/SubSites/Layout.aspx?id=14) or: login > left hand menu, click on Work Groups > centre block, click on name of Work Group > right hand menu, click on Work group settings > middle area, click on Layout
- Click on the word '(text)' in the header of the example-layout (if this isnt available, drag the 'text' item from
the layout options into the header field, then click)
- Click on the angle bracket icon ('<>') - a very short area will load with white markup on a black background. This is the editing area
- Select the current markup and delete (the GUI does not return everything we provide them)
- Paste in the markup from below
- Click OK
- Reload the workgroup portal page to confirm (the change should be instant)

Code to include in the GUI editor (keep this up to date as it can't be reviewed reliably in the GUI):

        <meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0">
        <script src="//assets.library.uq.edu.au/reusable-components/resources/preloader.js" async></script>
        <script src="//assets.library.uq.edu.au/reusable-components/webcomponentsjs/webcomponents-lite.js" async></script>
        <link rel="import" href="//assets.library.uq.edu.au/reusable-components/elements.vulcanized.html" async>    
        <script src="//assets.library.uq.edu.au/reusable-components/careerhub/load.js" async></script>
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
        <link rel="stylesheet" href="//assets.library.uq.edu.au/reusable-components/careerhub/custom-styles.css">

Notes:

* Careerhub have said they will put the meta viewport line in the template. It hasnt appeared yet - if it does, this line can be removed here
* Material design icons are being used, so the font family is included
