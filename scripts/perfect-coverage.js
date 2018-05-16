#!/usr/bin/env node

var cmd = require('node-cmd');

var args = process.argv;
var name = args[args.length - 1];

cmd.get('find PixelPerfect.sketchplugin -name ' + name, (err, res) => {
    if (err) {
        throw(err);
    }

    var coverageFile = res.trim()
    cmd.get('find tests -name ' + name, (err, res) => {
        if (err) {
            throw(err);
        }

        var testFile = res.trim()
        cmd.get('nyc --include="' + coverageFile + '" mocha ' + testFile, (err, res) => {
            if (err) {
                throw(err);
            }

            console.log(res)
        })
    })
})
