
var IGNORE_RE = new RegExp("\\[ignore\\]", "i");
var PROPERTIES_RE = new RegExp("\\[([^\\]]+)\\]");
var PROPERTIES_SEP = ":";
var PROPERTY_PADDING_RE = new RegExp("^\\d+$");

var PROPERTY_WIDTH_STATIC = "width"
var PROPERTY_WIDTH_ADDITION = "width-addition"
var PROPERTY_WIDTH_PERCENTAGE = "width-percentage"
var PROPERTY_WIDTH_PERCENTAGE_FULL = "width-percentage-full"
var PROPERTY_WIDTH_MIN = "width-min"
var PROPERTY_HEIGHT_STATIC = "height"
var PROPERTY_HEIGHT_ADDITION = "height-addition"
var PROPERTY_HEIGHT_PERCENTAGE = "height-percentage"
var PROPERTY_HEIGHT_PERCENTAGE_FULL = "height-percentage-full"
var PROPERTY_HEIGHT_MIN = "height-min"
var PROPERTY_PADDING = "padding"
var PROPERTY_MARGIN = "margin"
var PROPERTY_MARGIN_TOP = "margin-top"
var PROPERTY_MARGIN_RIGHT = "margin-right"
var PROPERTY_MARGIN_BOTTOM = "margin-bottom"
var PROPERTY_MARGIN_LEFT = "margin-left"
var PROPERTY_STACK_HORIZONTALLY_TOP = "stack-horizontally-top"
var PROPERTY_STACK_HORIZONTALLY_MIDDLE = "stack-horizontally-middle"
var PROPERTY_STACK_HORIZONTALLY_BOTTOM = "stack-horizontally-bottom"
var PROPERTY_STACK_VERTICALLY_LEFT = "stack-vertically-left"
var PROPERTY_STACK_VERTICALLY_CENTER = "stack-vertically-center"
var PROPERTY_STACK_VERTICALLY_RIGHT = "stack-vertically-right"
var PROPERTY_CENTER_HORIZONTALLY = "center-horizontally"
var PROPERTY_CENTER_VERTICALLY = "center-vertically"
var PROPERTY_MAP = {
    "(w)\\d+":              PROPERTY_WIDTH_STATIC,
    "(w)(\\+|\\-)\\d+":     PROPERTY_WIDTH_ADDITION,
    "(w)\\d+%":             PROPERTY_WIDTH_PERCENTAGE,
    "(w)\\d+%%":            PROPERTY_WIDTH_PERCENTAGE_FULL,
    "(w)\\>\\d+":           PROPERTY_WIDTH_MIN,
    "(h)\\d+":              PROPERTY_HEIGHT_STATIC,
    "(h)(\\+|\\-)\\d+":     PROPERTY_HEIGHT_ADDITION,
    "(h)\\d+%":             PROPERTY_HEIGHT_PERCENTAGE,
    "(h)\\d+%%":            PROPERTY_HEIGHT_PERCENTAGE_FULL,
    "(h)\\>\\d+":           PROPERTY_HEIGHT_MIN,
    "padding":              PROPERTY_PADDING,
    "(bg|trbl|m)":          PROPERTY_MARGIN,
    "(t|mt)\\-?\\d*":       PROPERTY_MARGIN_TOP,
    "(r|mr)\\-?\\d*":       PROPERTY_MARGIN_RIGHT,
    "(b|mb)\\-?\\d*":       PROPERTY_MARGIN_BOTTOM,
    "(l|ml)\\-?\\d*":       PROPERTY_MARGIN_LEFT,
    "(xt)\\-?\\d+":         PROPERTY_STACK_HORIZONTALLY_TOP,
    "(x)\\-?\\d+":          PROPERTY_STACK_HORIZONTALLY_MIDDLE,
    "(xb)\\-?\\d+":         PROPERTY_STACK_HORIZONTALLY_BOTTOM,
    "(yl)\\-?\\d+":         PROPERTY_STACK_VERTICALLY_LEFT,
    "(y)\\-?\\d+":          PROPERTY_STACK_VERTICALLY_CENTER,
    "(yr)\\-?\\d+":         PROPERTY_STACK_VERTICALLY_RIGHT,
    "(h|c)(\\+|\\-)?\\d*":  PROPERTY_CENTER_HORIZONTALLY,
    "(v)(\\+|\\-)?\\d*":    PROPERTY_CENTER_VERTICALLY,
}

