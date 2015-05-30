#!/usr/bin/env node

'use strict';
var argv = require('minimist')(process.argv.slice(2)); 
var mDropdown = require('./lib');

console.log(argv);
