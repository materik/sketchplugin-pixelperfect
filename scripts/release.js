#!/usr/bin/env node

var cmd = require('node-cmd');
var json = require('edit-json-file');

var PACKAGE_FILE = './package.json';

var args = process.argv;
var release = args[args.length - 1]; 
cmd.get('skpm publish ' + release, (err) => {
    if (err) { throw(err); }
    cmd.get('npm run update-readme', (err) => {
        if (err) { throw(err); }
        var version = json(PACKAGE_FILE).get('version');
        cmd.get('git add --all && git commit -m "Publish ' + version + ' release :rocket:"', (err) => {
            if (err) { throw(err); }
            cmd.get('git push')
        })
    })
})
