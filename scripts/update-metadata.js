#!/usr/bin/env node

var fs = require('fs');
var json = require('edit-json-file');

var MANIFEST_FILE = './PixelPerfect.sketchplugin/Contents/Sketch/manifest.json';
var PACKAGE_FILE = './package.json';
var PACKAGE_LOCK_FILE = './package-lock.json';
var README_FILE = './README.md';

// Get data from package.json

var pkg = json(PACKAGE_FILE);
var name = pkg.get('name');
var description = pkg.get('description');
var version = pkg.get('version');

// Update manifest.json

var manifest = json(MANIFEST_FILE, {
    stringify_width: 4
});
manifest.set('description', description);
manifest.set('version', version);
manifest.save();

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
