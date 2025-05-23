import OnePointAnimatedObject from "../animatedObjects/OnePointAnimatedObject";
import { Vector } from "../types/types";
import TreeEdgeLine from "./TreeEdgeLine";

export default class TreeNodeCircle extends OnePointAnimatedObject {
  private _context: CanvasRenderingContext2D;

  private _radius: number;
  private _value: string;

  private _edgeTo: TreeEdgeLine | null = null;
  private _isLeft: boolean | null = null;

  private _edgeFromLeft: TreeEdgeLine | null = null;
  private _edgeFromRight: TreeEdgeLine | null = null;

  public get radius(): number {
    return this._radius;
  }

  constructor(
    context: CanvasRenderingContext2D,
    coordinates: Vector,
    value: string,
    radius: number = 50
  ) {
    super(coordinates);

    this._context = context;
    this._value = value;
    this._radius = radius;
  }

  public update(deltaTime: number) {
    super.update(deltaTime);

    if (this._edgeTo) {
      const angle = this._isLeft ? -0.35 : -0.65;
      this._edgeTo.toX = this.positionX + this._radius * Math.cos(Math.PI * angle);
      this._edgeTo.toY = this.positionY + this._radius * Math.sin(Math.PI * angle);
    }

    if (this._edgeFromLeft) {
      this._edgeFromLeft.fromX = this.positionX + this._radius * Math.cos(Math.PI * 0.65);
      this._edgeFromLeft.fromY = this.positionY + this._radius * Math.sin(Math.PI * 0.65);
    }

    if (this._edgeFromRight) {
      this._edgeFromRight.fromX = this.positionX + this._radius * Math.cos(Math.PI * 0.35);
      this._edgeFromRight.fromY = this.positionY + this._radius * Math.sin(Math.PI * 0.35);
    }
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

    this._context.strokeStyle = '#006600';
    this._context.fillStyle = '#ffffff';
    this._context.lineWidth = 3;
    this._context.stroke();
    this._context.fill();

    this._context.fillStyle = '#003300';
    this._context.font = `${this._radius / 1.25}px serif`;
    this._context.textAlign = "center";
    this._context.fillText(
      this._value,
      this.positionX,
      this.positionY + this._radius / 1.25 / 2.9
    ); // magic number but it centers text   ^^^

    if (this._edgeTo) {
      this._edgeTo.draw();
    }

    if (this._edgeFromLeft) {
      this._edgeFromLeft.draw();
    }

    if (this._edgeFromRight) {
      this._edgeFromRight.draw();
    }
  }

  public attachEdgeTo(edge: TreeEdgeLine, isLeft: boolean) {
    this._edgeTo = edge;
    this._isLeft = isLeft;
  }

  public attachLeftEdgeFrom(edge: TreeEdgeLine) {
    this._edgeFromLeft = edge;
  }

  public attachRightEdgeFrom(edge: TreeEdgeLine) {
    this._edgeFromRight = edge;
  }

  public hasEdgeTo(): boolean {
    return this._edgeTo !== null;
  }
}
