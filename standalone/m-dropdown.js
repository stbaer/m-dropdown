(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.mDropdown = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

function injectStyleTag (document, fileName, cb) {
  var style = document.getElementById(fileName)

  if (style) {
    cb(style)
  } else {
    var head = document.getElementsByTagName('head')[0]

    style = document.createElement('style')
    if (fileName != null) style.id = fileName
    cb(style)
    head.appendChild(style)
  }

  return style
}

module.exports = function (css, customDocument, fileName) {
  var doc = customDocument || document
  /* istanbul ignore if: not supported by Electron */
  if (doc.createStyleSheet) {
    var sheet = doc.createStyleSheet()
    sheet.cssText = css
    return sheet.ownerNode
  } else {
    return injectStyleTag(doc, fileName, function (style) {
      /* istanbul ignore if: not supported by Electron */
      if (style.styleSheet) {
        style.styleSheet.cssText = css
      } else {
        style.innerHTML = css
      }
    })
  }
}

module.exports.byUrl = function (url) {
  /* istanbul ignore if: not supported by Electron */
  if (document.createStyleSheet) {
    return document.createStyleSheet(url).ownerNode
  } else {
    var head = document.getElementsByTagName('head')[0]
    var link = document.createElement('link')

    link.rel = 'stylesheet'
    link.href = url

    head.appendChild(link)
    return link
  }
}

},{}],2:[function(require,module,exports){
'use strict';

require('../styles/prefixed/main.css');

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
        return console.warn('Dropdown menu element not found'); //jshint ignore:line
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
    } else {
        open();
    }
}

/**
 * Close all currently opened menus
 */
function closeAllOpened() {
    //close all open menus
    var toggleElements = document.querySelectorAll(ATTR_SELECTOR);
    var i = toggleElements.length - 1;

    for (i; i >= 0; i--) {
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
function isDisabled(toggleEl) {
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

        if (!isOpen) {
            //nothing more to do
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

    initialize: function initialize() {
        var elements = document.querySelectorAll(ATTR_SELECTOR);
        var i = elements.length - 1;
        for (i; i >= 0; i--) {
            init(elements[i]);
        }
    },
    destroyAll: function destroyAll() {
        var elements = document.querySelectorAll(ATTR_SELECTOR);
        var i = elements.length - 1;
        for (i; i >= 0; i--) {
            destroy(elements[i]);
        }
    },
    init: init,
    toggle: toggle,
    closeAll: closeAllOpened,
    destroy: destroy
};

},{"../styles/prefixed/main.css":3}],3:[function(require,module,exports){
var inject = require('./../../../node_modules/cssify');
var css = "@-webkit-keyframes m-dropdown-open {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n@keyframes m-dropdown-open {\n  from {\n    opacity: 0;\n  }\n  to {\n    opacity: 1;\n  }\n}\n.m-dropdown {\n  display: inline-block;\n  position: relative;\n}\n.m-dropdown > [data-m-toggle=\"dropdown\"] {\n  outline: 0;\n  cursor: pointer;\n}\n.m-dropdown > [disabled] {\n  cursor: not-allowed;\n}\n.m-dropdown-menu {\n  display: none;\n  position: absolute;\n  top: 100%;\n  left: 0;\n  min-width: 160px;\n  padding: 5px 0;\n  margin: 2px 0 0;\n  list-style: none;\n  text-align: left;\n  background-color: #FFF;\n  z-index: 1;\n  background-clip: padding-box;\n}\n.m-dropdown-menu > li {\n  display: block;\n  padding: 3px 20px;\n  clear: both;\n}\n.m-dropdown-menu > li:hover,\n.m-dropdown-menu > li:focus {\n  background-color: #EEEEEE;\n}\n.m-dropdown-menu.m-open {\n  display: block;\n  -webkit-animation-duration: 0.4s;\n          animation-duration: 0.4s;\n  -webkit-animation-name: m-dropdown-open;\n          animation-name: m-dropdown-open;\n}\n.m-dropdown-menu.m-dropup {\n  top: auto;\n  bottom: 100%;\n  margin: 0 0 2px;\n}\n.m-dropdown-menu-right {\n  left: auto;\n  right: 0;\n}\n";
inject(css, undefined, '_n9fuj6');
module.exports = css;

},{"./../../../node_modules/cssify":1}]},{},[2])(2)
});