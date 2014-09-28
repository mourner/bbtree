## Balanced Binary Search Tree experiments

This repo contains several simple balanced binary search tree JavaScript implementations to experiment, benchmark and play with.

- `bbtree.js`: Andersson tree (based on Arne Andersson's [Balanced Search Trees Made Simple paper](http://user.it.uu.se/~arnea/ps/simp.pdf) and
[Julienne Walker's tutorial](http://www.eternallyconfuzzled.com/tuts/datastructures/jsw_tut_andersson.aspx))
- `bsarray.js`: pseudo-BBST internally stored as a simple JS array
- `llrb.js`: Sedgewick's [Left-Leaning Red-Black Tree](http://algs4.cs.princeton.edu/33balanced/)

Benchmarks contain comparisons with [functional-red-black-tree](https://github.com/mikolalysenko/functional-red-black-tree) (incredibly, insanely fast, still not sure why) and [js_bintrees](https://github.com/vadimg/js_bintrees).

Example usage of trees:

```js
// create a tree using a custom compare function
var tree = bbtree(function (a, b) { return a - b; });

// insert items
tree.insert(1, 'foo');
tree.insert(5, {bar: 2});

// find an item
var node = tree.find(3);
console.log(node.key, node.value);

// TODO remove & other methods
```
