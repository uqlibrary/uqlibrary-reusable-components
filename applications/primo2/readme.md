# PRIMO2 Customisations

- New Primo UI URL (master branch): https://search.library.uq.edu.au/primo-explore/search?vid=61UQ_DEV


## Theming for new Primo UI includes:

- view_package - [readme](https://github.com/uqlibrary/uqlibrary-reusable-components/blob/master/applications/primo2/view_package/README.md)
- load.js - injects polymer components into Primo after Primo's javascript has loaded
- custom.scss - compiles styles from www (Primo's SCSS package) and customisations in `styles-imports`

## Primo release notes/dev notes

- ExLibris Primo release notes [here](https://knowledge.exlibrisgroup.com/Primo/Release_Notes)
- Community Primo dev notes [here](https://docs.google.com/document/d/1pfhN1LZSuV6ZOZ7REldKYH7TR1Cc4BUzTMdNHwH5Bkc/edit#)
- Community Primo cookbook notes [here](https://docs.google.com/document/d/1z1D5II6rhRd2Q01Uqpb_1v6OEFv_OksujEZ-htNJ0rw/edit#heading=h.ti1szv6s9yu0)

## Alma skin customisation

some items in Primo UI are embedded from Alma as iframes and styling has to be applied to Alma skin in Alma back office (see Primo's notes)
Alma skin/css has been customised, but there's not way currently to run Alma current/new skin in parallel (one possible solution is to create a new Alma skin just for a new Primo UI, have a separate view in Primo for a new Primo UI and apply new skin to new Primo view - too much overhead for a little benefit)

*Solution (as discussed with SvG): wait until new Primo UI is production live and old Primo UI is not in use anymore and update the skin for new UI only.*


  
  
