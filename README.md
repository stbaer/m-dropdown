# m-dropdown [![Dependency Status][daviddm-url]][daviddm-image]

[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

> Lightweight dropdown menu ( minified and gzipped ~ 1 kB js / 0.4 kB css ) - [Examples](http://stbaer.github.io/m-dropdown/)

## Install

```sh
$ npm i m-dropdown
```
[![NPM](https://nodei.co/npm/m-dropdown.png?downloads=true)](https://nodei.co/npm/m-dropdown/)

## Usage

**HTML**

```html
<div class="m-dropdown">
  <button data-m-toggle="dropdown">
    Dropdown toggle<span class="m-caret"></span>
  </button>
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
var mDropdown = require('m-dropdown'); //*

// initialize all dropdowns
mDropdown.initialize();
// destroy all dropdowns
mDropdown.destroyAll();

var singleDropdownToggleElement = document.querySelector(/* toggle button selector */);

// initialize a single dropdown
mDropdown.init(singleDropdownToggleElement);
// destroy a single dropdown
mDropdown.destroy(singleDropdownToggleElement);
```
- Standalone:

    include *dist/m-dropdown.min.js* - this exposes mDropdown. Use like above without the require statement.
    See *index.html*.

**CSS**

 *dist/css/m-dropdown.min.css* includes the basic styles, extend as needed.

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
[daviddm-url]: https://david-dm.org/stbaer/m-dropdown.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/stbaer/m-dropdown
