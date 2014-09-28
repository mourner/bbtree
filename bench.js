
var Benchmark = require('benchmark'),
    bbtree = require('./bbtree'),
    functionalRBTree = require('functional-red-black-tree'),
    bintrees = require('bintrees'),
    bsarray = require('./bsarray');
    // not benchmarking dsjslib & binarySearchTree, they're slow and so not interesting

var data = [],
    N = 5000;

for (var i = 0; i < N; i++) {
    data[i] = Math.floor(Math.random() * N);
}

function compare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

console.log('insert ' + N + ' items:');

new Benchmark.Suite()
.add('bbtree', function () {
    var tree = bbtree(compare);
    for (var i = 0; i < N; i++) {
        tree.insert(data[i]);
    }
})
.add('bsarray', function () {
    var arr = bsarray(compare);
    for (var i = 0; i < N; i++) {
        arr.insert(data[i]);
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
.on('error', function(event) { console.log(event.target.error); })
.on('cycle', function(event) { console.log(String(event.target)); }).run();


console.log('\nsearch random item in ' + N + '-sized tree');

var btree = bbtree(compare);
for (var i = 0; i < N; i++) {
    btree.insert(data[i]);
}

var rbtree = functionalRBTree(compare);
for (var i = 0; i < N; i++) {
    rbtree.insert(data[i]);
}

var bintree = new bintrees.RBTree(compare);
for (var i = 0; i < N; i++) {
    bintree.insert(data[i]);
}

var arr = bsarray(compare);
for (var i = 0; i < N; i++) {
    arr.insert(data[i]);
}

function randomIndex(N) {
    return Math.floor(Math.random() * N);
}

new Benchmark.Suite()
.add('bbtree', function () {
    btree.find(data[randomIndex(N)]);
})
.add('bsarray', function () {
    arr.find(data[randomIndex(N)]);
})
.add('functional-red-black-tree', function () {
    rbtree.get(data[randomIndex(N)]);
})
.add('jsbintrees RBTree', function () {
    bintree.find(data[randomIndex(N)]);
})
.add('naive loop', function () {
    var key = data[randomIndex(N)];
    for (var i = 0; i < N; i++) {
        if (compare(data[i], key) === 0) break;
    }
})
.on('error', function(event) { console.log(event.target.error); })
.on('cycle', function(event) { console.log(String(event.target)); }).run();
