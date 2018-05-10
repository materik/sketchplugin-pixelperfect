
global.assert = require('assert');

var PATH_ROOT = '../..';
var PATH_SKETCHPLUGIN = PATH_ROOT + '/PixelPerfect.sketchplugin/Contents/Sketch';
var PATH_LIB = PATH_SKETCHPLUGIN + '/lib';
var PATH_COMPONENTS = PATH_LIB + '/components';
var PATH_PROPERTIES = PATH_LIB + '/properties';

require(PATH_SKETCHPLUGIN + '/settings');
require(PATH_LIB + '/alignment');
require(PATH_LIB + '/component');
require(PATH_LIB + '/component-frame');
require(PATH_LIB + '/components');
require(PATH_LIB + '/components-frame');
require(PATH_LIB + '/constraints');
require(PATH_LIB + '/index');
require(PATH_LIB + '/properties');
require(PATH_LIB + '/property');
require(PATH_LIB + '/symbol-store');
require(PATH_LIB + '/utils');
require(PATH_COMPONENTS + '/artboard');
require(PATH_COMPONENTS + '/group');
require(PATH_COMPONENTS + '/layer');
require(PATH_COMPONENTS + '/shape');
require(PATH_COMPONENTS + '/symbol-instance');
require(PATH_COMPONENTS + '/symbol-master');
require(PATH_COMPONENTS + '/text');
require(PATH_PROPERTIES + '/center');
require(PATH_PROPERTIES + '/margin');
require(PATH_PROPERTIES + '/padding');
require(PATH_PROPERTIES + '/size');
require(PATH_PROPERTIES + '/stack');

require('./mock');
