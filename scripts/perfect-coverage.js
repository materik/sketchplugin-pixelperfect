#!/usr/bin/env node

var cmd = require('node-cmd');

// Get src files

var getSrcFiles = function(callback) {
    cmd.get('find src -type f -name *.js', (err, res) => {
        if (err) { throw(err); }

        var files = res.split('\n')
        files.pop()

        callback(files)
    })
}

var getTestableSrcFiles = function(callback) {
    getSrcFiles( (files) => {
        callback(files.filter( (file) => {
            return !file.includes('debug.js') && !file.includes('const.js')
        }))
    })
}

// Find files

var findSrcFile = function(name, callback) {
    cmd.get('find src -name ' + name, (err, res) => {
        if (err) { throw(err); }

        callback(res.trim())
    });
}

var findTestFile = function(name, callback) {
    cmd.get('find tests/unit -name ' + name, (err, res) => {
        if (err) { throw(err); }

        callback(res.trim())
    });
}

var findAndTest = function(name) {
    findSrcFile(name, (srcFile) => {
        findTestFile(name, (testFile) => {
            test(srcFile, testFile)
        })
    })
}

// Coverage

var RE_COVERAGE_LINE = /^All files/i

var isPerfectCoverage = function(srcFile, res) {
    var lines = res.split('\n')
    var line = lines.filter( (line) => {
        return RE_COVERAGE_LINE.test(line)
    }).pop()
    var coverage = line.split('|').map( (result) => {
        return parseInt(result.trim())
    }).filter( (result) => {
        return !isNaN(result)
    })
    var minCoverage = coverage.reduce( (accumulator, currentValue) => {
        return Math.min(accumulator, currentValue)
    })
    console.log(srcFile, coverage)
    return minCoverage == 100
}

// Test

var test = function(srcFile, testFile, callback) {
    if (Array.isArray(srcFile)) {
        var files = srcFile
        if (files.length == 0) {
            console.log('ALL DONE');
            return;
        }

        var srcFile = files.shift()
        var testFile = srcFile.replace('src/', 'tests/unit/').replace('lib/', '');
        test(srcFile, testFile, (res) => {
            if (!res) { console.log('^ Not 100% covered'); }
            test(files)
        });
    } else {
        cmd.get('nyc --include="' + srcFile + '" mocha ' + testFile, (err, res) => {
            if (err) { throw(err); }
            var result = isPerfectCoverage(srcFile, res)
            if (callback) { 
                callback(result) 
            } else {
                console.log(res)
            }
        })
    }
}

// Execute

var args = process.argv;
if (args.length > 2) {
    findAndTest(args[args.length - 1])
} else {
    getTestableSrcFiles(test);
}
