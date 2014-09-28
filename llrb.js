'use strict';

module.exports = llrb;

function llrb(compare) {
    return new LLRBTree(compare);
}

function LLRBTree(compare) {
    this.compare = compare || defaultCompare;
}

LLRBTree.prototype = {

    find: function (key) {
        var n = this.root,
            cmp = this.compare;

        while (n) {
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

function Node(key, value, red) {
    this.key = key;
    this.value = value;
    this.red = red;
    this.left = null;
    this.right = null;
}

function insert(h, key, value, compare) {
    if (!h) return new Node(key, value, true);

    var c = compare(key, h.key);

    if (c < 0) h.left = insert(h.left, key, value, compare);
    else if (c > 0) h.right = insert(h.right, key, value, compare);
    else h.value = value;

    if (isRed(h.right) && !isRed(h.left)) h = rotateLeft(h);
    if (isRed(h.left) && isRed(h.left.left)) h = rotateRight(h);
    if (isRed(h.left) && isRed(h.right)) flipColors(h);

    return h;
}

function defaultCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

function isRed(h) {
    return h && h.red;
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
