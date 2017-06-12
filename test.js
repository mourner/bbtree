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

test('find an item', function (t) {
    var tree = bbtree(),
        obj = {foo: 5};

    tree.insert(6)
        .insert(5)
        .insert(4, obj)
        .insert(3)
        .insert(2);

    t.equal(tree.find(4).value, obj);

    t.end();
});

test('find closest item', function (t) {
    var compare = function (a, b) {
        return a - b;
    }
    var tree = bbtree(compare),
        obj = {foo: 5},
        obj2 = {bar: 7};

    tree.insert(7, obj2)
        .insert(4, obj)
        .insert(3)
        .insert(2);

    // closest match
    t.equal(tree.closest(5).value, obj);
    t.equal(tree.closest(6).value, obj2);

    // still works for exact match
    t.equal(tree.closest(7).value, obj2);
    t.equal(tree.closest(2).key, 2);

    t.end();
});
