'use strict';

if (typeof module !== 'undefined') module.exports = bbtree;

function Node(key, left, right, level) {
    this.key = key;
    this.left = left;
    this.right = right;
    this.level = level;
}

var bottom = new Node(null, null, null, 0);
bottom.left = bottom;
bottom.right = bottom;

function bbtree(compareFn) {
    // jshint validthis: true
    if (!(this instanceof bbtree)) return new bbtree(compareFn);

    this._compare = compareFn || defaultCompare;
}

bbtree.prototype = {

    load: function (data) {
        for (var i = 0; i < data.length; i++) {
            this.insert(data[i]);
        }
        return this;
    },

    insert: function (key) {

        var compare = this._compare,
            newNode = new Node(key, bottom, bottom, 1);

        if (!this.root) {
            this.root = newNode;
            return this;
        }

        var node = this.root,
            path = [];

        while (true) {
            var c = compare(key, node.key);
            if (!c) return this;

            path.push(node);

            if (c < 0) {
                if (node.left === bottom) { node.left = newNode; break; }
                node = node.left;

            } else {
                if (node.right === bottom) { node.right = newNode; break; }
                node = node.right;
            }
        }

        this._rebalance(path);

        return this;
    },

    _rebalance: function (path) {

        var rotated, node, parent, updated;

        for (var i = path.length - 1; i >= 0; i--) {
            rotated = node = path[i];
            updated = false;

            if (node.level === node.left.level && node.level === node.right.level) {
                node.level++;
                updated = true;

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

            if (!updated) break;
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


