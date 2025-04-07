import TwoPointAnimatedObject from "../animatedObjects/TwoPointAnimatedObject";
import { LineCoordinates } from "../types/types";

export default class TreeEdgeLine extends TwoPointAnimatedObject {
  private _context: CanvasRenderingContext2D;
  private _isAttached: boolean = true;

  constructor(
    context: CanvasRenderingContext2D,
    coordinates: LineCoordinates
  ) {
    super(coordinates);

    this._context = context;
  }

  public update() {
    if (!this._isAttached) {
      super.update();
    }
  }

  public draw(): void {
    this._context.beginPath();
    this._context.moveTo(this.fromX, this.fromY);
    this._context.lineTo(this.toX, this.toY);

    this._context.strokeStyle = '#003300';
    this._context.lineWidth = 3;
    this._context.stroke();
  }

  public attach() {
    this._isAttached = true;
  }
}
