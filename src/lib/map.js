
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
        if (entry.test(str)) {
            str = entry.replace(str);
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

RegExpMapEntry.prototype.replace = function(str) {
    return str.replace(this.regexp(), this.value())
}

RegExpMapEntry.prototype.test = function(str) {
    return this.regexp().test(str)
}

// -----------------------------------------------------------

var keys = RegExpMap.init([
    RegExpMapEntry.init('(c)(\\+|\\-)?\\d*', index.const.property.key.centerHorizontally),
    RegExpMapEntry.init('(h)', index.const.property.key.centerHorizontally),
    RegExpMapEntry.init('(h)(\\+|\\-)\\d+', index.const.property.key.heightAddition),
    RegExpMapEntry.init('(h)\\>\\d+', index.const.property.key.heightMin),
    RegExpMapEntry.init('(h)\\d+', index.const.property.key.heightStatic),
    RegExpMapEntry.init('(h)\\d+%', index.const.property.key.heightPercentage),
    RegExpMapEntry.init('(h)\\d+%%', index.const.property.key.heightPercentageFull),
    RegExpMapEntry.init('(mb|b)\\-?\\d*', index.const.property.key.marginBottom),
    RegExpMapEntry.init('(ml|l)\\-?\\d*', index.const.property.key.marginLeft),
    RegExpMapEntry.init('(mr|r)\\-?\\d*', index.const.property.key.marginRight),
    RegExpMapEntry.init('(mt|t)\\-?\\d*', index.const.property.key.marginTop),
    RegExpMapEntry.init('(pb)\\-?\\d*', index.const.property.key.paddingBottom),
    RegExpMapEntry.init('(pl)\\-?\\d*', index.const.property.key.paddingLeft),
    RegExpMapEntry.init('(pr)\\-?\\d*', index.const.property.key.paddingRight),
    RegExpMapEntry.init('(pt)\\-?\\d*', index.const.property.key.paddingTop),
    RegExpMapEntry.init('(v)', index.const.property.key.centerVertically),
    RegExpMapEntry.init('(v)(\\+|\\-)?\\d*', index.const.property.key.centerVertically),
    RegExpMapEntry.init('(w)(\\+|\\-)\\d+', index.const.property.key.widthAddition),
    RegExpMapEntry.init('(w)\\>\\d+', index.const.property.key.widthMin),
    RegExpMapEntry.init('(w)\\d+', index.const.property.key.widthStatic),
    RegExpMapEntry.init('(w)\\d+%', index.const.property.key.widthPercentage),
    RegExpMapEntry.init('(w)\\d+%%', index.const.property.key.widthPercentageFull),
    RegExpMapEntry.init('(x)\\-?\\d*', index.const.property.key.stackHorizontallyMiddle),
    RegExpMapEntry.init('(xb)\\-?\\d*', index.const.property.key.stackHorizontallyBottom),
    RegExpMapEntry.init('(xt)\\-?\\d*', index.const.property.key.stackHorizontallyTop),
    RegExpMapEntry.init('(y)\\-?\\d*', index.const.property.key.stackVerticallyCenter),
    RegExpMapEntry.init('(yl)\\-?\\d*', index.const.property.key.stackVerticallyLeft),
    RegExpMapEntry.init('(yr)\\-?\\d*', index.const.property.key.stackVerticallyRight),
]);

var values = RegExpMap.init([
    RegExpMapEntry.init(/[^\-\d]/g, ''),
])

var generic = RegExpMap.init([
    RegExpMapEntry.init(/^:/, ''),
    RegExpMapEntry.init(/:$/, ''),
    RegExpMapEntry.init(/:{2,}/g, ':'),
])

var margin = RegExpMap.init([
    RegExpMapEntry.init(/(?:^|:)(m|margin|trbl|bg)(?:$|:)/i, ':b:r:t:l:'),
]);

var padding = RegExpMap.init([
    RegExpMapEntry.init(/(?:^|:)([\d]+):([\d]+):([\d]+):([\d]+)(?:$|:)/, ':pt$1:pr$2:pb$3:pl$4:'),
    RegExpMapEntry.init(/(?:^|:)([\d]+):([\d]+):([\d]+)(?:$|:)/, ':pt$1:pr$2:pb$3:pl$2:'),
    RegExpMapEntry.init(/(?:^|:)([\d]+):([\d]+)(?:$|:)/, ':pt$1:pr$2:pb$1:pl$2:'),
    RegExpMapEntry.init(/(?:^|:)([\d]+)(?:$|:)/, ':pt$1:pr$1:pb$1:pl$1:'),
    RegExpMapEntry.init(/(?:^|:)(p|padding)(?:$|:)/i, ':pt:pr:pb:pl:'),
]);

// -----------------------------------------------------------

module.exports = {
    property: {
        keys,
        values,
        modify: {
            generic,
            margin,
            padding,
        },
    }
};
