import Canvas from "../canvas/Canvas";
import TreeNodeCircle from "../figures/TreeNodeCircle";
import BinarySearchTree from "../tree/BinarySearchTree";
import TreeNode from "../tree/TreeNode";

export default class TreeRenderer {
  private _canvas: Canvas;
  private _context: CanvasRenderingContext2D;

  private _baseOffsetY: number;
  private _baseOffsetX: number;

  private _radius: number;

  constructor(canvas: Canvas, radius: number = 50) {
    this._canvas = canvas;
    this._context = canvas.context;

    this._baseOffsetY = radius * 1.5;
    this._baseOffsetX = radius;

    this._radius = radius;
  }

  public drawTree(tree: BinarySearchTree) {
    if (tree.root === null) return;

    let posY = 150;
    let posX = this._canvas.el.width / 2;

    this.drawNode(tree.root, posX, posY);
  }

  private drawNode(node: TreeNode, x: number, y: number) {
    const nodeCircle = new TreeNodeCircle(
      this._context, x, y, node.value.toString(), this._radius
    );
    nodeCircle.draw();

    if (node.left) {
      const leftOffset = this.calculateHorizontalOffset(node.left);
      const leftX = x - leftOffset;
      const leftY = y + this._baseOffsetY;

      this._context.beginPath();
      this._context.moveTo(
        x + this._radius * Math.cos(Math.PI * 0.75),
        y + this._radius * Math.sin(Math.PI * 0.75)
      );
      this._context.lineTo(leftX, leftY);
      this._context.stroke();

      this.drawNode(
        node.left,
        leftX,
        leftY + this._radius
      );
    }

    if (node.right) {
      const rightOffset = this.calculateHorizontalOffset(node.right);
      const rightX = x + rightOffset;
      const rightY = y + this._baseOffsetY;

      this._context.beginPath();
      this._context.moveTo(
        x + this._radius * Math.cos(Math.PI * 0.25),
        y + this._radius * Math.sin(Math.PI * 0.25)
      );
      this._context.lineTo(rightX, rightY);
      this._context.stroke();

      this.drawNode(
        node.right,
        rightX,
        rightY + this._radius
      );
    }
  }

  private calculateHorizontalOffset(node: TreeNode, separationPx: number = 10): number {
    const subtreeDepth = this.getTreeDepth(node);

    return (
      Math.pow(2, subtreeDepth) / 2 * (this._baseOffsetX + separationPx / 2)
    );
  }

  private getTreeDepth(node: TreeNode | null): number {
    if (node === null) return 0;

    return (
      1 + Math.max(this.getTreeDepth(node.left), this.getTreeDepth(node.right))
    );
  }
}
