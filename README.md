# 👾 Pixel Perfect [![Build Status](https://travis-ci.org/materik/sketchplugin-pixelperfect.svg?branch=master)](https://travis-ci.org/materik/sketchplugin-pixelperfect) [![Coverage Status](https://coveralls.io/repos/github/materik/sketchplugin-pixelperfect/badge.svg?branch=master)](https://coveralls.io/github/materik/sketchplugin-pixelperfect?branch=master)

Plugin for Sketch that layouts and sizes your layers automatically based on the layer names.

<table>
  <tr></tr>
  <tr>
    <td><b>Layers</b></td>
    <td><b>Before</b></td>
  </tr>
  <tr>
    <td rowspan="3"><img src="resources/layers.png" /></td>
    <td><img src="resources/before.png" /></td>
  </tr>
  <tr>
    <td><b>After ⌘L</b></td>
  </tr>
  <tr>
    <td><img src="resources/after.png" /></td>
  </tr>
</table>

## Install

Download the zip-file and double click on the `.sketchplugin` file.

## Usage

#### Naming

By naming your layers with the formatting described below, your layers will take on certain properties depending on that name. These properties can be separated by `:` and can be contained, in the name, by putting them in brackets.

#### Ignore

If you don't want the script to apply to a certain layer, add `[ignore]` to the name.

#### Constraints

Depending on the properties you have given a layer, constraints will be set as see fit. In short, margins and paddings will affect top, right, bottom, and left constraints while width and height will affect those constraints.

#### Execution

You run the `PixelPerfect` script by key shortcut `⌘L` or by going to `Plugin` in the menu bar.
* If you have layers selected, the script will only apply to that selection, the sublayers contained within it and, if their are any symbol instances, their masters will be resized and layed out as well. Instances will also be resized to the same size as the master.
* If you haven't selected any layers, however, all layers, artboards and symbols on the current page will be affected by the script.

You can also go through your entire Sketch file and apply the script to every layer. Do this by key shortcut `^⌘L` by going to `Plugin` in the menu bar. Depending on your Sketch file size, this might take some time.

## Properties

### `width`

#### Static

Set the layer width in pixels.

*Examples:* `w100`, `w20`

#### Addition or Subtraction

Add or subtract pixels to the width of the layer. This property works best together with a static width property or to add or subtract width to a symbol instance.

*Examples:* `w+100`, `w20:w-10`

#### Percentage

Set width relative the layer group width. If the layer group is also specified with a width percentage this will take into consider it's layer group width. If you specify two `%` the width will be set to the master or the artboard containing the layer independent of how many layer groups it's in.

*Examples:* `w100%`, `w50%%`

#### Min

Defined a minimum width in pixels for a layer group. If the sublayers within the group are less then the width it will increase the group size to the specified value, if greater than that it affects nothing.

*Examples:* `w>100`

### `height`

See `width`. Works exactly the same but with `h` as the property index.

*Examples:* `h100`, `h100:h+10`, `h100%`, `h>100`

### `padding`

Inspired by `Dynamic Button` and css, padding doesn't have a property index but instead solo numbers will be regarded as padding. Padding only works if it's together with a layer named `bg` (case-insensitive) which will be the layer affected by the padding.

*Examples:* `32:24:32:24`, `32:24`, `w100:32:24`

### `margin`

Margin properties places the layer certain pixels off the sides relative it's layer group. The property index are; `t` for top, `r` for right, `b` for bottom, and `l` for left. If no number is specified it will be regarded as 0. If you want the layer to stretch all sides you can use the shorthand `trbl`.

*Examples:* `t:b:r30`, `b10:l10`, `tbrl`

### `stack-horizontally`

*TODO:* Add explaination

### `stack-vertically`

*TODO:* Add explaination

### `center-horizontally`

*TODO:* Add explaination

### `center-vertically`

*TODO:* Add explaination

## Things to note

#### Symbol masters and Artboards

Symbol masters will resize itself to fit the content within, artboards will not. Artboards can have properties like, for instance, padding, and min width and min height.

#### Order of execution

The script will go downwards and up in the layer list and takes care of sublayers before applying properties to itself. Properties are applied from left to right except padding, which is always done last. Be aware of the ordering to get your expected behaviour.

#### Text layers

Will always be set to fixed after resizing it to fit it's content.
