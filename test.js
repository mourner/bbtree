'use strict';

var test = require('tape').test,
    BBTree = require('./bbtree.js');

test('inserts root node', function (t) {
    var tree = new BBTree();
    tree.insert(1);

    t.equal(tree.root.key, 1);
    t.equal(tree.root.level, 1);

    t.end();
});


test('insert some more items', function (t) {
    var tree = new BBTree();

    tree.insert(6);
    tree.insert(5);
    tree.insert(4);
    tree.insert(3);
    tree.insert(2);

    t.equal(tree.root.key, 3);
    t.equal(tree.root.left.key, 2);
    t.equal(tree.root.left.left.key, undefined);
    t.equal(tree.root.left.right.key, undefined);
    t.equal(tree.root.right.key, 5);
    t.equal(tree.root.right.left.key, 4);
    t.equal(tree.root.right.right.key, 6);

    t.end();
});
