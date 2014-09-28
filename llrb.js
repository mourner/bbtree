'use strict';

module.exports = llrb;

function llrb(compare) {
    return new LLRBTree(compare);
}


function Node(key, value, red, left, right) {
    this.key = key;
    this.value = value;
    this.red = red;
    this.left = left;
    this.right = right;
}

var bottom = new Node(null, null, false);
bottom.left = bottom;
bottom.right = bottom;


function LLRBTree(compare) {
    this.compare = compare || defaultCompare;
    this.root = bottom;
}

LLRBTree.prototype = {

    find: function (key) {
        var n = this.root,
            cmp = this.compare;

        while (n !== bottom) {
            var c = cmp(key, n.key);
            if (c === 0) return n;
            n = c < 0 ? n.left : n.right;
        }
        return null;
    },

    insert: function (key, value) {
        this.root = insert(this.root, key, value, this.compare);
        this.root.red = false;
    }
};

function insert(h, key, value, compare) {
    if (h === bottom) return new Node(key, value, true, bottom, bottom);

    var c = compare(key, h.key);

    if (c < 0) h.left = insert(h.left, key, value, compare);
    else if (c > 0) h.right = insert(h.right, key, value, compare);
    else h.value = value;

    if (h.right.red && !h.left.red) h = rotateLeft(h);
    if (h.left.red && h.left.left.red) h = rotateRight(h);
    if (h.left.red && h.right.red) flipColors(h);

    return h;
}

function defaultCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

function rotateRight(h) {
    var x = h.left;
    h.left = x.right;
    x.right = h;
    x.red = h.red;
    h.red = true;
    return x;
}

function rotateLeft(h) {
    var x = h.right;
    h.right = x.left;
    x.left = h;
    x.red = h.red;
    h.red = true;
    return x;
}

function flipColors(h) {
    h.red = true;
    h.left.red = false;
    h.right.red = false;
}
