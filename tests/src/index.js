
global.assert = require('assert');

var PATH_ROOT = '../..';
var PATH_SRC = PATH_ROOT + '/src';
var PATH_LIB = PATH_SRC + '/lib';
var PATH_COMPONENTS = PATH_LIB + '/components';
var PATH_PROPERTIES = PATH_LIB + '/properties';

require('./mock');

var commands = require(PATH_SRC + '/commands');
var index = require(PATH_SRC)

module.exports = {
    makePixelPerfect: commands.makePixelPerfect,
    makeEverythingPixelPerfect: commands.makeEverythingPixelPerfect,

    Alignment: index.require.alignment(),
    Component: index.require.component(),
    ComponentFrame: index.require.componentFrame(),
    Components: index.require.components(),
    ComponentsFrame: index.require.componentsFrame(),
    Constraints: index.require.constraints(),
    Properties: index.require.properties(),
    Property: index.require.property(),
    SymbolStore: index.require.symbolStore(),
    ArtboardComponent: index.require.component.artboard(),
    GroupComponent: index.require.component.group(),
    LayerComponent: index.require.component.layer(),
    ShapeComponent: index.require.component.shape(),
    SymbolInstanceComponent: index.require.component.symbolInstance(),
    SymbolMasterComponent: index.require.component.symbolMaster(),
    TextComponent: index.require.component.text(),
    CenterProperty: index.require.property.center(),
    MarginProperty: index.require.property.margin(),
    PaddingProperty: index.require.property.padding(),
    SizeProperty: index.require.property.size(),
    StackProperty: index.require.property.stack(),
};
