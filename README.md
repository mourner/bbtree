## bbtree

A very simple JavaScript implementation a self-balancing binary search tree data structure,
based on Arne Andersson's [Balanced Search Trees Made Simple paper](http://user.it.uu.se/~arnea/ps/simp.pdf) and
[Julienne Walker's tutorial](http://www.eternallyconfuzzled.com/tuts/datastructures/jsw_tut_andersson.aspx).

The goal of this little experiment is simplicity and tiny size.
If you need the best performance, use [functional-red-black-tree](https://github.com/mikolalysenko/functional-red-black-tree),
which is amazing and works about 2-3x faster.

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
