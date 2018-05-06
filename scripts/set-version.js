#!/usr/bin/env node

var cmd = require('node-cmd');
var json = require('edit-json-file');

var PACKAGE_FILE = './package.json';

// Get version from arguments

var args = process.argv;
var version = args[args.length - 1];

// Update package.json

var pkg = json(PACKAGE_FILE, {
    stringify_width: 4
});
pkg.set('version', version);
pkg.save();

// Update metadata

cmd.run('npm run update-metadata');
