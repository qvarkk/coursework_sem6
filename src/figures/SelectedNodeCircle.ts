import OnePointAnimatedObject from "../animatedObjects/OnePointAnimatedObject";
import { Vector } from "../types/types";

export default class SelectedNodeCircle extends OnePointAnimatedObject {
  private _context: CanvasRenderingContext2D;

  private _radius: number;
  private _strokeStyle: string = '#003300';

  public get radius(): number {
    return this._radius;
  }

  public set strokeStyle(value: string) {
    this._strokeStyle = value;
  }

  constructor(
    context: CanvasRenderingContext2D,
    coordinates: Vector,
    radius: number = 25
  ) {
    super(coordinates);

    this._context = context;
    this._radius = radius;
  }

  public draw(): void {
    this._context.beginPath();
    
    this._context.arc(
      this.positionX,
      this.positionY,
      this._radius,
      0,
      Math.PI * 2
    );

    this._context.strokeStyle = this._strokeStyle;
    this._context.lineWidth = 4;
    this._context.stroke();
  }
}
