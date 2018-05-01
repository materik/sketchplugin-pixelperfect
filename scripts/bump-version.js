#!/usr/bin/env node

var cmd = require('node-cmd');
var json = require("edit-json-file");

var PACKAGE_FILE = './package.json';

// Get version from package.json

var pkg = json(PACKAGE_FILE);
var version = pkg.get('version');

var bumb = function(version, major, minor, patch) {
    var split = version.split('.');
    if (major) {
        var _major = parseInt(split[0]) + 1
        return _major + ".0.0"
    } else if (minor) {
        var _major = split[0]
        var _minor = parseInt(split[1]) + 1
        return _major + "." + _minor + ".0"
    } else {
        var _major = split[0]
        var _minor = split[1]
        var _patch = parseInt(split[2]) + 1
        return _major + "." + _minor + "." + _patch
    }
}

// Get type from arguments

var args = process.argv
var type = args[args.length - 1].trim().toLowerCase()

switch (type) {
    case "major":
        version = bumb(version, true);
        break;
    case "minor":
        version = bumb(version, false, true);
        break;
    case "patch":
        version = bumb(version, false, false, true);
        break;
    default:
        throw("ERROR: Need to specify: \"Major\", \"Minor\", or \"Patch\"");
}

// Set version

cmd.run('npm run set-version ' + version);
