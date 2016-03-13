# m-dropdown

> Lightweight dropdown menu ( minified and gzipped ~ 1.5 kB js ) - [Examples](http://stbaer.github.io/m-dropdown/)

## Install

```sh
$ npm i m-dropdown
```

## Usage

**HTML**

```html
<div class="m-dropdown">
  <button data-m-toggle="dropdown">Dropdown toggle</button>
  <ul class="m-dropdown-menu">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>...</li>
  </ul>
</div>
```

**JS**

- Browserify:

```js
var mDropdown = require('m-dropdown');

// initialize all dropdowns
mDropdown.initialize();
// destroy all dropdowns
mDropdown.destroyAll();

var dropdownToggleElement = document.querySelector(/* toggle button selector */);

// initialize a single dropdown
mDropdown.init(dropdownToggleElement);
// toggle a single dropdown
mDropdown.toggle(dropdownToggleElement);
// destroy a single dropdown
mDropdown.destroy(dropdownToggleElement);

// close opened dropdowns if there are any
mDropdown.closeAll();
```

- Standalone:

    Include the standalone version from the dist folder instead of *require('m-dropdown')*

### Build

**Install devDependencies**
```sh
$ npm i
```

**Build & run the example**
```sh
$ npm start
```

## Contribute or Report Issue
For bugs and feature requests, [please create an issue][issue-url].

Pull requests should target the develop branch.

## License

MIT © [Steffen Bär](https://github.com/stbaer)

[issue-url]: https://github.com/stbaer/m-dropdown/issues
