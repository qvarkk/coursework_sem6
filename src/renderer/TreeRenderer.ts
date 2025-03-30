import Canvas from "../canvas/Canvas";
import TreeNodeCircle from "../figures/TreeNodeCircle";
import BinarySearchTree from "../tree/BinarySearchTree";
import TreeNode from "../tree/TreeNode";

export default class TreeRenderer {
  private _canvas: Canvas;
  private _context: CanvasRenderingContext2D;

  private _offsetY: number;
  private _offsetX: number;

  constructor(canvas: Canvas) {
    this._canvas = canvas;
    this._context = canvas.context;

    this._offsetY = 50;
    this._offsetX = 30;
  }

  public drawTree(tree: BinarySearchTree) {
    if (tree.root === null) return;

    let posY = 150;
    let posX = this._canvas.el.width / 2;

    this.drawNode(tree.root, posX, posY);
  }

  private drawNode(node: TreeNode, x: number, y: number) {
    const nodeCircle = new TreeNodeCircle(
      this._context, x, y, node.value.toString()
    );
    nodeCircle.draw();

    if (node.left) {
      this._context.beginPath();
      this._context.moveTo(
        x + (nodeCircle.radius * Math.cos(Math.PI * 0.75)), 
        y + (nodeCircle.radius * Math.sin(Math.PI * 0.75))
      );
      this._context.lineTo(
        x - nodeCircle.radius - this._offsetX,
        y + nodeCircle.radius + this._offsetY
      );
      this._context.stroke();
    }

    if (node.right) {
      this._context.beginPath();
      this._context.moveTo(
        x + (nodeCircle.radius * Math.cos(Math.PI * 0.25)), 
        y + (nodeCircle.radius * Math.sin(Math.PI * 0.25))
      );
      this._context.lineTo(
        x + nodeCircle.radius + this._offsetX, 
        y + nodeCircle.radius + this._offsetY
      );
      this._context.stroke();
    }
  }
}