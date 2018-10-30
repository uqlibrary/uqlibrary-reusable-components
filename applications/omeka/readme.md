#Omeka Customisation

- Omeka URL: https://uqlibraryonlineexhibitions.omeka.net/
- No development environment


A third party product we are using for online library exhibits

Login as admin [here](https://uqlibraryonlineexhibitions.omeka.net/admin/) - user email and password are in PasswordState.

The prefered method of styling is to style [the assets css file](https://github.com/uqlibrary/uqlibrary-reusable-components/blob/master/applications/omeka/custom-styles.scss)

CSS for the homepage and items pages can also updated in the [CSS Plugin](http://uqlibraryonlineexhibitions.omeka.net/admin/plugins)
which has major restrictions, eg:

* any styling of html header and footer elements are removed!!!
* any styling of the body element is removed
* any property set to a value of 'inherit' is removed
* omeka doesnt recognise rem unit values and removes the property, so supply a px default
* the following properties are removed:
** transition
** transition-delay
** max-width
** width
** min-height
* it strips :before attributes
* any styling on a child element rewrites the '>' to \3E
* doubtless more

This means the Omeka homepage cannot have a great deal of styling - I think I've wrung everything out of it that can be done. (See below for backup of css).

The [load.js](//assets.library.uq.edu.au/reusable-components/omeka/load.js) file:

* loads the responsive meta
* applies the uq favicon
* applies the uq apple icon
* attaches the above css file
* loads the reusable components

JS is applied in the footer, which can be edited [on this page](http://uqlibraryonlineexhibitions.omeka.net/admin/exhibits/theme-config/1) (or... click on exhibits in the left hand nav, click 'edit' on the chosen exhibit, scroll down to the theme dropdown, choose the correct theme and click Configure).

Once on that page, scroll down to 'Footer Text', click the 'HTML' icon on the edit area, and update the html for the footer. Maintain the following code block as the correct code:

        <script type="text/javascript" src="//assets.library.uq.edu.au/reusable-components/omeka/load.js"></script>
        <script type="text/javascript" src="//assets.library.uq.edu.au/reusable-components/webcomponentsjs/webcomponents.js"></script>

If you have a specific theme that needs special styling, add a new class name in by adding these lines to the bottom of the footer, as above. It will add a class to the body element (base it on the theme name) - then you can write css to taregt just this theme (it will affect all exhibits that have had this classname added to the body)

        <script type="text/javascript">// <![CDATA[
          AddClassNameToBody('bigtheme');
        ]]></script>  

The UQ logo used by omeka is uq-exhibitions-logo.png and archived in this folder.

The homepage css at http://uqlibraryonlineexhibitions.omeka.net/admin/plugins/config?name=CSSEditor as at 30/10/2018:

#home {
font-family:Roboto, 'Helvetica Neue', Helvetica, Arial, sans-serif
}

#site-title {
height:100px;
background-color:#51247A;
margin-left:0;
padding-left:16px
}

#wrap {
background-color:#fff;
color:#66615D;
padding-left:1em;
padding-right:1em;
margin-left:auto;
margin-right:auto
}

@media screen and (max-width: 900px) {
#footer-text {
background-color:#51247A;
color:#d4c8de;
height:230px
}
}

a {
color:#8457AD
}