
var Benchmark = require('benchmark'),
    bbtree = require('./bbtree'),
    dsjslib = require('dsjslib'),
    bintrees = require('bintrees');
    binarySearchTree = require('binary-search-tree'),
    functionalRBTree = require('functional-red-black-tree');

var data = [],
    N = 1000;

for (var i = 0; i < N; i++) {
    data[i] = Math.floor(Math.random() * N);
}

console.log('insert ' + N + ' items:');

function compare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

new Benchmark.Suite()
.add('bbtree', function () {
    var tree = bbtree(compare);
    for (var i = 0; i < N; i++) {
        tree.insert(data[i]);
    }
})
.add('functional-red-black-tree', function () {
    var tree = functionalRBTree(compare);
    for (var i = 0; i < N; i++) {
        tree.insert(data[i]);
    }
})
.add('jsbintrees RBTree', function () {
    var tree = new bintrees.RBTree(compare);
    for (var i = 0; i < N; i++) {
        tree.insert(data[i]);
    }
})
.add('dsjslib AVLTree', function () {
    var tree = new dsjslib.AVLTree(compare);
    for (var i = 0; i < N; i++) {
        tree.put(data[i]);
    }
})
.add('dsjslib SkipList', function () {
    var tree = new dsjslib.SkipList(compare);
    for (var i = 0; i < N; i++) {
        tree.put(data[i]);
    }
})
.add('binary-search-tree AVLTree', function () {
    var tree = new binarySearchTree.AVLTree({compareKeys: compare});
    for (var i = 0; i < N; i++) {
        tree.insert(data[i]);
    }
})
.on('error', function(event) {
    console.log(event.target.error);
})
.on('cycle', function(event) {
    console.log(String(event.target));
})
.run();
