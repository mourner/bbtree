'use strict';

module.exports = bbtree;


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
            path = [],
            dir, c;

        while (true) {
            c = compare(key, node.key);
            if (!c) return this;

            path.push(node);
            dir = c < 0 ? 'left' : 'right';

            if (node[dir] === bottom) {
                node[dir] = new Node(key, bottom, bottom, 1);
                break;
            }
            node = node[dir];
        }

        for (var i = path.length - 1; i >= 0; i--) {

            node = skew(path[i]);
            node = split(node);

            if (i) {
                dir = path[i - 1].left === path[i] ? 'left' : 'right';
                path[i - 1][dir] = node;

            } else this.root = node;
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

