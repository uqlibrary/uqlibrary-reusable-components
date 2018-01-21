# User instructions

The content of the mega menu can be altered by editing the [uql-menu.json file](https://github.com/uqlibrary/uqlibrary-reusable-components/blob/master/resources/uql-menu.json)

## Json

* A `json` file must use correct json syntax [Learn more](https://www.w3schools.com/js/js_json_syntax.asp)
* Best practice is to make the order of the menu match the order of the displayed menu

## Multi Columns

Mark items to go into column 2 or column 3 of a submenu by adding the following entry to the menu item:

`"col3": "yes"`

eg

`{
    "label": "Law",
    "subtext": "Walter Harrison Library",
    "href": "https://web.library.uq.edu.au/locations-hours/law-library-walter-harrison-library",
    "col3": "yes"
}`

If neither col2 nor col3 is found, the menu is assumed to be a single column menu.

## Gotchas

* Remember that each line must be separated by a comma within the braces
* If you put a col2 entry _after_ the last col3 entry within a submenu, display weirdness may happen - don't do that...
* Be careful changing from 2-cols to 3-cols - if you change the left hand menu the placement will need adjustment as it is currently sized to push `Locations & Hours` to the left. Developers may need to make changes
