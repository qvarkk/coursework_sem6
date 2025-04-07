import Canvas from "../canvas/Canvas";
import TreeEdgeLine from "../figures/TreeEdgeLine";
import TreeNodeCircle from "../figures/TreeNodeCircle";
import BinarySearchTree from "../tree/BinarySearchTree";
import TreeNode from "../tree/TreeNode";

interface NodeWithValue {
  node: TreeNodeCircle;
  value: number;
}

export default class TreeRenderer {
  private _canvas: Canvas;
  private _context: CanvasRenderingContext2D;

  private _baseOffsetY: number;
  private _baseOffsetX: number;

  private _radius: number;
  private _separation: number;

  private _nodeTree: BinarySearchTree<NodeWithValue>;
  private _valuesTree: BinarySearchTree<number>;

  private _edgeToBeAttached: TreeEdgeLine | null = null;
  private _isLeft: boolean = false;

  constructor(canvas: Canvas, radius: number = 50, separation: number = 25) {
    this._canvas = canvas;
    this._context = canvas.context;

    this._baseOffsetY = radius * 1.25;
    this._baseOffsetX = radius;

    this._radius = radius;
    this._separation = separation;

    this._nodeTree = new BinarySearchTree<NodeWithValue>();
    this._valuesTree = new BinarySearchTree<number>();
  }

  public async insert(value: number) {
    let initialX = this._canvas.el.width / 2;
    let initialY = 100;

    const node = new TreeNodeCircle(
      this._context,
      { x: 100, y: 100 },
      value.toString(),
      this._radius
    );

    this._valuesTree.insert(value);
    const { x, y } = this.updateTree(
      this._nodeTree.root,
      this._valuesTree.root,
      initialX,
      initialY
    );
    this._nodeTree.insert({ value, node }, (a, b) => a.value > b.value);

    node.moveTo(x, y);
    if (this._edgeToBeAttached) {
      node.attachEdgeTo(this._edgeToBeAttached, this._isLeft);

      this._edgeToBeAttached = null;
      this._isLeft = false;
    }
  }

  private updateTree(
    nodeNode: TreeNode<NodeWithValue> | null,
    valueNode: TreeNode<number> | null,
    x: number,
    y: number
  ): {
    x: number;
    y: number;
  } {
    if (!nodeNode || !valueNode) return { x, y };

    let leftCoords: { x: number; y: number } = { x: 0, y: 0 };
    let rightCoords: { x: number; y: number } = { x: 0, y: 0 };

    nodeNode.value.node.moveTo(x, y);

    if (valueNode.left) {
      const leftOffset = this.calculateHorizontalOffset(valueNode.left);
      const leftX = x - leftOffset;
      const leftY = y + this._baseOffsetY + this._radius;

      if (!nodeNode.left) {
        const edge = new TreeEdgeLine(this._context, {
          fromX: 0,
          fromY: 0,
          toX: 0,
          toY: 0,
        });
        nodeNode.value.node.attachLeftEdgeFrom(edge);
        this._edgeToBeAttached = edge;
        this._isLeft = true;
      }

      leftCoords = this.updateTree(nodeNode.left, valueNode.left, leftX, leftY);
    }

    if (valueNode.right) {
      const rightOffset = this.calculateHorizontalOffset(valueNode.right);
      const rightX = x + rightOffset;
      const rightY = y + this._baseOffsetY + this._radius;

      if (!nodeNode.right) {
        const edge = new TreeEdgeLine(this._context, {
          fromX: 0,
          fromY: 0,
          toX: 0,
          toY: 0,
        });
        nodeNode.value.node.attachRightEdgeFrom(edge);
        this._edgeToBeAttached = edge;
        this._isLeft = false;
      }

      rightCoords = this.updateTree(
        nodeNode.right,
        valueNode.right,
        rightX,
        rightY
      );
    }

    if (leftCoords.y !== 0) {
      return leftCoords;
    } else {
      return rightCoords;
    }
  }

  public update() {
    this._canvas.reset();

    this._nodeTree.inorderTraversal((node) => {
      node?.value.node.update();
      node?.value.node.draw();
    });
  }

  private calculateHorizontalOffset<T>(node: TreeNode<T> | null): number {
    const subtreeDepth = this.getTreeDepth(node);

    return (
      (Math.pow(2, subtreeDepth) / 2) *
      (this._baseOffsetX + this._separation / 2)
    );
  }

  private getTreeDepth<T>(node: TreeNode<T> | null): number {
    if (node === null) return 0;

    return (
      1 + Math.max(this.getTreeDepth(node.left), this.getTreeDepth(node.right))
    );
  }
}
