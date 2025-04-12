import sleep from "../async/sleep";
import Canvas from "../canvas/Canvas";
import SelectedNodeCircle from "../figures/SelectedNodeCircle";
import TreeEdgeLine from "../figures/TreeEdgeLine";
import TreeNodeCircle from "../figures/TreeNodeCircle";
import BinarySearchTree from "../tree/BinarySearchTree";
import TreeNode from "../tree/TreeNode";
import { Vector } from "../types/types";

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

  private _tree: BinarySearchTree<NodeWithValue>;

  private _pendingEdgeAttachment: {
    parent: NodeWithValue,
    isLeft: boolean,
  } | null = null;

  private _selectionCircle: SelectedNodeCircle | null = null;

  constructor(canvas: Canvas, radius: number = 50, separation: number = 25) {
    this._canvas = canvas;
    this._context = canvas.context;

    this._baseOffsetY = radius * 1.25;
    this._baseOffsetX = radius;

    this._radius = radius;
    this._separation = separation;

    this._tree = new BinarySearchTree<NodeWithValue>();
  }

  public update(deltaTime: number) {
    this._canvas.reset();
    this._canvas.drawGrid();

    this._tree.inorderTraversal((node) => {
      node?.value.node.update(deltaTime);
      node?.value.node.draw();
    });

    if (this._selectionCircle) {
      this._selectionCircle.update(deltaTime);
      this._selectionCircle.draw();
    }
  }

  public async insert(value: number) {
    const initialPos: Vector = {
      x: this._canvas.el.width / 2,
      y: 100,
    };

    const node = this.createNode(value, initialPos);
    this._tree.insert({ value, node }, (a, b) => a.value >= b.value);

    await this.visualiseInsertSelection(value, initialPos);

    this.updateNodesPositions(this._tree.root, initialPos);
    this.attachEdgeToInsertedNode(node);
  }

  private createNode(value: number, initialPos: Vector): TreeNodeCircle {
    let position = {
      x: 100, y: 100
    };

    if (!this._tree.root) {
      position = initialPos;
    } 

    return new TreeNodeCircle(
      this._context,
      position,
      value.toString(),
      this._radius
    );
  }

  private async visualiseInsertSelection(value: number, initialPos: Vector) {
    this._selectionCircle = new SelectedNodeCircle(
      this._context,
      initialPos,
      this._radius * 1.1
    );

    await this._visualiseInsertSelection(this._tree.root, value);

    this._selectionCircle = null;
  }

  private async _visualiseInsertSelection(
    nodeNode: TreeNode<NodeWithValue> | null,
    value: number
  ) {
    if (!nodeNode || !this._selectionCircle) return;

    await this._selectionCircle.moveToAsync({
      x: nodeNode.value.node.positionX,
      y: nodeNode.value.node.positionY,
    }, 500);

    this._selectionCircle.strokeStyle = "#990000";
    await sleep(1000);
    this._selectionCircle.strokeStyle = "#003300";

    if (value < nodeNode.value.value) {
      await this._visualiseInsertSelection(nodeNode.left, value);
    } else {
      await this._visualiseInsertSelection(nodeNode.right, value);
    }
  }

  private updateNodesPositions(
    node: TreeNode<NodeWithValue> | null,
    { x, y }: Vector,
    parent: TreeNode<NodeWithValue> | null = null,
    isLeftChild: boolean = false,
  ): void {
    if (!node) return;

    node.value.node.moveTo({ x, y });

    if (parent && !node.value.node.hasEdgeTo()) {
      this._pendingEdgeAttachment = {
        parent: parent.value,
        isLeft: isLeftChild
      };
    }

    if (node.left) {
      const leftOffset = this.calculateHorizontalOffset(node.left);
      const leftPos = {
        x: x - leftOffset,
        y: y + this._baseOffsetY + this._radius
      };

      this.updateNodesPositions(node.left, leftPos, node, true);
    }

    if (node.right) {
      const rightOffset = this.calculateHorizontalOffset(node.right);
      const rightPos: Vector = {
        x:  x + rightOffset,
        y: y + this._baseOffsetY + this._radius
      };

      this.updateNodesPositions(node.right, rightPos, node, false);
    }
  }

  private attachEdgeToInsertedNode(node: TreeNodeCircle) {
    if (!this._pendingEdgeAttachment) return;

    const { parent, isLeft } = this._pendingEdgeAttachment;
    const edge = new TreeEdgeLine(this._context);

    node.attachEdgeTo(edge, isLeft);

    if (isLeft) {
      parent.node.attachLeftEdgeFrom(edge);
    } else {
      parent.node.attachRightEdgeFrom(edge);
    }
  }

  private calculateHorizontalOffset(node: TreeNode<NodeWithValue> | null): number {
    const subtreeDepth = this._tree.getDepth(node);

    return (
      (Math.pow(2, subtreeDepth) / 2) *
      (this._baseOffsetX + this._separation / 2)
    );
  }
}
