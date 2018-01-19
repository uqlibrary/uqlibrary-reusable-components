# UQLAPP, Exams

- UQLAPP URL: https://app.library.uq.edu.au/#/
- no development environment, but possible to create if required, all applications are managed by UQL

Used in files:
- UQLAPP frontend: https://app.library.uq.edu.au/ at frontend/app/index.html
- Exams: https://www.library.uq.edu.au/exams/

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

Historically, this also supplied components for:

- FBS: public/lib/Template.class.php (deprecated, replaced by bookit)
- Librarian Contacts System: contacts/librarians/index.html (deprecated, replaced by drupal: https://web.library.uq.edu.au/library-services/liaison-librarians
- ACDB (https://www.library.uq.edu.au/acdba.html) : now uses core reusable componets elements as it is in uqlibrary-pages
