#!/usr/bin/env node

var cmd = require('node-cmd');
var json = require("edit-json-file");

var PACKAGE_FILE = './package.json';

// Get old version

var pkg = json(PACKAGE_FILE);
var oldVersion = pkg.get('version');

// Bump version

var args = process.argv
var type = args[args.length - 1]

cmd.get('npm run bump-version ' + type, (err, res) => {
    if (err) {
        throw(err)
    }

    // Get version from package.json

    var pkg = json(PACKAGE_FILE);
    var newVersion = pkg.get('version');

    // Log

    console.log("Releasing new version " + newVersion + " (was " + oldVersion + ")");

    // Commit version bump

    cmd.get(
        `
            git diff --color
            git add --all
            git commit -m "[release] bump version to ` + newVersion + `"
            git tag ` + newVersion + `
        `,
        (err, res) => {
            if (err) {
                throw(err)
            } else {
                console.log(res)
            }
        }
    );
});
