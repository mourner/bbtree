'use strict';

module.exports = bsarray;

// really simple pseudo-bst array wrapper

function bsarray(compare) {
    return new BSArray(compare);
};

function BSArray(compare) {
    this.compare = compare || defaultCompare;
    this.items = [];
}

function defaultCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

BSArray.prototype = {

    insert: function (key, value) {

        var items = this.items,
            compare = this.compare,
            i = 0,
            j = items.length - 1;

        while (i <= j) {
            var mid = Math.floor((i + j) / 2);
            var c = compare(key, items[mid].key);
            if (c === 0) {
                items[mid].value = value;
                return;
            }
            if (c < 0) j = mid - 1;
            else i = mid + 1;
        }

        items.splice(i < 0 ? 0 : i, 0, {key: key, value: value});
    },

    find: function (key) {

        var items = this.items,
            compare = this.compare,
            i = 0,
            j = items.length - 1;

        while (i <= j) {
            var mid = Math.floor((i + j) / 2);
            var c = compare(key, items[mid].key);
            if (c === 0) return mid;
            if (c < 0) j = mid - 1;
            else i = mid + 1;
        }
        return null;
    },

    remove: function (key) {
        var index = this.find(key);
        if (index !== null) this.removeAt(index);
    },

    removeAt: function (index) {
        this.items.splice(index, 1);
    }
};
