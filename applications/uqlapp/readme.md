#UQLAPP, FBS, Contacts, Exams, ACDB

Used in files:
- UQLAPP: frontend/app/index.html
- FBS: public/lib/Template.class.php
- Contacts: contacts/librarians/index.html
- Exams: help.html, search.html and eep.inc.php
- ACDB (https://www.library.uq.edu.au/acdba.html) : /usr/local/apache/uqlapi/auth/common1.inc (reusable_copyright_header function)

Include the following:

        <link type="image/x-icon" rel="shortcut icon" href="//assets.library.uq.edu.au/reusable-components/resources/favicon.ico"> 
        <script src="//assets.library.uq.edu.au/reusable-components/resources/preloader.js" async></script>
        <script src="//assets.library.uq.edu.au/reusable-components/webcomponentsjs/webcomponents-lite.js" async></script>
        <link rel="import" href="//assets.library.uq.edu.au/reusable-components/elements.vulcanized.html" async>
        
        <script src="//assets.library.uq.edu.au/reusable-components/uqlapp/load.js" async></script>
        <link rel="stylesheet" href="//assets.library.uq.edu.au/reusable-components/uqlapp/custom-styles.css" />
        
##### ACDB (https://www.library.uq.edu.au/acdba.html)

then in the /var/www/www.library.uq.edu.au/public_html/get-reusable.php file, call the following php function:

                reusable_copyright_header();