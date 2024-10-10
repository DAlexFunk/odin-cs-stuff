class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor(arr) {
    // Clean input array (remove duplicates and sort)
    let data = Array.from(new Set(arr));
    data.sort((a, b) => a - b);

    this.root = this.buildTree(data);
  }

  // Display the tree in the console, provided by The Odin Project
  display(node = this.root, prefix = "", isLeft = true) {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      this.display(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
    }
    console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
    if (node.left !== null) {
      this.display(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
    }
  }

  buildTree(arr, start = 0, end = arr.length - 1) {
    if (start > end) return null;

    const mid = start + Math.floor((end - start) / 2);

    const root = new Node(arr[mid]);
    root.left = this.buildTree(arr, start, mid - 1);
    root.right = this.buildTree(arr, mid + 1, end);

    return root;
  }

  insert(value, root = this.root) {
    if (root === null) return new Node(value);
    if (value === root.data) return root;

    if (value <= root.data) {
      root.left = this.insert(value, root.left);
    } else {
      root.right = this.insert(value, root.right);
    }

    return root;
  }

  delete(value, root = this.root) {
    if (root === null) return root;

    // Find node
    if (value < root.data) {
      root.left = this.delete(value, root.left);
    } else if (value > root.data) {
      root.right = this.delete(value, root.right);
    } else {
      // Found node
      if (root.left === null && root.right === null) {
        // Case 1: Leaf node
        return null;
      } else if (root.left === null || root.right === null) {
        // Case 2: Node with one child
        return root.left === null ? root.right : root.left;
      } else {
        // Case 3: Node with 2 children
        const succ = this.#findInOrderSuccessor(root);
        root.data = succ.data;
        root.right = this.delete(succ.data, root.right);
      }
    }
    return root;
  }

  #findInOrderSuccessor(node) {
    let currentNode = node.right;
    while (currentNode.left) {
      currentNode = currentNode.left;
    }

    return currentNode;
  }

  find(value, root = this.root, foundNode = null) {
    if (root === null) return foundNode;

    foundNode = this.find(value, root.left, foundNode);
    if (root.data === value) foundNode = root;
    foundNode = this.find(value, root.right, foundNode);

    return foundNode;
  }

  inOrder(cb, root = this.root) {
    if (typeof cb !== "function") {
      throw new Error("inOrder only accepts a function");
    }
    if (root === null) return;
    this.inOrder(cb, root.left);
    cb(root);
    this.inOrder(cb, root.right);
  }

  preOrder(cb, root = this.root) {
    if (typeof cb !== "function") {
      throw new Error("preOrder only accepts a function");
    }
    if (root === null) return;
    cb(root);
    this.preOrder(cb, root.left);
    this.preOrder(cb, root.right);
  }

  postOrder(cb, root = this.root) {
    if (typeof cb !== "function") {
      throw new Error("postOrder only accepts a function");
    }
    if (root === null) return;
    this.postOrder(cb, root.left);
    this.postOrder(cb, root.right);
    cb(root);
  }

  levelOrder(cb) {
    if (typeof cb !== "function") {
      throw new Error("levelOrder only accepts a function");
    }

    const root = this.root;
    const Q = [];

    Q.push(root);
    while (Q[0]) {
      let visited = Q.shift();
      cb(visited);
      if (visited.left) Q.push(visited.left);
      if (visited.right) Q.push(visited.right);
    }
  }

  height(node) {
    if (node === null) return -1;

    let leftHeight = this.height(node.left) + 1;
    let rightHeight = this.height(node.right) + 1;

    return leftHeight > rightHeight ? leftHeight : rightHeight;
  }

  depth(node, currentNode = this.root, currentDepth = 0) {
    if (node === null) return -1;

    if (this.find(node.data, currentNode.left)) {
      currentDepth = this.depth(node, currentNode.left, ++currentDepth);
    } else if (this.find(node.data, currentNode.right)) {
      currentDepth = this.depth(node, currentNode.right, ++currentDepth);
    }

    return currentDepth;
  }

  isBalanced(root = this.root) {
    if (root === null) return true;

    const leftHeight = this.height(root.left);
    const rightHeight = this.height(root.right);

    return (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      this.isBalanced(root.left) &&
      this.isBalanced(root.right)
    );
  }

  rebalance() {
    if (this.isBalanced()) return;

    const data = [];
    this.inOrder((node) => data.push(node.data));
    this.root = this.buildTree(data);
  }
}

const nums = [];
for (let i = 0; i < 100; i++) {
  nums.push(Math.floor(Math.random() * 100));
}
const tree = new BinaryTree(nums);
tree.inOrder((node) => console.log(node.data));
tree.display();
