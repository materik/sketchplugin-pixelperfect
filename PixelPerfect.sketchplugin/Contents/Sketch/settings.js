
var PROPERTIES_RE = new RegExp('\\[([^\\]]+)\\]');
var PROPERTIES_RE_IGNORE = new RegExp('\\[ignore\\]', 'i');
var PROPERTIES_RE_PADDING = new RegExp('^\\d+$');
var PROPERTIES_SEP = ':';

// -----------------------------------------------------------

var PROPERTY_WIDTH_STATIC = 'width';
var PROPERTY_WIDTH_ADDITION = 'width-addition';
var PROPERTY_WIDTH_PERCENTAGE = 'width-percentage';
var PROPERTY_WIDTH_PERCENTAGE_FULL = 'width-percentage-full';
var PROPERTY_WIDTH_MIN = 'width-min';
var PROPERTY_HEIGHT_STATIC = 'height';
var PROPERTY_HEIGHT_ADDITION = 'height-addition';
var PROPERTY_HEIGHT_PERCENTAGE = 'height-percentage';
var PROPERTY_HEIGHT_PERCENTAGE_FULL = 'height-percentage-full';
var PROPERTY_HEIGHT_MIN = 'height-min';
var PROPERTY_PADDING = 'padding';
var PROPERTY_PADDING_TOP = 'padding-top';
var PROPERTY_PADDING_RIGHT = 'padding-right';
var PROPERTY_PADDING_BOTTOM = 'padding-bottom';
var PROPERTY_PADDING_LEFT = 'padding-left';
var PROPERTY_MARGIN = 'margin';
var PROPERTY_MARGIN_TOP = 'margin-top';
var PROPERTY_MARGIN_RIGHT = 'margin-right';
var PROPERTY_MARGIN_BOTTOM = 'margin-bottom';
var PROPERTY_MARGIN_LEFT = 'margin-left';
var PROPERTY_STACK_HORIZONTALLY_TOP = 'stack-horizontally-top';
var PROPERTY_STACK_HORIZONTALLY_MIDDLE = 'stack-horizontally-middle';
var PROPERTY_STACK_HORIZONTALLY_BOTTOM = 'stack-horizontally-bottom';
var PROPERTY_STACK_VERTICALLY_LEFT = 'stack-vertically-left';
var PROPERTY_STACK_VERTICALLY_CENTER = 'stack-vertically-center';
var PROPERTY_STACK_VERTICALLY_RIGHT = 'stack-vertically-right';
var PROPERTY_CENTER_HORIZONTALLY = 'center-horizontally';
var PROPERTY_CENTER_VERTICALLY = 'center-vertically';

var PROPERTY_MAP = {
    '(c)(\\+|\\-)?\\d*':        PROPERTY_CENTER_HORIZONTALLY,
    '(h)':                      PROPERTY_CENTER_HORIZONTALLY,
    '(h)\\d+':                  PROPERTY_HEIGHT_STATIC,
    '(h)\\d+%':                 PROPERTY_HEIGHT_PERCENTAGE,
    '(h)\\d+%%':                PROPERTY_HEIGHT_PERCENTAGE_FULL,
    '(h)\\>\\d+':               PROPERTY_HEIGHT_MIN,
    '(h)(\\+|\\-)\\d+':         PROPERTY_HEIGHT_ADDITION,
    '(m|margin|trbl|bg)':       PROPERTY_MARGIN,
    '(mb|b)\\-?\\d*':           PROPERTY_MARGIN_BOTTOM,
    '(ml|l)\\-?\\d*':           PROPERTY_MARGIN_LEFT,
    '(mr|r)\\-?\\d*':           PROPERTY_MARGIN_RIGHT,
    '(mt|t)\\-?\\d*':           PROPERTY_MARGIN_TOP,
    '(p|padding)':              PROPERTY_PADDING,
    '(pb)\\-?\\d*':             PROPERTY_PADDING_BOTTOM,
    '(pl)\\-?\\d*':             PROPERTY_PADDING_LEFT,
    '(pr)\\-?\\d*':             PROPERTY_PADDING_RIGHT,
    '(pt)\\-?\\d*':             PROPERTY_PADDING_TOP,
    '(v)(\\+|\\-)?\\d*':        PROPERTY_CENTER_VERTICALLY,
    '(v)':                      PROPERTY_CENTER_VERTICALLY,
    '(w)\\d+':                  PROPERTY_WIDTH_STATIC,
    '(w)\\d+%':                 PROPERTY_WIDTH_PERCENTAGE,
    '(w)\\d+%%':                PROPERTY_WIDTH_PERCENTAGE_FULL,
    '(w)\\>\\d+':               PROPERTY_WIDTH_MIN,
    '(w)(\\+|\\-)\\d+':         PROPERTY_WIDTH_ADDITION,
    '(x)\\-?\\d+':              PROPERTY_STACK_HORIZONTALLY_MIDDLE,
    '(xb)\\-?\\d+':             PROPERTY_STACK_HORIZONTALLY_BOTTOM,
    '(xt)\\-?\\d+':             PROPERTY_STACK_HORIZONTALLY_TOP,
    '(y)\\-?\\d+':              PROPERTY_STACK_VERTICALLY_CENTER,
    '(yl)\\-?\\d+':             PROPERTY_STACK_VERTICALLY_LEFT,
    '(yr)\\-?\\d+':             PROPERTY_STACK_VERTICALLY_RIGHT,
};

