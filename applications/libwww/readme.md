# UQ Drupal Customisation

* UQ Drupal URL: <https://web.library.uq.edu.au>
* No development environment

UQ ITS is managing UQ Drupal library's CMS (web.library.uq.edu.au). Any components to be used in UQ Drupal require registration within UQ Drupal.

Note: 'test-web-components' is a temporary location

Production:
```html
<script type="text/javascript" src="https://www.library.uq.edu.au/test-web-components/uq-lib-reusable.min.js"></script>
<script type="text/javascript" src="https://assets.library.uq.edu.au/reusable-components/libwww/load.js"></script>
<link rel="stylesheet" href="https://assets.library.uq.edu.au/reusable-components/libwww/custom-styles.css" />
```

Changes on drupal can be tested on branch `feature-drupal` before going live.

Staging environment at eg https://library.stage.drupal.uq.edu.au/library-services/training
```html
<script type="text/javascript" src="https://homepage-staging.library.uq.edu.au/test-web-components/uq-lib-reusable.min.js"></script>
<script type="text/javascript" src="https://assets.library.uq.edu.au/feature-drupal/reusable-components/libwww/load.js"></script>
<link rel="stylesheet" href="https://assets.library.uq.edu.au/feature-drupal/reusable-components/libwww/custom-styles.css" />
```

(I beleive ITS have to give individual access to make library.staging visible to developers individually - I've been dealing with David Pollitt, October 2017)
