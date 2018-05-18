
var index = require('../index');

function RegExpMap(entries) {
    this._entries = entries;
}

RegExpMap.init = function(entries) {
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

RegExpMapEntry.init = function(regexp, value) {
    return new RegExpMapEntry(regexp, value);
}

RegExpMapEntry.prototype.regexp = function() {
    return this._regexp;
}

RegExpMapEntry.prototype.value = function() {
    return this._value;
}

// -----------------------------------------------------------

var PROPERTY_KEY_MAP = RegExpMap.init([
    RegExpMapEntry.init('(c)(\\+|\\-)?\\d*', index.const.PROPERTY_KEY_CENTER_HORIZONTALLY),
    RegExpMapEntry.init('(h)', index.const.PROPERTY_KEY_CENTER_HORIZONTALLY),
    RegExpMapEntry.init('(h)(\\+|\\-)\\d+', index.const.PROPERTY_KEY_HEIGHT_ADDITION),
    RegExpMapEntry.init('(h)\\>\\d+', index.const.PROPERTY_KEY_HEIGHT_MIN),
    RegExpMapEntry.init('(h)\\d+', index.const.PROPERTY_KEY_HEIGHT_STATIC),
    RegExpMapEntry.init('(h)\\d+%', index.const.PROPERTY_KEY_HEIGHT_PERCENTAGE),
    RegExpMapEntry.init('(h)\\d+%%', index.const.PROPERTY_KEY_HEIGHT_PERCENTAGE_FULL),
    RegExpMapEntry.init('(mb|b)\\-?\\d*', index.const.PROPERTY_KEY_MARGIN_BOTTOM),
    RegExpMapEntry.init('(ml|l)\\-?\\d*', index.const.PROPERTY_KEY_MARGIN_LEFT),
    RegExpMapEntry.init('(mr|r)\\-?\\d*', index.const.PROPERTY_KEY_MARGIN_RIGHT),
    RegExpMapEntry.init('(mt|t)\\-?\\d*', index.const.PROPERTY_KEY_MARGIN_TOP),
    RegExpMapEntry.init('(pb)\\-?\\d*', index.const.PROPERTY_KEY_PADDING_BOTTOM),
    RegExpMapEntry.init('(pl)\\-?\\d*', index.const.PROPERTY_KEY_PADDING_LEFT),
    RegExpMapEntry.init('(pr)\\-?\\d*', index.const.PROPERTY_KEY_PADDING_RIGHT),
    RegExpMapEntry.init('(pt)\\-?\\d*', index.const.PROPERTY_KEY_PADDING_TOP),
    RegExpMapEntry.init('(v)', index.const.PROPERTY_KEY_CENTER_VERTICALLY),
    RegExpMapEntry.init('(v)(\\+|\\-)?\\d*', index.const.PROPERTY_KEY_CENTER_VERTICALLY),
    RegExpMapEntry.init('(w)(\\+|\\-)\\d+', index.const.PROPERTY_KEY_WIDTH_ADDITION),
    RegExpMapEntry.init('(w)\\>\\d+', index.const.PROPERTY_KEY_WIDTH_MIN),
    RegExpMapEntry.init('(w)\\d+', index.const.PROPERTY_KEY_WIDTH_STATIC),
    RegExpMapEntry.init('(w)\\d+%', index.const.PROPERTY_KEY_WIDTH_PERCENTAGE),
    RegExpMapEntry.init('(w)\\d+%%', index.const.PROPERTY_KEY_WIDTH_PERCENTAGE_FULL),
    RegExpMapEntry.init('(x)\\-?\\d*', index.const.PROPERTY_KEY_STACK_HORIZONTALLY_MIDDLE),
    RegExpMapEntry.init('(xb)\\-?\\d*', index.const.PROPERTY_KEY_STACK_HORIZONTALLY_BOTTOM),
    RegExpMapEntry.init('(xt)\\-?\\d*', index.const.PROPERTY_KEY_STACK_HORIZONTALLY_TOP),
    RegExpMapEntry.init('(y)\\-?\\d*', index.const.PROPERTY_KEY_STACK_VERTICALLY_CENTER),
    RegExpMapEntry.init('(yl)\\-?\\d*', index.const.PROPERTY_KEY_STACK_VERTICALLY_LEFT),
    RegExpMapEntry.init('(yr)\\-?\\d*', index.const.PROPERTY_KEY_STACK_VERTICALLY_RIGHT),
]);

var PROPERTY_VALUE_MAP = RegExpMap.init([
    RegExpMapEntry.init(/[^\-\d]/g, ''),
])

var PROPERTY_MODIFY_MAP = RegExpMap.init([
    RegExpMapEntry.init(/^:/, ''),
    RegExpMapEntry.init(/:$/, ''),
    RegExpMapEntry.init(/:{2,}/g, ':'),
])

var PROPERTY_MODIFY_PADDING_MAP = RegExpMap.init([
    RegExpMapEntry.init(/(?:^|:)([\d]+):([\d]+):([\d]+):([\d]+)(?:$|:)/, ':pt$1:pr$2:pb$3:pl$4:'),
    RegExpMapEntry.init(/(?:^|:)([\d]+):([\d]+):([\d]+)(?:$|:)/, ':pt$1:pr$2:pb$3:pl$2:'),
    RegExpMapEntry.init(/(?:^|:)([\d]+):([\d]+)(?:$|:)/, ':pt$1:pr$2:pb$1:pl$2:'),
    RegExpMapEntry.init(/(?:^|:)([\d]+)(?:$|:)/, ':pt$1:pr$1:pb$1:pl$1:'),
    RegExpMapEntry.init(/(?:^|:)(p|padding)(?:$|:)/i, ':pt:pr:pb:pl:'),
]);

var PROPERTY_MODIFY_MARGIN_MAP = RegExpMap.init([
    RegExpMapEntry.init(/(?:^|:)(m|margin|trbl|bg)(?:$|:)/i, ':b:r:t:l:'),
]);

// -----------------------------------------------------------

module.exports = {
    PROPERTY_KEY_MAP,
    PROPERTY_VALUE_MAP,
    PROPERTY_MODIFY_MAP,
    PROPERTY_MODIFY_PADDING_MAP,
    PROPERTY_MODIFY_MARGIN_MAP
};
