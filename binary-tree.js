/** BinaryTreeNode: node for a general tree. */

function findBFS(val) {
	let toVisitQueue = [ this ];

	while (toVisitQueue.length) {
		let current = toVisitQueue.shift();

		if (current.val === val) return current;

		for (let child of current.children) toVisitQueue.push(child);
	}
}

class BinaryTreeNode {
	constructor(val, left = null, right = null) {
		this.val = val;
		this.left = left;
		this.right = right;
	}
}

class BinaryTree {
	constructor(root = null) {
		this.root = root;
	}

	/** minDepth(): return the minimum depth of the tree -- that is,
   * the length of the shortest path from the root to a leaf. */

	minDepth() {
		// Start by adding the TreeNode to stack (root of Tree)
		// Let's use BFS so we can stop once we find a node with no children
		let toVisitQueue = [ this.root ];
		let pathLength = 0;

		while (toVisitQueue.length) {
			let current = toVisitQueue.shift();

			if (current) {
				pathLength++; // If current node exists, add one to path length
				if (!(current.left && current.right)) {
					// if both children are null, return number of steps
					return pathLength;
				} else {
					// if children exist, add one step to path and add children to the queue
					toVisitQueue.push(...[ current.left, current.right ]);
				}
			}
		}

		return pathLength; //if we finish iterating without returning, then that means the tree is empty and should return 0
	}

	/** maxDepth(): return the maximum depth of the tree -- that is,
   * the length of the longest path from the root to a leaf. */

	maxDepth() {
		// Start by adding the TreeNode to stack (root of Tree)
		// Let's use DFS so we can get the length of one path. Then we'll need to compare it to other paths
		let toVisitStack = [ this.root ];
		let longestPath = 0;
		let currentPath = 0;

		while (toVisitStack.length) {
			let current = toVisitStack.pop();

			if (current) {
				currentPath++; // If current node exists, add one to path length
				if (!(current.left && current.right)) {
					// if both children are null, we've reached the end of the path. Compare that to longest path and reset currentPath
					if (currentPath > longestPath) {
						longestPath = currentPath;
						currentPath = 0;
					}
				} else {
					// if children exist, add children to the stack
					toVisitStack.push(...[ current.left, current.right ]);
				}
			}
		}

		return longestPath;
	}

	/** maxSum(): return the maximum sum you can obtain by traveling along a path in the tree.
   * The path doesn't need to start at the root, but you can't visit a node more than once. */

	maxSum() {
		let result = 0;

		function maxSumHelper(node) {
			if (node === null) return 0;
			// Sums up left nodes (see return)
			const leftSum = maxSumHelper(node.left);
			console.log("leftSum:", leftSum);

			// Sums up right nodes (see return)
			const rightSum = maxSumHelper(node.right);
			console.log("rightSum:", rightSum);

			// Calculates branch total (node value plus right and left branches)
			result = Math.max(result, node.val + leftSum + rightSum);
			console.log("result:", result);

			// This is only relevant for calculating leftSum and rightSum correctly – will not affect final result (which is calculated in the line above). This line guarantees that the left branch will return the left values and the right branch will return the right
			return Math.max(0, leftSum + node.val, rightSum + node.val);
		}

		// This will calculate result for the entire tree (note that we are not returning the return value from this function, which would only calculate the sum for half of the tree)
		const maxSumResult = maxSumHelper(this.root);
		console.log("maxSumResult:", maxSumResult);
		return result;
	}

	/** nextLarger(lowerBound): return the smallest value in the tree
   * which is larger than lowerBound. Return null if no such value exists. */

	nextLarger(lowerBound) {
		let toVisitStack = [ this.root ];
		let upperBound = this.maxSum(toVisitStack);
		let minValue = upperBound;

		while (toVisitStack.length) {
			let current = toVisitStack.pop();

			if (current) {
				if (current.val > lowerBound && current.val < minValue) {
					minValue = current.val;
				}

				if (current.left) {
					toVisitStack.push(current.left);
				}

				if (current.right) {
					toVisitStack.push(current.right);
				}
			}
		}

		return minValue === upperBound ? null : minValue;
	}

	/** Further study!
   * areCousins(node1, node2): determine whether two nodes are cousins
   * (i.e. are at the same level but have different parents. ) */

	areCousins(node1, node2) {}

	/** Further study!
   * serialize(tree): serialize the BinaryTree object tree into a string. */

	static serialize() {}

	/** Further study!
   * deserialize(stringTree): deserialize stringTree into a BinaryTree object. */

	static deserialize() {}

	/** Further study!
   * lowestCommonAncestor(node1, node2): find the lowest common ancestor
   * of two nodes in a binary tree. */

	lowestCommonAncestor(node1, node2) {}
}

module.exports = { BinaryTree, BinaryTreeNode };
