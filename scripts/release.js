#!/usr/bin/env node

var cmd = require('node-cmd');
var json = require('edit-json-file');

var PACKAGE_FILE = './package.json';

// Get verson from package.json

var pkg = json(PACKAGE_FILE);
var version = pkg.get('version');

var args = process.argv;
var release = args[args.length - 1]; 
cmd.get('skpm publish ' + release, (err) => {
    if (err) { throw(err); }
    cmd.get('npm run update-readme', (err) => {
        if (err) { throw(err); }
        cmd.get('git add --all && git commit -m "[:rocket:] release ' + version + '"', (err) => {
            if (err) { throw(err); }
            cmd.get('git push')
        })
    })
})
