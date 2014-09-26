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