// -----------------------------------------------------------

var CLASS_ARTBOARD = 'MSArtboardGroup';
var CLASS_GROUP = 'MSLayerGroup';
var CLASS_SHAPE = 'MSShapeGroup';
var CLASS_SYMBOL_INSTANCE = 'MSSymbolInstance';
var CLASS_SYMBOL_MASTER = 'MSSymbolMaster';
var CLASS_TEXT = 'MSTextLayer';

// -----------------------------------------------------------

global.PROPERTIES_RE = PROPERTIES_RE;
global.PROPERTIES_RE_IGNORE = PROPERTIES_RE_IGNORE;
global.PROPERTIES_RE_PADDING = PROPERTIES_RE_PADDING;
global.PROPERTIES_SEP = PROPERTIES_SEP;
global.PROPERTY_WIDTH_STATIC = PROPERTY_WIDTH_STATIC;
global.PROPERTY_WIDTH_ADDITION = PROPERTY_WIDTH_ADDITION;
global.PROPERTY_WIDTH_PERCENTAGE = PROPERTY_WIDTH_PERCENTAGE;
global.PROPERTY_WIDTH_PERCENTAGE_FULL = PROPERTY_WIDTH_PERCENTAGE_FULL;
global.PROPERTY_WIDTH_MIN = PROPERTY_WIDTH_MIN;
global.PROPERTY_HEIGHT_STATIC = PROPERTY_HEIGHT_STATIC;
global.PROPERTY_HEIGHT_ADDITION = PROPERTY_HEIGHT_ADDITION;
global.PROPERTY_HEIGHT_PERCENTAGE = PROPERTY_HEIGHT_PERCENTAGE;
global.PROPERTY_HEIGHT_PERCENTAGE_FULL = PROPERTY_HEIGHT_PERCENTAGE_FULL;
global.PROPERTY_HEIGHT_MIN = PROPERTY_HEIGHT_MIN;
global.PROPERTY_PADDING = PROPERTY_PADDING;
global.PROPERTY_MARGIN = PROPERTY_MARGIN;
global.PROPERTY_MARGIN_TOP = PROPERTY_MARGIN_TOP;
global.PROPERTY_MARGIN_RIGHT = PROPERTY_MARGIN_RIGHT;
global.PROPERTY_MARGIN_BOTTOM = PROPERTY_MARGIN_BOTTOM;
global.PROPERTY_MARGIN_LEFT = PROPERTY_MARGIN_LEFT;
global.PROPERTY_STACK_HORIZONTALLY_TOP = PROPERTY_STACK_HORIZONTALLY_TOP;
global.PROPERTY_STACK_HORIZONTALLY_MIDDLE = PROPERTY_STACK_HORIZONTALLY_MIDDLE;
global.PROPERTY_STACK_HORIZONTALLY_BOTTOM = PROPERTY_STACK_HORIZONTALLY_BOTTOM;
global.PROPERTY_STACK_VERTICALLY_LEFT = PROPERTY_STACK_VERTICALLY_LEFT;
global.PROPERTY_STACK_VERTICALLY_CENTER = PROPERTY_STACK_VERTICALLY_CENTER;
global.PROPERTY_STACK_VERTICALLY_RIGHT = PROPERTY_STACK_VERTICALLY_RIGHT;
global.PROPERTY_CENTER_HORIZONTALLY = PROPERTY_CENTER_HORIZONTALLY;
global.PROPERTY_CENTER_VERTICALLY = PROPERTY_CENTER_VERTICALLY;
global.PROPERTY_MAP = PROPERTY_MAP;
global.CLASS_ARTBOARD = CLASS_ARTBOARD;
global.CLASS_GROUP = CLASS_GROUP;
global.CLASS_SHAPE = CLASS_SHAPE;
global.CLASS_SYMBOL_INSTANCE = CLASS_SYMBOL_INSTANCE;
global.CLASS_SYMBOL_MASTER = CLASS_SYMBOL_MASTER;
global.CLASS_TEXT = CLASS_TEXT;
