
function RegExpMap(entries) {
    this._entries = entries;
}

RegExpMap.new = function(entries) {
    return new RegExpMap(entries)
}

RegExpMap.prototype.find = function(str) {
    for (var i = 0; i < this._entries.length; i++) {
        var entry = this._entries[i]
        if (entry.regexp().test(str)) {
            return entry.value();
        }
    }
}

RegExpMap.prototype.replace = function(str, replaceOne) {
    for (var i = 0; i < this._entries.length; i++) {
        var entry = this._entries[i]
        if (entry.regexp().test(str)) {
            str = str.replace(entry.regexp(), entry.value());
            if (replaceOne) {
                return str
            }
        }
    }
    return str
}

// -----------------------------------------------------------

function RegExpMapEntry(regexp, value) {
    this._regexp = regexp.regexp('i');
    this._value = value;
}

RegExpMapEntry.new = function(regexp, value) {
    return new RegExpMapEntry(regexp, value);
}

RegExpMapEntry.prototype.regexp = function() {
    return this._regexp;
}

RegExpMapEntry.prototype.value = function() {
    return this._value;
}

// -----------------------------------------------------------

var PROPERTY_MAP = RegExpMap.new([
    RegExpMapEntry.new('(c)(\\+|\\-)?\\d*', PROPERTY_CENTER_HORIZONTALLY),
    RegExpMapEntry.new('(h)', PROPERTY_CENTER_HORIZONTALLY),
    RegExpMapEntry.new('(h)(\\+|\\-)\\d+', PROPERTY_HEIGHT_ADDITION),
    RegExpMapEntry.new('(h)\\>\\d+', PROPERTY_HEIGHT_MIN),
    RegExpMapEntry.new('(h)\\d+', PROPERTY_HEIGHT_STATIC),
    RegExpMapEntry.new('(h)\\d+%', PROPERTY_HEIGHT_PERCENTAGE),
    RegExpMapEntry.new('(h)\\d+%%', PROPERTY_HEIGHT_PERCENTAGE_FULL),
    RegExpMapEntry.new('(mb|b)\\-?\\d*', PROPERTY_MARGIN_BOTTOM),
    RegExpMapEntry.new('(ml|l)\\-?\\d*', PROPERTY_MARGIN_LEFT),
    RegExpMapEntry.new('(mr|r)\\-?\\d*', PROPERTY_MARGIN_RIGHT),
    RegExpMapEntry.new('(mt|t)\\-?\\d*', PROPERTY_MARGIN_TOP),
    RegExpMapEntry.new('(pb)\\-?\\d*', PROPERTY_PADDING_BOTTOM),
    RegExpMapEntry.new('(pl)\\-?\\d*', PROPERTY_PADDING_LEFT),
    RegExpMapEntry.new('(pr)\\-?\\d*', PROPERTY_PADDING_RIGHT),
    RegExpMapEntry.new('(pt)\\-?\\d*', PROPERTY_PADDING_TOP),
    RegExpMapEntry.new('(v)', PROPERTY_CENTER_VERTICALLY),
    RegExpMapEntry.new('(v)(\\+|\\-)?\\d*', PROPERTY_CENTER_VERTICALLY),
    RegExpMapEntry.new('(w)(\\+|\\-)\\d+', PROPERTY_WIDTH_ADDITION),
    RegExpMapEntry.new('(w)\\>\\d+', PROPERTY_WIDTH_MIN),
    RegExpMapEntry.new('(w)\\d+', PROPERTY_WIDTH_STATIC),
    RegExpMapEntry.new('(w)\\d+%', PROPERTY_WIDTH_PERCENTAGE),
    RegExpMapEntry.new('(w)\\d+%%', PROPERTY_WIDTH_PERCENTAGE_FULL),
    RegExpMapEntry.new('(x)\\-?\\d*', PROPERTY_STACK_HORIZONTALLY_MIDDLE),
    RegExpMapEntry.new('(xb)\\-?\\d*', PROPERTY_STACK_HORIZONTALLY_BOTTOM),
    RegExpMapEntry.new('(xt)\\-?\\d*', PROPERTY_STACK_HORIZONTALLY_TOP),
    RegExpMapEntry.new('(y)\\-?\\d*', PROPERTY_STACK_VERTICALLY_CENTER),
    RegExpMapEntry.new('(yl)\\-?\\d*', PROPERTY_STACK_VERTICALLY_LEFT),
    RegExpMapEntry.new('(yr)\\-?\\d*', PROPERTY_STACK_VERTICALLY_RIGHT),
]);

var PROPERTY_MODIFY_VALUE_MAP = RegExpMap.new([
    RegExpMapEntry.new(/[^\-\d]/g, ''),
])

var PROPERTY_MODIFY_MAP = RegExpMap.new([
    RegExpMapEntry.new(/^:/, ''),
    RegExpMapEntry.new(/:$/, ''),
    RegExpMapEntry.new(/:{2,}/g, ':'),
])

var PROPERTY_MODIFY_PADDING_MAP = RegExpMap.new([
    RegExpMapEntry.new(/(?:^|:)([\d]+):([\d]+):([\d]+):([\d]+)(?:$|:)/, ':pt$1:pr$2:pb$3:pl$4:'),
    RegExpMapEntry.new(/(?:^|:)([\d]+):([\d]+):([\d]+)(?:$|:)/, ':pt$1:pr$2:pb$3:pl$2:'),
    RegExpMapEntry.new(/(?:^|:)([\d]+):([\d]+)(?:$|:)/, ':pt$1:pr$2:pb$1:pl$2:'),
    RegExpMapEntry.new(/(?:^|:)([\d]+)(?:$|:)/, ':pt$1:pr$1:pb$1:pl$1:'),
    RegExpMapEntry.new(/(?:^|:)(p|padding)(?:$|:)/i, ':pt:pr:pb:pl:'),
]);

var PROPERTY_MODIFY_MARGIN_MAP = RegExpMap.new([
    RegExpMapEntry.new(/(?:^|:)(m|margin|trbl|bg)(?:$|:)/i, ':b:r:t:l:'),
]);

// -----------------------------------------------------------

global.RegExpMap = RegExpMap
global.RegExpMapEntry = RegExpMapEntry

global.PROPERTY_MAP = PROPERTY_MAP;
global.PROPERTY_MODIFY_VALUE_MAP = PROPERTY_MODIFY_VALUE_MAP;
global.PROPERTY_MODIFY_MAP = PROPERTY_MODIFY_MAP;
global.PROPERTY_MODIFY_PADDING_MAP = PROPERTY_MODIFY_PADDING_MAP;
global.PROPERTY_MODIFY_MARGIN_MAP = PROPERTY_MODIFY_MARGIN_MAP;
