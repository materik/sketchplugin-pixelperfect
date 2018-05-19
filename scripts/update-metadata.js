#!/usr/bin/env node

var fs = require('fs');
var json = require('edit-json-file');

var PACKAGE_FILE = './package.json';
var README_FILE = './README.md';

// Get data from package.json

var pkg = json(PACKAGE_FILE);
var description = pkg.get('description');
var version = pkg.get('version');

// Update README.md

var readme = fs.readFileSync(README_FILE).toString();
readme = readme.replace(
    /<!-- Description -->.*<!-- EOL -->/,
    '<!-- Description --> ' + description + ' <!-- EOL -->'
);
readme = readme.replace(
    /version\-[\d\.]+\-blue/,
    'version-' + version + '-blue'
);
fs.writeFileSync(README_FILE, readme);
