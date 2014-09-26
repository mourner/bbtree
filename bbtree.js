'use strict';

if (typeof module !== 'undefined') module.exports = bbtree;


function Node(key, left, right, level) {
    this.left = left;
    this.right = right;
    this.level = level;
    this.key = key;
}


function bbtree(compareFn) {
    // jshint validthis: true
    if (!(this instanceof bbtree)) return new bbtree(compareFn);

    this._compare = compareFn || this._compare;

    var bottom = this._bottom = new Node();
    bottom.left = bottom;
    bottom.right = bottom;
    bottom.level = 0;
}

bbtree.prototype = {

    load: function (data) {
        for (var i = 0; i < data.length; i++) {
            this.insert(data[i]);
        }
        return this;
    },

    insert: function (key) {

        var bottom = this._bottom,
            skew = this._skew,
            split = this._split,
            compare = this._compare;

        if (!this.root) {
            this.root = new Node(key, bottom, bottom, 1);
            return this;
        }

        var node = this.root,
            path = [];

        while (true) {
            var c = compare(key, node.key);
            if (!c) return this;

            path.push(node);

            if (c < 0) {
                if (node.left === bottom) { node.left = new Node(key, bottom, bottom, 1); break; }
                node = node.left;

            } else {
                if (node.right === bottom) { node.right = new Node(key, bottom, bottom, 1); break; }
                node = node.right;
            }
        }

        for (var i = path.length - 1, current, parent, updated; i >= 0; i--) {
            current = path[i];
            updated = false;

            if (current.level === current.left.level && current.level === current.right.level) {
                current.level++;
                updated = true;

            } else {
                node = skew(current);
                node = split(node);
                updated = node !== current;
            }

            if (updated) {
                if (i) {
                    parent = path[i - 1];
                    if (parent.left === current) parent.left = node;
                    else parent.right = node;

                } else this.root = node;
            } else break;
        }

        return this;
    },

    _skew: function (node) {
        if (node.left.level === node.level) {
            var temp = node;
            node = node.left;
            temp.left = node.right;
            node.right = temp;
        }
        return node;
    },

    _split: function (node) {
        if (node.right.right.level === node.level) {
            var temp = node;
            node = node.right;
            temp.right = node.left;
            node.left = temp;
            node.level++;
        }
        return node;
    },

    _compare: function (a, b) {
        return a < b ? -1 : a > b ? 1 : 0;
    }
};

