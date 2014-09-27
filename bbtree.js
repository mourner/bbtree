'use strict';

if (typeof module !== 'undefined') module.exports = bbtree;

function Node(key, level, left, right) {
    this.key = key;
    this.level = level;
    this.left = left;
    this.right = right;
}

var bottom = new Node(null, 0);
bottom.left = bottom;
bottom.right = bottom;

function newNode(key) {
    return new Node(key, 1, bottom, bottom);
}

function bbtree(compareFn) {
    return new BBTree(compareFn);
}

function BBTree(compareFn) {
    this._compare = compareFn || defaultCompare;
    this._path = [];
}

BBTree.prototype = {

    load: function (data) {
        for (var i = 0; i < data.length; i++) {
            this.insert(data[i]);
        }
        return this;
    },

    insert: function (key) {

        var compare = this._compare,
            node = this.root,
            path = this._path;

        if (!node) {
            this.root = newNode(key);
            return this;
        }

        var k = 0;

        while (true) {
            var c = compare(key, node.key);
            if (!c) return this;

            path[k] = node;
            k++;

            if (c < 0) {
                if (node.left === bottom) { node.left = newNode(key); break; }
                node = node.left;

            } else {
                if (node.right === bottom) { node.right = newNode(key); break; }
                node = node.right;
            }
        }

        this._rebalance(path, k);

        return this;
    },

    _rebalance: function (path, k) {

        var rotated, node, parent, updated, m = 0;

        for (var i = k - 1; i >= 0; i--) {
            rotated = node = path[i];

            if (node.level === node.left.level && node.level === node.right.level) {
                updated = true;
                node.level++;

            } else {
                rotated = skew(node);
                rotated = split(rotated);
            }

            if (rotated !== node) {
                updated = true;
                if (i) {
                    parent = path[i - 1];
                    if (parent.left === node) parent.left = rotated;
                    else parent.right = rotated;

                } else this.root = rotated;
            }
            if (!updated) m++;
            if (m === 2) break;
        }
    }
};

function defaultCompare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

function skew(node) {
    if (node.left.level === node.level) {
        var temp = node;
        node = node.left;
        temp.left = node.right;
        node.right = temp;
    }
    return node;
}

function split(node) {
    if (node.right.right.level === node.level) {
        var temp = node;
        node = node.right;
        temp.right = node.left;
        node.left = temp;
        node.level++;
    }
    return node;
}
