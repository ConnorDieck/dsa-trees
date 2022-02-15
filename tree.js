/** TreeNode: node for a general tree. */

function findDFS(val) {
	let toVisitStack = [ this ];

	while (toVisitStack.length) {
		let current = toVisitStack.pop();

		if (current === val) return current;

		for (let child of current.children) {
			toVisitStack.push(child);
		}
	}
}

class TreeNode {
	constructor(val, children = []) {
		this.val = val;
		this.children = children;
	}
}

class Tree {
	constructor(root = null) {
		this.root = root;
	}

	/** sumValues(): add up all of the values in the tree. */

	sumValues() {
		// Start by adding the TreeNode to stack (root of Tree)
		let toVisitStack = [ this.root ];
		let sum = 0;

		while (toVisitStack.length) {
			let current = toVisitStack.pop();

			if (current) {
				sum += current.val;

				for (let child of current.children) {
					toVisitStack.push(child);
				}
			}
		}
		return sum;
	}

	/** countEvens(): count all of the nodes in the tree with even values. */

	countEvens() {
		// Start by adding the TreeNode to stack (root of Tree)
		let toVisitStack = [ this.root ];
		let numEvens = 0;

		while (toVisitStack.length) {
			let current = toVisitStack.pop();

			if (current) {
				if (current.val % 2 === 0) numEvens++;

				for (let child of current.children) {
					toVisitStack.push(child);
				}
			}
		}
		return numEvens;
	}

	/** numGreater(lowerBound): return a count of the number of nodes
   * whose value is greater than lowerBound. */

	numGreater(lowerBound) {
		// Start by adding the TreeNode to stack (root of Tree)
		let toVisitStack = [ this.root ];
		let count = 0;

		while (toVisitStack.length) {
			let current = toVisitStack.pop();

			if (current) {
				if (current.val > lowerBound) count++;

				for (let child of current.children) {
					toVisitStack.push(child);
				}
			}
		}
		return count;
	}
}

module.exports = { Tree, TreeNode };
