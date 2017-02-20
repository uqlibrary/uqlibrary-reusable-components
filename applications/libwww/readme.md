#### UQ Drupal Customisation

UQ Drupal URL: https://web.library.uq.edu.au
No development environment

UQ ITS is managing UQ Drupal library's CMS (web.library.uq.edu.au). Any components to be used in UQ Drupal require registration within UQ Drupal.

        <html manifest="//assets.library.uq.edu.au/reusable-components/libwww/reusable-components.appcache">

        <script type="text/javascript" src="//www.library.uq.edu.au/js/ims.js"></script>
        <script type="text/javascript" src="//assets.library.uq.edu.au/reusable-components/resources/preloader.js"></script>
        <script type="text/javascript" src="//assets.library.uq.edu.au/reusable-components/webcomponentsjs/webcomponents-lite.js"></script>
        <script type="text/javascript" src="//assets.library.uq.edu.au/reusable-components/libwww/load.js"></script>
        <link rel="import" href="//assets.library.uq.edu.au/reusable-components/elements.vulcanized.html" async>
        <link rel="stylesheet" href="//assets.library.uq.edu.au/reusable-components/libwww/custom-styles.css" />
                
        

reusable-components.appcache is a manifest file which contains a list of files that can be cached by a browser. Application cache file has a version number which signals to a browser that cached files were updated. Version is updated automatically at deployment time. 
