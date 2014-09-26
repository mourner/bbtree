## bbtree

A very simple JavaScript implementation a self-balancing binary search tree data structure,
based on Arne Andersson's [Balanced Search Trees Made Simple paper](http://user.it.uu.se/~arnea/ps/simp.pdf) and
[Julienne Walker's tutorial](http://www.eternallyconfuzzled.com/tuts/datastructures/jsw_tut_andersson.aspx).

The strength of this little library is its simplicity and tiny size.
If you need the best performance, use [functional-red-black-tree](https://github.com/mikolalysenko/functional-red-black-tree),
which has about 2.5x faster insertion.

```js
// create a tree using a custom compare function
var tree = bbtree(function (a, b) { return a - b; });

// insert items
tree.insert(1);
tree.insert(5);

// TODO remove, search & other methods
```
