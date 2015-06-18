'use strict';

/**
 * @module m-dropdown
 */

var ATTR_SELECTOR = '[data-m-toggle="dropdown"]',
  OPEN_CLASS = 'm-open',
  MENU_CLASS = 'm-dropdown-menu';


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
  if (!menuEl || !menuEl.classList.contains(MENU_CLASS)) {
    return console.warn('Dropdown menu element not found');
  }

  function stopPropagation(ev) {
    ev.stopPropagation();
  }

  function close() {
    menuEl.classList.remove(OPEN_CLASS);

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

    menuEl.classList.add(OPEN_CLASS);

    toggleEl.addEventListener('click', stopPropagation);
    menuEl.addEventListener('click', stopPropagation);
    doc.addEventListener('click', close);
  }

  if (menuEl.classList.contains(OPEN_CLASS)) {
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
  var isOpen = !!toggleEl.parentNode.querySelectorAll('.' + OPEN_CLASS).length;

  // exit if toggle button is disabled
  if (toggleEl.getAttribute('disabled') !== null) {
    return;
  }
  //close all open menus
  var toggleElements = document.querySelectorAll(ATTR_SELECTOR);
  for (var i = toggleElements.length - 1; i >= 0; i--) {
    if(toggleElements[i].parentNode.querySelectorAll('.' + OPEN_CLASS).length){
      toggle(toggleElements[i]);
    }
  }

  // prevent form submission
  ev.preventDefault();
  ev.stopPropagation();

  if(!isOpen){ //nothing more to do
    toggle(toggleEl);
  }
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
  toggleEl._mDropdown = true;
  toggleEl.addEventListener('click', onToggleElClicked);
}


/** module API */
module.exports = {

  initialize: function () {
    var doc = document;

    var elList = doc.querySelectorAll(ATTR_SELECTOR);
    for (var i = elList.length - 1; i >= 0; i--) {
      init(elList[i]);
    }
  }

};