var CLASS_ARTBOARD = "MSArtboardGroup"
var CLASS_GROUP = "MSLayerGroup"
var CLASS_SHAPE = "MSShapeGroup"
var CLASS_SYMBOL_INSTANCE = "MSSymbolInstance"
var CLASS_SYMBOL_MASTER = "MSSymbolMaster"
var CLASS_TEXT = "MSTextLayer"

// -----------------------------------------------------------

global.IGNORE_RE = IGNORE_RE
global.PROPERTIES_RE = PROPERTIES_RE
global.PROPERTIES_SEP = PROPERTIES_SEP
global.PROPERTY_PADDING_RE = PROPERTY_PADDING_RE

global.PROPERTY_WIDTH_STATIC = PROPERTY_WIDTH_STATIC
global.PROPERTY_WIDTH_ADDITION = PROPERTY_WIDTH_ADDITION
global.PROPERTY_WIDTH_PERCENTAGE = PROPERTY_WIDTH_PERCENTAGE
global.PROPERTY_WIDTH_PERCENTAGE_FULL = PROPERTY_WIDTH_PERCENTAGE_FULL
global.PROPERTY_WIDTH_MIN = PROPERTY_WIDTH_MIN
global.PROPERTY_HEIGHT_STATIC = PROPERTY_HEIGHT_STATIC
global.PROPERTY_HEIGHT_ADDITION = PROPERTY_HEIGHT_ADDITION
global.PROPERTY_HEIGHT_PERCENTAGE = PROPERTY_HEIGHT_PERCENTAGE
global.PROPERTY_HEIGHT_PERCENTAGE_FULL = PROPERTY_HEIGHT_PERCENTAGE_FULL
global.PROPERTY_HEIGHT_MIN = PROPERTY_HEIGHT_MIN
global.PROPERTY_PADDING = PROPERTY_PADDING
global.PROPERTY_MARGIN = PROPERTY_MARGIN
global.PROPERTY_MARGIN_TOP = PROPERTY_MARGIN_TOP
global.PROPERTY_MARGIN_RIGHT = PROPERTY_MARGIN_RIGHT
global.PROPERTY_MARGIN_BOTTOM = PROPERTY_MARGIN_BOTTOM
global.PROPERTY_MARGIN_LEFT = PROPERTY_MARGIN_LEFT
global.PROPERTY_STACK_HORIZONTALLY_TOP = PROPERTY_STACK_HORIZONTALLY_TOP
global.PROPERTY_STACK_HORIZONTALLY_MIDDLE = PROPERTY_STACK_HORIZONTALLY_MIDDLE
global.PROPERTY_STACK_HORIZONTALLY_BOTTOM = PROPERTY_STACK_HORIZONTALLY_BOTTOM
global.PROPERTY_STACK_VERTICALLY_LEFT = PROPERTY_STACK_VERTICALLY_LEFT
global.PROPERTY_STACK_VERTICALLY_CENTER = PROPERTY_STACK_VERTICALLY_CENTER
global.PROPERTY_STACK_VERTICALLY_RIGHT = PROPERTY_STACK_VERTICALLY_RIGHT
global.PROPERTY_CENTER_HORIZONTALLY = PROPERTY_CENTER_HORIZONTALLY
global.PROPERTY_CENTER_VERTICALLY = PROPERTY_CENTER_VERTICALLY
global.PROPERTY_MAP = PROPERTY_MAP

global.CLASS_ARTBOARD = CLASS_ARTBOARD
global.CLASS_GROUP = CLASS_GROUP
global.CLASS_SHAPE = CLASS_SHAPE
global.CLASS_SYMBOL_INSTANCE = CLASS_SYMBOL_INSTANCE
global.CLASS_SYMBOL_MASTER = CLASS_SYMBOL_MASTER
global.CLASS_TEXT = CLASS_TEXT
