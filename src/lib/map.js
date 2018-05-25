
const index = require('..');

function RegExpMap(entries) {
    this._entries = entries || [];
}

RegExpMap.init = function(entries) {
    return new RegExpMap(entries)
}

RegExpMap.prototype.append = function(entry) {
    this._entries.append(entry)
}

RegExpMap.prototype.find = function(str) {
    for (var i = 0; i < this._entries.length; i++) {
        const entry = this._entries[i]
        if (entry.test(str)) {
            return entry.value();
        }
    }
}

RegExpMap.prototype.replace = function(str) {
    return this._entries.reduce(function(str, entry) {
        return entry.replace(str)
    }, str)
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
    if (this.test(str)) {
        return str.replace(this.regexp(), this.value())
    }
    return str
}

RegExpMapEntry.prototype.test = function(str) {
    return this.regexp().test(str)
}

// -----------------------------------------------------------

function StaticMap(entries) {
    this._entries = entries || [];
    this._dict = null
}

StaticMap.init = function(entries) {
    return new StaticMap(entries)
}

StaticMap.prototype.dict = function() {
    if (this._dict == null) {
        this._dict = {}
        for (var i = 0; i < this._entries.length; i++) {
            const entry = this._entries[i]
            this._dict[entry.key()] = entry.value()
        }
    }
    return this._dict
}

StaticMap.prototype.append = function(entry) {
    this._entries.append(entry)
    this._dict = null
}

StaticMap.prototype.find = function(str) {
    return this.dict()[str]
}

StaticMap.prototype.replace = function(str) {
    return this._entries.reduce(function(str, entry) {
        return entry.replace(str)
    }, str)
}

// -----------------------------------------------------------

function StaticMapEntry(key, value) {
    this._key = key;
    this._value = value;
}

StaticMapEntry.init = function(key, value) {
    return new StaticMapEntry(key, value);
}

StaticMapEntry.prototype.key = function() {
    return this._key;
}

StaticMapEntry.prototype.value = function() {
    return this._value;
}

StaticMapEntry.prototype.replace = function(str) {
    if (this.test(str)) {
        return this.value()
    }
    return str
}

StaticMapEntry.prototype.test = function(str) {
    return this.key() == str
}

// -----------------------------------------------------------

const keys = RegExpMap.init([
    RegExpMapEntry.init('(c)(\\+|\\-)?\\d*', index.const.property.key.centerHorizontally),
    RegExpMapEntry.init('(h)', index.const.property.key.centerHorizontally),
    RegExpMapEntry.init('(h)(\\+|\\-)\\d+', index.const.property.key.heightAddition),
    RegExpMapEntry.init('(h)\\<\\d+', index.const.property.key.heightMax),
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
    RegExpMapEntry.init('(w)\\<\\d+', index.const.property.key.widthMax),
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

const values = RegExpMap.init([
    RegExpMapEntry.init(/[^\-\d]/g, ''),
])

const types = StaticMap.init([
    StaticMapEntry.init(index.const.property.key.centerHorizontally, index.const.property.type.center),
    StaticMapEntry.init(index.const.property.key.centerHorizontally, index.const.property.type.center),
    StaticMapEntry.init(index.const.property.key.heightAddition, index.const.property.type.size),
    StaticMapEntry.init(index.const.property.key.heightMax, index.const.property.type.size),
    StaticMapEntry.init(index.const.property.key.heightMin, index.const.property.type.size),
    StaticMapEntry.init(index.const.property.key.heightStatic, index.const.property.type.size),
    StaticMapEntry.init(index.const.property.key.heightPercentage, index.const.property.type.size),
    StaticMapEntry.init(index.const.property.key.heightPercentageFull, index.const.property.type.size),
    StaticMapEntry.init(index.const.property.key.marginBottom, index.const.property.type.margin),
    StaticMapEntry.init(index.const.property.key.marginLeft, index.const.property.type.margin),
    StaticMapEntry.init(index.const.property.key.marginRight, index.const.property.type.margin),
    StaticMapEntry.init(index.const.property.key.marginTop, index.const.property.type.margin),
    StaticMapEntry.init(index.const.property.key.paddingBottom, index.const.property.type.padding),
    StaticMapEntry.init(index.const.property.key.paddingLeft, index.const.property.type.padding),
    StaticMapEntry.init(index.const.property.key.paddingRight, index.const.property.type.padding),
    StaticMapEntry.init(index.const.property.key.paddingTop, index.const.property.type.padding),
    StaticMapEntry.init(index.const.property.key.centerVertically, index.const.property.type.center),
    StaticMapEntry.init(index.const.property.key.centerVertically, index.const.property.type.center),
    StaticMapEntry.init(index.const.property.key.widthAddition, index.const.property.type.size),
    StaticMapEntry.init(index.const.property.key.widthMax, index.const.property.type.size),
    StaticMapEntry.init(index.const.property.key.widthMin, index.const.property.type.size),
    StaticMapEntry.init(index.const.property.key.widthStatic, index.const.property.type.size),
    StaticMapEntry.init(index.const.property.key.widthPercentage, index.const.property.type.size),
    StaticMapEntry.init(index.const.property.key.widthPercentageFull, index.const.property.type.size),
    StaticMapEntry.init(index.const.property.key.stackHorizontallyMiddle, index.const.property.type.stack),
    StaticMapEntry.init(index.const.property.key.stackHorizontallyBottom, index.const.property.type.stack),
    StaticMapEntry.init(index.const.property.key.stackHorizontallyTop, index.const.property.type.stack),
    StaticMapEntry.init(index.const.property.key.stackVerticallyCenter, index.const.property.type.stack),
    StaticMapEntry.init(index.const.property.key.stackVerticallyLeft, index.const.property.type.stack),
    StaticMapEntry.init(index.const.property.key.stackVerticallyRight, index.const.property.type.stack),
]);

const margin = RegExpMap.init([
    RegExpMapEntry.init(/\b(m|margin|bg|trbl)\b/i, 't:r:b:l'),
    RegExpMapEntry.init(/\b(tl|lt)(\d*)\b/i, 't$2:l$2'),
    RegExpMapEntry.init(/\b(tr|rt)(\d*)\b/i, 't$2:r$2'),
    RegExpMapEntry.init(/\b(bl|lb)(\d*)\b/i, 'b$2:l$2'),
    RegExpMapEntry.init(/\b(rb|br)(\d*)\b/i, 'r$2:b$2'),
]);

const padding = RegExpMap.init([
    RegExpMapEntry.init(/(^|:)(\d+)/, '$1p$2'),
    RegExpMapEntry.init(/p(\d+)((?:(?!:\d).)*):(\d+)/, 'ptb$1$2:prl$3'),
    RegExpMapEntry.init(/ptb(\d+)((?:(?!:\d).)*):(\d+)/, 'pt$1$2:pb$3'),
    RegExpMapEntry.init(/prl(\d+)((?:(?!:\d).)*):(\d+)/, 'pr$1$2:pl$3'),
    RegExpMapEntry.init(/\b(p|padding)(\d*)\b/i, 'pt$2:pr$2:pb$2:pl$2'),
    RegExpMapEntry.init(/\b(prl|plr)(\d*)\b/i, 'pr$2:pl$2'),
    RegExpMapEntry.init(/(ptb|pbt)(\d*)\b/i, 'pt$2:pb$2'),
]);

// -----------------------------------------------------------

module.exports = {
    RegExpMap,
    RegExpMapEntry,
    StaticMap,
    StaticMapEntry,

    property: {
        keys,
        values,
        types,
        modify: {
            margin,
            padding,
        },
    },
};
