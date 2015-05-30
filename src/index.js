'use strict';

/**
 * @module dropdowns
 */

var attrSelector = '[data-m-toggle="dropdown"]',
  openClass = 'm-open',
  menuClass = 'm-dropdown-menu';


/**
 * Toggle the dropdown.
 *
 * @param {Element} toggleEl - The dropdown toggle element.
 */
function toggle(toggleEl) {
  var wrapperEl = toggleEl.parentNode,
    menuEl = toggleEl.nextElementSibling,
    doc = wrapperEl.ownerDocument;

  // exit if no menu element
  if (!menuEl || !menuEl.classList.contains(menuClass)) {
    return console.warn('Dropdown menu element not found');
  }

  function stopPropagation(ev) {
    ev.stopPropagation();
  }

  function close() {
    menuEl.classList.remove(openClass);

    // remove event handlers
    doc.removeEventListener('click', close);
    menuEl.removeEventListener('click', stopPropagation);
    toggleEl.removeEventListener('click', stopPropagation);
  }

  function open() {
    // position menu element below toggle button
    var wrapperRect = wrapperEl.getBoundingClientRect(),
      toggleRect = toggleEl.getBoundingClientRect();

    var top = toggleRect.top - wrapperRect.top + toggleRect.height;
    menuEl.style.top = top + 'px';

    menuEl.classList.add(openClass);

    toggleEl.addEventListener('click', stopPropagation);
    menuEl.addEventListener('click', stopPropagation);
    doc.addEventListener('click', close);
  }

  if (menuEl.classList.contains(openClass)) {
    close();
  }
  else {
    open();
  }
}

/**
 * Handle click events on dropdown toggle element.
 *
 * @param {Event} ev - The DOM event
 */
function onToggleElClicked(ev) {
  // only left clicks
  if (ev.button !== 0) {
    return;
  }

  var toggleEl = this;

  // exit if toggle button is disabled
  if (toggleEl.getAttribute('disabled') !== null) {
    return;
  }

  // prevent form submission
  ev.preventDefault();
  ev.stopPropagation();

  toggle(toggleEl);
}

/**
 * Initialize toggle element.
 * @param {Element} toggleEl - The toggle element.
 */
function init(toggleEl) {
  // check flag
  if (toggleEl._mDropdown === true) {
    return;
  }
  else {
    toggleEl._mDropdown = true;
  }
  toggleEl.addEventListener('click', onToggleElClicked);
}


/** module API */
module.exports = {

  initialize: function () {
    var doc = document;

    var elList = doc.querySelectorAll(attrSelector);
    for (var i = elList.length - 1; i >= 0; i--) {
      init(elList[i]);
    }
  }

};

