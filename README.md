# 👾 Pixel Perfect [![Build Status](https://travis-ci.org/materik/sketchplugin-pixelperfect.svg?branch=master)](https://travis-ci.org/materik/sketchplugin-pixelperfect) [![Coverage Status](https://coveralls.io/repos/github/materik/sketchplugin-pixelperfect/badge.svg?branch=master)](https://coveralls.io/github/materik/sketchplugin-pixelperfect?branch=master)

Plugin for Sketch that layouts and sizes your layers automatically based on the layer name.

## Install

Download the zip-file and double click on the `.sketchplugin` file.

## Usage

By naming your layers with the formatting described below, your layers will take on certain properties depending on that name. These properties can be separated by `:` and can be contained, in the name, by putting them in brackets.

You run the `PixelPerfect` script by key shortcut `⌘L` or by going to `Plugin` in the menu bar.
* If you have layers selected, the script will only apply to that selection, the sublayers contained within it and, if their are any symbol instances, their masters will be resized and layed out as well. Instances will also be resized to the same size as the master.
* If you haven't selected any layers, however, all layers, artboards and symbols on the current page will be affected by the script.

You can also go through your entire Sketch file and apply the script to every layer. Do this by key shortcut `^⌘L` by going to `Plugin` in the menu bar. Depending on your Sketch file size, this might take some time.

If you don't want the script to apply to a certain layer, add `[ignore]` to the name.

## Examples

To give an idea how to use `PixelPerfect`, following are examples of valid layer names:

* `w100:h200`
* `w20:w+30:h100%:t:r`
* `Group [32:32:x10]`

For details of what these names would mean for the layer, see the properties section below.

## Properties

#### `width`

##### Static

Set the layer width in pixels.

*Examples:* `w100`, `w20`

##### Addition or Subtraction

Add or subtract pixels to the width of the layer. This property works best together with a static width property or to add or subtract width to a symbol instance.

*Examples:* `w+100`, `w20:w-10`

##### Percentage

Set width relative the layer group width. If the layer group is also specified with a width percentage this will take into consider it's layer group width. If you specify two `%` the width will be set to the master or the artboard containing the layer independent of how many layer groups it's in.

*Examples:* `w100%`, `w50%%`

##### Min

Defined a minimum width in pixels for a layer group. If the sublayers within the group are less then the width it will increase the group size to the specified value, if greater than that it affects nothing.

*Examples:* `w>100`

#### `height`

See `width`. Works exactly the same but with `h` as the property index.

*Examples:* `h100`, `h100:h+10`, `h100%`, `h>100`

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
