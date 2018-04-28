
var IGNORE_RE = new RegExp("\\[ignore\\]", "i");

var PROPERTIES_RE = new RegExp("\\[([^\\]]+)\\]");
var PROPERTIES_SEP = ":";
var PROPERTY_PADDING_RE = new RegExp("^\\d+$");

var PROPERTY_MAP = {
    "(w)\\d+":              "width",
    "(w)(\\+|\\-)\\d+":     "width-addition",
    "(w)\\d+%":             "width-percentage",
    "(w)\\d+%%":            "width-percentage-full",
    "(w)\\>\\d+":           "width-min",
    "(h)\\d+":              "height",
    "(h)(\\+|\\-)\\d+":     "height-addition",
    "(h)\\d+%":             "height-percentage",
    "(h)\\d+%%":            "height-percentage-full",
    "(h)\\>\\d+":           "height-min",
    "padding":              "padding",
    "(bg|trbl|m)":          "margin",
    "(t|mt)\\-?\\d*":       "margin-top",
    "(r|mr)\\-?\\d*":       "margin-right",
    "(b|mb)\\-?\\d*":       "margin-bottom",
    "(l|ml)\\-?\\d*":       "margin-left",
    "(xt)\\-?\\d+":         "stack-horizontally-top",
    "(x)\\-?\\d+":          "stack-horizontally-middle",
    "(xb)\\-?\\d+":         "stack-horizontally-bottom",
    "(yl)\\-?\\d+":         "stack-vertically-left",
    "(y)\\-?\\d+":          "stack-vertically-center",
    "(yr)\\-?\\d+":         "stack-vertically-right",
    "(h|c)(\\+|\\-)?\\d*":  "center-horizontally",
    "(v)(\\+|\\-)?\\d*":    "center-vertically",
}

// -----------------------------------------------------------

global.IGNORE_RE = IGNORE_RE

global.PROPERTIES_RE = PROPERTIES_RE
global.PROPERTIES_SEP = PROPERTIES_SEP
global.PROPERTY_PADDING_RE = PROPERTY_PADDING_RE

global.PROPERTY_PADDING_RE = PROPERTY_PADDING_RE

global.PROPERTY_MAP = PROPERTY_MAP
