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
    },

    removeMin: function () {
        var root = this.root;

        if (root === bottom) return;
        if (!root.left.red && !root.right.red) root.red = true;

        root = this.root = removeMin(root);
        root.red = false;
    },

    remove: function (key) {
        if (!this.find(key)) return;

        var root = this.root;

        if (!root.left.red && !root.right.red) root.red = true;

        root = this.root = remove(root, key, this.compare);
        root.red = false;
    }
};

function defaultCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

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

function removeMin(h) {
    if (h.left === bottom) return bottom;
    if (!h.left.red && !h.left.left.red) h = moveRedLeft(h);
    h.left = removeMin(h.left);
    return balance(h);
}

function remove(h, key, compare) {
    if (compare(key, h.key) < 0)  {
        if (!h.left.red && !h.left.left.red) h = moveRedLeft(h);
        h.left = remove(h.left, key, compare);

    } else {
        if (h.left.red) h = rotateRight(h);

        if (compare(key, h.key) === 0 && (h.right === bottom)) return bottom;

        if (!h.right.red && !h.right.left.red) h = moveRedRight(h);

        if (compare(key, h.key) === 0) {
            var x = min(h.right);
            h.key = x.key;
            h.val = x.val;
            h.right = removeMin(h.right);

        } else h.right = remove(h.right, key, compare);
    }
    return balance(h);
}

function min(x) {
    if (x.left === bottom) return x;
    else return min(x.left);
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
    h.red = !h.red;
    h.left.red = !h.left.red;
    h.right.red = !h.right.red;
}

function moveRedLeft(h) {
    flipColors(h);
    if (h.right.left.red) {
        h.right = rotateRight(h.right);
        h = rotateLeft(h);
    }
    return h;
}

function moveRedRight(h) {
    flipColors(h);
    if (h.left.left.red) h = rotateRight(h);
    return h;
}

function balance(h) {
    if (h.right.red) h = rotateLeft(h);
    if (h.left.red && h.left.left.red) h = rotateRight(h);
    if (h.left.red && h.right.red) flipColors(h);
    return h;
}
