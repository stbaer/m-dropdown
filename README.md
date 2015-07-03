# m-dropdown [![Dependency Status][daviddm-url]][daviddm-image]

[![unstable](http://badges.github.io/stability-badges/dist/unstable.svg)](http://github.com/badges/stability-badges)

> Lightweight dropdown menu

## Install
```sh
$ npm install m-dropdown
```
[![NPM](https://nodei.co/npm/m-dropdown.png?downloads=true)](https://nodei.co/npm/m-dropdown/)

## Usage

```html
<div class="m-dropdown">
  <button data-m-toggle="dropdown">
    Dropdown
    <span class="m-caret"></span>
  </button>
  <ul class="m-dropdown-menu">
    <li><a href="#">Option 1</a></li>
    <li><a href="#">Option 2</a></li>
    <li><a href="#">Option 3</a></li>
    <li><a href="#">Option 4</a></li>
  </ul>
</div>
```

### Browserify

```js
var mDropdown = require('m-dropdown');

mDropdown.initialize();
```

### Build a standalone version

```sh
# Creates dist/browser.js
$ npm run browser
```

## Contribute or Report Issue
For bugs and feature requests, [please create an issue][issue-url].

## License

MIT © [Steffen Bär](https://github.com/stbaer)

[issue-url]: https://github.com/stbaer/m-dropdown/issues
[daviddm-url]: https://david-dm.org/stbaer/m-dropdown.svg?theme=shields.io
[daviddm-image]: https://david-dm.org/stbaer/m-dropdown
