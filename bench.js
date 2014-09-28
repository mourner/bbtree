
var Benchmark = require('benchmark'),
    bbtree = require('./bbtree'),
    bsarray = require('./bsarray'),
    llrb = require('./llrb'),
    functionalRBTree = require('functional-red-black-tree'),
    bintrees = require('bintrees');
    // not benchmarking dsjslib & binarySearchTree, they're slow and so not interesting

var data = [],
    N = 1000;

for (var i = 0; i < N; i++) {
    data[i] = Math.floor(Math.random() * N);
}

function compare(a, b) {
    return a < b ? -1 : a > b ? 1 : 0;
}

console.log('insert ' + N + ' items:');

new Benchmark.Suite()
.add('llrb', function () {
    var tree = llrb(compare);
    for (var i = 0; i < N; i++) {
        tree.insert(data[i]);
    }
})
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
        tree = tree.insert(data[i]);
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


console.log('\nsearch each item in ' + N + '-sized tree');

var btree = bbtree(compare);
for (var i = 0; i < N; i++) {
    btree.insert(data[i]);
}

var lltree = llrb(compare);
for (var i = 0; i < N; i++) {
    lltree.insert(data[i]);
}

var rbtree = functionalRBTree(compare);
for (var i = 0; i < N; i++) {
    rbtree = rbtree.insert(data[i]);
}

var bintree = new bintrees.RBTree(compare);
for (var i = 0; i < N; i++) {
    bintree.insert(data[i]);
}

var arr = bsarray(compare);
for (var i = 0; i < N; i++) {
    arr.insert(data[i]);
}

new Benchmark.Suite()
.add('llrb', function () {
    for (var i = 0; i < N; i++) {
        lltree.find(data[i]);
    }
})
.add('bbtree', function () {
    for (var i = 0; i < N; i++) {
        btree.find(data[i]);
    }
})
.add('bsarray', function () {
    for (var i = 0; i < N; i++) {
        arr.find(data[i]);
    }
})
.add('functional-red-black-tree', function () {
    for (var i = 0; i < N; i++) {
        rbtree.get(data[i]);
    }
})
.add('jsbintrees RBTree', function () {
    for (var i = 0; i < N; i++) {
        bintree.find(data[i]);
    }
})
.add('naive loop', function () {
    for (var i = 0; i < N; i++) {
        var key = data[i];
        for (var j = 0; j < N; j++) {
            if (compare(data[j], key) === 0) break;
        }
    }
})
.on('error', function(event) { console.log(event.target.error); })
.on('cycle', function(event) { console.log(String(event.target)); }).run();


console.log('\ninsert ' + N + ' items and then remove one by one');

new Benchmark.Suite()
.add('llrb', function () {
    var lltree = llrb(compare);
    for (var i = 0; i < N; i++) {
        lltree.insert(data[i]);
    }
    for (i = 0; i < N; i++) {
        lltree.remove(data[i]);
    }
})
.add('bsarray', function () {
    var arr = bsarray(compare);
    for (var i = 0; i < N; i++) {
        arr.insert(data[i]);
    }
    for (var i = 0; i < N; i++) {
        arr.remove(data[i]);
    }
})
.add('functional-red-black-tree', function () {
    var rbtree = functionalRBTree(compare);
    for (var i = 0; i < N; i++) {
        rbtree = rbtree.insert(data[i]);
    }
    for (i = 0; i < N; i++) {
        rbtree.remove(data[i]);
    }
})
.add('jsbintrees RBTree', function () {
    var bintree = new bintrees.RBTree(compare);
    for (var i = 0; i < N; i++) {
        bintree.insert(data[i]);
    }
    for (var i = 0; i < N; i++) {
        bintree.remove(data[i]);
    }
})
.on('error', function(event) { console.log(event.target.error); })
.on('cycle', function(event) { console.log(String(event.target)); }).run();
