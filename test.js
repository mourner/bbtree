'use strict';

var test = require('tape').test,
    bbtree = require('./bbtree.js');

test('inserts root node', function (t) {
    var tree = bbtree();
    tree.insert(1);

    t.equal(tree.root.key, 1);
    t.equal(tree.root.level, 1);

    t.end();
});


test('insert some more items', function (t) {
    var tree = bbtree();

    tree.insert(6)
        .insert(5)
        .insert(4)
        .insert(3)
        .insert(2);

    t.equal(tree.root.key, 3);
    t.equal(tree.root.left.key, 2);
    t.equal(tree.root.left.left.key, null);
    t.equal(tree.root.left.right.key, null);
    t.equal(tree.root.right.key, 5);
    t.equal(tree.root.right.left.key, 4);
    t.equal(tree.root.right.right.key, 6);

    t.end();
});


test('load an array', function (t) {
    var tree = bbtree();

    tree.load([6, 5, 4, 3, 2]);

    t.equal(tree.root.key, 3);
    t.equal(tree.root.level, 2);

    t.end();
});
