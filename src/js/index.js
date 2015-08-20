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
    var menuEl = wrapperEl.querySelector('.' + MENU_CLASS);
    var doc = wrapperEl.ownerDocument;

    // exit if no menu element
    if (!menuEl) {
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

/**
 * Close all currently opened menus
 */
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
 * Returns true if the dropdown toggle contains a disabled class or attribute
 * @param  {Element}  toggleEl The dropdown toggle
 * @return {Boolean}
 */
function isDisabled(toggleEl){
    return toggleEl.getAttribute('disabled') !== null || toggleEl.classList.contains('disabled');
}

/**
 * Handle click events on dropdown toggle element.
 *
 * @param {Event} ev - The DOM event
 */
function onToggleElClicked(ev) {

    var toggleEl = ev.currentTarget;
    var isOpen = toggleEl.parentNode.querySelectorAll('.' + OPEN_CLASS).length !== 0;

    if (!isDisabled(toggleEl) && ev.button === 0) {

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
    if (toggleEl._mDropdown !== true) {
        toggleEl._mDropdown = true;
        toggleEl.addEventListener('click', onToggleElClicked);
    }
}

/**
 *
 */
function destroy(toggleEl) {
    // check flag
    if (toggleEl._mDropdown === true) {
        // close if it's open
        if (toggleEl.parentNode.querySelectorAll('.' + OPEN_CLASS).length) {
            toggle(toggleEl);
        }
        toggleEl._mDropdown = null;
        toggleEl.removeEventListener('click', onToggleElClicked);
    }
}

/** module API */
module.exports = {

    initialize: function () {
        var elements = document.querySelectorAll(ATTR_SELECTOR);
        var i = elements.length - 1;
        for (i; i >= 0; i--) {
            init(elements[i]);
        }
    },
    destroyAll: function () {
        var elements = document.querySelectorAll(ATTR_SELECTOR);
        var i = elements.length - 1;
        for (i; i >= 0; i--) {
            destroy(elements[i]);
        }
    },
    init: init,
    toggle: toggle,
    destroy: destroy
};
