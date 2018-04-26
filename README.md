# 👾 Pixel Perfect [![Build Status](https://travis-ci.org/materik/sketchplugin-pixelperfect.svg?branch=master)](https://travis-ci.org/materik/sketchplugin-pixelperfect) [![Coverage Status](https://coveralls.io/repos/github/materik/sketchplugin-pixelperfect/badge.svg?branch=master)](https://coveralls.io/github/materik/sketchplugin-pixelperfect?branch=master)

Plugin for Sketch that layouts and sizes your layers automatically based on the layer name

## Install

Download the zip-file and double click on the `.sketchplugin` file.

## Usage

By naming your layers with the formatting described below, your layers will take on certain properties depending on that name. These properties can be separated by `:` and can be contained, in the name, by putting them in brackets.

You run the `PixelPerfect` script by executing `⌘L` or going to `Plugin` in the menu bar. If you have any layers selected, the script will only apply to that selection, the sublayers contained within it and, if their are any symbol instances, their masters will be affected by the script as well. If you haven't selected any layers, however, all layers, artboards and symbols on the current page will be affected by the script.

If you don't want the script to apply to a certain layer, add `[ignore]` to the name.

## Examples

To give an idea how to use `PixelPerfect`, following are examples of valid layer names:

* `w100:h200`
* `w20:w+30:h100%:t:r`
* `Group [32:32:x10]`

For details of what these names would mean for the layer, see the properties section below.

## Properties

#### `width`

*TODO:* Add explaination

#### `width-addition`

*TODO:* Add explaination

#### `width-subtraction`

*TODO:* Add explaination

#### `width-percentage`

*TODO:* Add explaination

#### `width-min`

*TODO:* Add explaination

#### `height`

*TODO:* Add explaination

#### `height-addition`

*TODO:* Add explaination

#### `height-percentage`

*TODO:* Add explaination

#### `height-min`

*TODO:* Add explaination

#### `padding`

*TODO:* Add explaination

#### `margin`

*TODO:* Add explaination

#### `stack-horizontally`

*TODO:* Add explaination

#### `stack-vertically`

*TODO:* Add explaination

#### `center-horizontally`

*TODO:* Add explaination

#### `center-vertically`

*TODO:* Add explaination
