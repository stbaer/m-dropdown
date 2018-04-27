# m-dropdown

> Lightweight dropdown menu [Examples](http://stbaer.github.io/m-dropdown/)

## Install

```sh
$ npm i m-dropdown
```

## Usage

```
<div class="m-dropdown">
  <button class="dropdown-example" data-m-toggle="dropdown">Dropdown toggle</button>
  <ul class="m-dropdown-menu">
    <li>Item 1</li>
    <li>Item 2</li>
    <li>...</li>
  </ul>
</div>
```

```
var mDropdown = require('m-dropdown');  // or include the standalone version

mDropdown.initialize();   // initialize all dropdowns
mDropdown.destroyAll();   // destroy all dropdowns

var dropdownToggleElement = document.querySelector('.dropdown-example');

mDropdown.init(dropdownToggleElement);    // initialize a single dropdown
mDropdown.toggle(dropdownToggleElement);  // toggle a single dropdown
mDropdown.destroy(dropdownToggleElement); // destroy a single dropdown
mDropdown.closeAll();                     // close opened dropdowns if there are any
```

**Install dependencies and run the example**
```
$ npm i
$ npm start
```

## Contribute or Report Issue

Pull requests should target the develop branch.

For bugs and feature requests, [please create an issue][issue-url].

## License

MIT © [Steffen Bär](https://github.com/stbaer)

[issue-url]: https://github.com/stbaer/m-dropdown/issues
