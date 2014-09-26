'use strict';


function Node(key, left, right, level) {
    this.left = left;
    this.right = right;
    this.level = level;
    this.key = key;
}


function BBTree(compareFn) {
    this._compare = compareFn;

    var bottom = this._bottom = new Node();
    bottom.left = bottom;
    bottom.right = bottom;
    bottom.level = 0;
}

BBTree.prototype = {

    insert: function (key) {

        var bottom = this._bottom,
            skew = this._skew,
            split = this._split,
            compare = this._compare;

        if (!this.root) {
            this.root = new Node(key, bottom, bottom, 1);
            return true;
        }

        var node = this.root,
            path = [],
            dir, c;

        while (true) {
            c = compare(key, t.key);
            if (!c) return null;

            path.push(node);

            dir = c ? 'left' : 'right';

            if (node[dir] === bottom) {
                node[dir] = new Node(key, bottom, bottom, 1);
                break;
            }

            node = node[dir];
        }

        for (var i = path.length - 1; i >= 0; i--) {
            skew(path[i]);
            split(path[i]);
        }
    },

    _skew: function (t) {
        if (t.left.level === t.level) {
            var temp = t;
            t = t.left;
            temp.left = t.right;
            t.right = temp;
        }
    },

    _split: function (t) {
        if (t.right.right.level === t.level) {
            var temp = t;
            t = t.right;
            temp.right = t.left;
            t.left = temp;
            t.level++;
        }
    }
};

