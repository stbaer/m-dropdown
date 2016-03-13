require('../styles/prefixed/main.css');

/**
 * @module m-dropdown
 */

const ATTR_SELECTOR = '[data-m-toggle="dropdown"]';
const OPEN_CLASS = 'm-open';
const MENU_CLASS = 'm-dropdown-menu';

/**
 * Toggle the dropdown.
 *
 * @param {Element} toggleEl - The dropdown toggle element.
 */
function toggle(toggleEl) {

    const wrapperEl = toggleEl.parentNode;
    const menuEl = wrapperEl.querySelector('.' + MENU_CLASS);
    const doc = wrapperEl.ownerDocument;

    // exit if no menu element
    if (!menuEl) {
        return console.warn('Dropdown menu element not found');//jshint ignore:line
    }

    function close() {
        menuEl.classList.remove(OPEN_CLASS);
        doc.removeEventListener('click', close);
    }

    function open() {
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
    const toggleElements = document.querySelectorAll(ATTR_SELECTOR);
    let i = toggleElements.length - 1;

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

    const toggleEl = ev.currentTarget;
    const isOpen = toggleEl.parentNode.querySelectorAll('.' + OPEN_CLASS).length !== 0;

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
        const elements = document.querySelectorAll(ATTR_SELECTOR);
        let i = elements.length - 1;
        for (i; i >= 0; i--) {
            init(elements[i]);
        }
    },
    destroyAll: function () {
        const elements = document.querySelectorAll(ATTR_SELECTOR);
        let i = elements.length - 1;
        for (i; i >= 0; i--) {
            destroy(elements[i]);
        }
    },
    init: init,
    toggle: toggle,
    closeAll: closeAllOpened,
    destroy: destroy
};
