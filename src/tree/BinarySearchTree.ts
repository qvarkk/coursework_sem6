import TreeNode from "./TreeNode";

export default class BinarySearchTree {
  private _root: TreeNode | null;

  public get root(): TreeNode | null {
    return this._root;
  }

  constructor() {
    this._root = null;
  }

  public insert(value: number) {
    const newNode = new TreeNode(value);

    if (this._root === null) {
      this._root = newNode;
    } else {
      this.insertNode(this._root, newNode);
    }
  }

  private insertNode(node: TreeNode, newNode: TreeNode) {
    if (newNode.value < node.value) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode);
      }
    }
  }

  public remove(value: number) {
    this._root = this.removeNode(this._root, value);
  }

  private removeNode(node: TreeNode | null, value: number): TreeNode | null {
    if (node === null) {
      return null;
    } else if (value < node.value) {
      node.left = this.removeNode(node.left, value);
      return node;
    } else if (value > node.value) {
      node.right = this.removeNode(node.right, value);
      return node;
    } else {
      // deleting node with no children
      if (node.left === null && node.right === null) {
        node = null;
        return node;
      }

      // deleting node with one children
      if (node.left === null) {
        node = node.right;
        return node;
      } else if (node.right === null) {
        node = node.left;
        return node;
      }

      // Deleting node with two children
      // minimum node of the right subtree
      // is stored in aux
      var aux = this.findMinNode(node.right);
      node.value = aux.value;

      node.right = this.removeNode(node.right, aux.value);
      return node;
    }
  }

  private findMinNode(node: TreeNode): TreeNode {
    if (node.left === null) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
  }
}
