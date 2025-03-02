import { TreeNode } from "../types";

export class Tree {
  constructor(private root: TreeNode | null = null) {}

  public setRoot(root: TreeNode | null): void {
    this.root = root;
  }

  public getRoot(): TreeNode | null {
    return this.root;
  }

  public insert(data: number): TreeNode {
    let newNode: TreeNode = {
      data,
      left: null,
      right: null
    }

    if (this.root === null) {
      this.root = newNode;
      return this.root;
    } else {
      return this.insertNode(this.root, newNode);
    }
  }

  private insertNode(node: TreeNode, newNode: TreeNode): TreeNode {
    if (newNode.data < node.data) {
      if (node.left === null) {
        node.left = newNode;
        return newNode;
      } else {
        return this.insertNode(node.left, newNode);
      }
    } else {
      if (node.right === null) {
        node.right = newNode;
        return newNode;
      } else {
        return this.insertNode(node.right, newNode);
      }
    }
  }
}