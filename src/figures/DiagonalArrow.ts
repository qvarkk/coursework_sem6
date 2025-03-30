export default class DiagonalArrow {
  private _context: CanvasRenderingContext2D;

  private _fromX: number;
  private _fromY: number;
  private _toX: number;
  private _toY: number;
  
  private _headLength: number;

  constructor(
    context: CanvasRenderingContext2D,
    fromX: number,
    fromY: number,
    length: number = 100,
    headLength: number = 15,
  ) {
    this._context = context;

    this._fromX = fromX;
    this._fromY = fromY;
    this._toX = fromX + length;
    this._toY = fromY + length;

    this._headLength = headLength;
  }

  public draw(strokeStyle: string = '#000'): void {
    let dx = this._toX - this._fromX;
    let dy = this._toY - this._fromY;
    let angle = Math.atan2(dy, dx);

    this._context.beginPath();

    this._context.moveTo(this._fromX, this._fromY);
    this._context.lineTo(this._toX, this._toY);
    this._context.lineTo(
      this._toX - this._headLength * Math.cos(angle - Math.PI / 6),
      this._toY - this._headLength * Math.sin(angle - Math.PI / 6)
    );
    this._context.moveTo(this._toX, this._toY);
    this._context.lineTo(
      this._toX - this._headLength * Math.cos(angle + Math.PI / 6),
      this._toY - this._headLength * Math.sin(angle + Math.PI / 6)
    );

    this._context.strokeStyle = strokeStyle;
    this._context.stroke();
  }
}
