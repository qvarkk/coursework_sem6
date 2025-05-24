export default class TreeEdgeLine {
  private _context: CanvasRenderingContext2D;

  private _fromX: number = 0;
  private _fromY: number = 0;
  private _toX: number = 0;
  private _toY: number = 0;

  public get fromX(): number {
    return this._fromX;
  }

  public get fromY(): number {
    return this._fromY;
  }

  public set fromX(fromX: number) {
    this._fromX = fromX;
  }

  public set fromY(fromY: number) {
    this._fromY = fromY;
  }

  public get toX(): number {
    return this._toX;
  }

  public get toY(): number {
    return this._toY;
  }

  public set toX(toX: number) {
    this._toX = toX;
  }

  public set toY(toY: number) {
    this._toY = toY;
  }

  constructor(context: CanvasRenderingContext2D) {
    this._context = context;
  }

  public draw(): void {
    if (this.fromX === 0 && this.fromY === 0 || this.toX === 0 && this.toY === 0)
      return;

    this._context.beginPath();
    this._context.moveTo(this.fromX, this.fromY);
    this._context.lineTo(this.toX, this.toY);

    this._context.strokeStyle = "#003300";
    this._context.lineWidth = 1;
    this._context.stroke();
  }
}
