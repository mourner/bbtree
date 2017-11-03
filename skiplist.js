"use strict";
exports.__esModule = true;
var SkipListNode = /** @class */ (function () {
    function SkipListNode() {
    }
    return SkipListNode;
}());
exports.SkipListNode = SkipListNode;
var SkipList = /** @class */ (function () {
    function SkipList(maxHeight) {
        this.Head = new SkipListNode();
        this.Head.Pointers = new Array(maxHeight);
        this.height = maxHeight;
    }
    SkipList.prototype.Put = function (key, val) {
        var newNodeHeight = randHeight(this.height);
        var newNode = new SkipListNode();
        newNode.Pointers = new Array(newNodeHeight);
        newNode.Key = key;
        newNode.Val = val;
        var node = this.Head;
        for (var i = this.height; i > 0; i--) {
            var indexNew = newNode.Pointers.length - i;
            var ptrs = node.Pointers;
            var indexTest = ptrs.length - i;
            var nodeTest = ptrs[indexTest];
            while (nodeTest && nodeTest.Key <= key) {
                node = nodeTest;
                ptrs = node.Pointers;
                indexTest = ptrs.length - i;
                nodeTest = ptrs[indexTest];
            }
            if (i <= newNodeHeight) {
                newNode.Pointers[indexNew] = ptrs[indexTest];
                ptrs[indexTest] = newNode;
            }
        }
        return newNode;
    };
    SkipList.prototype.Remove = function (toRemove) {
        var key = toRemove.Key;
        var removed = false;
        var node = this.Head;
        for (var i = this.height; i > 0; i--) {
            var ptrs = node.Pointers;
            var indexTest = ptrs.length - i;
            var nodeTest = ptrs[indexTest];
            while (nodeTest && nodeTest.Key < key) {
                node = nodeTest;
                ptrs = node.Pointers;
                indexTest = ptrs.length - i;
                nodeTest = ptrs[indexTest];
            }
            // update pointer while handling duplicates
            if (nodeTest && nodeTest.Key == key) {
                var dupNode = node;
                var dupPtrs = dupNode.Pointers;
                var dupNodeTest = nodeTest;
                while (dupNodeTest && dupNodeTest.Key == key && dupNodeTest != toRemove) {
                    dupNode = dupNodeTest;
                    dupPtrs = dupNode.Pointers;
                    indexTest = dupPtrs.length - i;
                    dupNodeTest = dupPtrs[indexTest];
                }
                if (dupNodeTest == toRemove) {
                    var removedNext = toRemove.Pointers.length - i;
                    dupNode.Pointers[indexTest] = toRemove.Pointers[removedNext];
                    removed = true;
                }
            }
        }
        return removed;
    };
    SkipList.prototype.Get = function (key) {
        var node = this.Head;
        for (var i = this.height; i > 0; i--) {
            var ptrs = node.Pointers;
            var indexTest = ptrs.length - i;
            var nodeTest = ptrs[indexTest];
            while (nodeTest && nodeTest.Key <= key) {
                node = nodeTest;
                ptrs = node.Pointers;
                indexTest = ptrs.length - i;
                nodeTest = ptrs[indexTest];
            }
        }
        return node;
    };
    SkipList.prototype.Dump = function () {
        for (var i = this.height - 1; i >= 0; i--) {
            var vals = [];
            for (var _i = 0, _a = this.ToSliceAtHeight(i); _i < _a.length; _i++) {
                var v = _a[_i];
                vals.push(v.Key);
            }
            console.log("Height:", i, "Count:", vals.length, vals);
        }
    };
    SkipList.prototype.ToSlice = function () {
        return this.ToSliceAtHeight(0);
    };
    SkipList.prototype.ToSliceAtHeight = function (height) {
        var res = [];
        var node = this.Head.Pointers[this.height - 1 - height];
        while (node) {
            res.push(node);
            node = node.Pointers[node.Pointers.length - 1 - height];
        }
        return res;
    };
    return SkipList;
}());
exports.SkipList = SkipList;
function randHeight(maxHeight) {
    var h = 1;
    for (; Math.random() <= 0.5 && h < maxHeight; h++) { }
    return h;
}
