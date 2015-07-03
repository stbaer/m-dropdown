'use strict';

/**
 * @module m-dropdown
 */

var ATTR_SELECTOR = '[data-m-toggle="dropdown"]';
var OPEN_CLASS = 'm-open';
var MENU_CLASS = 'm-dropdown-menu';

/**
 * Toggle the dropdown.
 *
 * @param {Element} toggleEl - The dropdown toggle element.
 */
function toggle(toggleEl) {

    var wrapperEl = toggleEl.parentNode;
    var menuEl = toggleEl.nextElementSibling;
    var doc = wrapperEl.ownerDocument;

    // exit if no menu element
    if (!menuEl || !menuEl.classList.contains(MENU_CLASS)) {
        return console.warn('Dropdown menu element not found');//jshint ignore:line
    }

    function close() {
        menuEl.classList.remove(OPEN_CLASS);
        doc.removeEventListener('click', close);
    }

    function open() {
        // position menu element below toggle button
        var wrapperRect = wrapperEl.getBoundingClientRect();
        var toggleRect = toggleEl.getBoundingClientRect();
        var top = toggleRect.top - wrapperRect.top + toggleRect.height;

        menuEl.style.top = top + 'px';
        menuEl.classList.add(OPEN_CLASS);
        doc.addEventListener('click', close);
    }

    if (menuEl.classList.contains(OPEN_CLASS)) {
        close();
    }
    else {
        open();
    }
}

function closeAllOpened(){
    //close all open menus
    var toggleElements = document.querySelectorAll(ATTR_SELECTOR);
    var i = toggleElements.length - 1;

    for ( i; i >= 0; i--) {
        if (toggleElements[i].parentNode.querySelectorAll('.' + OPEN_CLASS).length) {
            toggle(toggleElements[i]);
        }
    }
}

/**
 * Handle click events on dropdown toggle element.
 *
 * @param {Event} ev - The DOM event
 */
function onToggleElClicked(ev) {

    var toggleEl = this;
    var isOpen = toggleEl.parentNode.querySelectorAll('.' + OPEN_CLASS).length !== 0;

    if (toggleEl.getAttribute('disabled') === null && ev.button === 0) {

        closeAllOpened();
        // prevent form submission
        ev.preventDefault();
        ev.stopPropagation();

        if (!isOpen) { //nothing more to do
            toggle(toggleEl);
        }
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
