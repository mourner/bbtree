export class SkipListNode {
	Pointers: SkipListNode[];
	Key:      number
	Val:      any
}

export class SkipList {
	readonly Head: SkipListNode
    private readonly height: number;

    constructor(maxHeight: number) {
        this.Head = new SkipListNode();
        this.Head.Pointers = new Array(maxHeight);
        this.height = maxHeight;
    }

    Put(key: number, val: any): SkipListNode {
        const newNodeHeight = randHeight(this.height);

        const newNode = new SkipListNode();
        newNode.Pointers = new Array(newNodeHeight);
        newNode.Key = key;
        newNode.Val = val;

        let node = this.Head;
        for (let i = this.height; i > 0; i--) {
            let indexNew = newNode.Pointers.length - i;
            let ptrs = node.Pointers;
            let indexTest = ptrs.length - i;
            let nodeTest = ptrs[indexTest];

            while (nodeTest && nodeTest.Key <= key) {
                node = nodeTest;
                ptrs = node.Pointers;
                indexTest = ptrs.length - i;
                nodeTest = ptrs[indexTest];
            }

            if (i <= newNodeHeight) {
                newNode.Pointers[indexNew] = ptrs[indexTest];
                ptrs[indexTest] = newNode
            }
        }

        return newNode
    }

    Remove(toRemove: SkipListNode): boolean {
        let key = toRemove.Key;
        let removed = false;
        let node = this.Head;
        for (let i = this.height; i > 0; i--) {
            let ptrs = node.Pointers;
            let indexTest = ptrs.length - i;
            let nodeTest = ptrs[indexTest];

            while (nodeTest && nodeTest.Key < key) {
                node = nodeTest;
                ptrs = node.Pointers;
                indexTest = ptrs.length - i;
                nodeTest = ptrs[indexTest];
            }

            // update pointer while handling duplicates
            if (nodeTest && nodeTest.Key == key) {
                let dupNode = node;
                let dupPtrs = dupNode.Pointers;
                let dupNodeTest = nodeTest;
                while (dupNodeTest && dupNodeTest.Key == key && dupNodeTest != toRemove) {
                    dupNode = dupNodeTest;
                    dupPtrs = dupNode.Pointers;
                    indexTest = dupPtrs.length - i;
                    dupNodeTest = dupPtrs[indexTest];
                }

                if (dupNodeTest == toRemove) {
                    let removedNext = toRemove.Pointers.length - i;
                    dupNode.Pointers[indexTest] = toRemove.Pointers[removedNext];
                    removed = true;
                }
            }
        }

        return removed
    }

    Get(key: number): SkipListNode {
        let node = this.Head;

        for (let i = this.height; i > 0; i--) {
            let ptrs = node.Pointers;
            let indexTest = ptrs.length - i;
            let nodeTest = ptrs[indexTest];

            while (nodeTest && nodeTest.Key <= key) {
                node = nodeTest;
                ptrs = node.Pointers;
                indexTest = ptrs.length - i;
                nodeTest = ptrs[indexTest];
            }
        }

        return node
    }

    Dump() {
        for (let i = this.height - 1; i >= 0; i--) {
            let vals = [];
            for (let v of this.ToSliceAtHeight(i)) {
                vals.push( v.Key );
            }
            console.log("Height:", i, "Count:", vals.length, vals);
        }
    }

    ToSlice(): SkipListNode[] {
        return this.ToSliceAtHeight(0);
    }

    ToSliceAtHeight(height: number): SkipListNode[] {
        let res = [];
        let node = this.Head.Pointers[this.height-1-height];
        while (node) {
            res.push(node);
            node = node.Pointers[node.Pointers.length-1-height];
        }
        return res;
    }
}

function randHeight(maxHeight: number): number {
	let h = 1;
	for (; Math.random() <= 0.5 && h < maxHeight; h++) {}
	return h
}
