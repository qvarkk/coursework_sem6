import TreeNode from "./TreeNode";

type TwoWayComparatorFunction<T> = (a: T, b: T) => boolean;
type ThreeWayComparatorFunction<T> = (a: T, b: T) => number;

export default class BinarySearchTree<T> {
  private _root: TreeNode<T> | null;

  public get root(): TreeNode<T> | null {
    return this._root;
  }

  constructor() {
    this._root = null;
  }

  public insert(
    value: T,
    comparator: TwoWayComparatorFunction<T> = (a: T, b: T) => {
      return a >= b;
    }
  ) {
    const newNode = new TreeNode<T>(value);

    if (this._root === null) {
      this._root = newNode;
    } else {
      this.insertNode(this._root, newNode, comparator);
    }
  }

  private insertNode(
    node: TreeNode<T>,
    newNode: TreeNode<T>,
    comparator: TwoWayComparatorFunction<T>
  ) {
    if (!comparator(newNode.value, node.value)) {
      if (node.left === null) {
        node.left = newNode;
      } else {
        this.insertNode(node.left, newNode, comparator);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
      } else {
        this.insertNode(node.right, newNode, comparator);
      }
    }
  }

  public remove(
    value: T,
    comparator: ThreeWayComparatorFunction<T>
  ) {
    this._root = this.removeNode(this._root, value, comparator);
  }

  private removeNode(
    node: TreeNode<T> | null, 
    value: T,
    comparator: ThreeWayComparatorFunction<T>
  ): TreeNode<T> | null {
    if (node === null) {
      return null;
    } else if (comparator(value, node.value) < 0) {
      node.left = this.removeNode(node.left, value, comparator);
      return node;
    } else if (comparator(value, node.value) > 0) {
      node.right = this.removeNode(node.right, value, comparator);
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

      node.right = this.removeNode(node.right, aux.value, comparator);
      return node;
    }
  }

  private findMinNode(node: TreeNode<T>): TreeNode<T> {
    if (node.left === null) {
      return node;
    } else {
      return this.findMinNode(node.left);
    }
  }

  public inorderTraversal(callback: (node: TreeNode<T> | null, ...args: any) => any) {
    this._inorderTraversal(this._root, callback);
  }

  private _inorderTraversal(
    node: TreeNode<T> | null,
    callback: (node: TreeNode<T> | null, ...args: any) => any
  ) {
    if (!node) return;

    this._inorderTraversal(node.left, callback);
    callback(node);
    this._inorderTraversal(node.right, callback);
  }

  public getDepth(node: TreeNode<T> | null): number {
    if (node === null) return 0;

    return (
      1 + Math.max(this.getDepth(node.left), this.getDepth(node.right))
    );
  }
}
