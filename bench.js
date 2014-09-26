
var Benchmark = require('benchmark'),
    bbtree = require('./bbtree');

var data = [];

for (var i = 0; i < 1000; i++) {
	data[i] = Math.floor(Math.random() * 1000);
}

var tree = bbtree().load(data);

new Benchmark.Suite()
.add('insert 10000 items', function () {
    bbtree().load(data);
})
.on('error', function(event) {
    console.log(event.target.error);
})
.on('cycle', function(event) {
    console.log(String(event.target));
})
.run();
