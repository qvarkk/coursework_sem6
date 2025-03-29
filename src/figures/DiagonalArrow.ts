export default class DiagonalArrow {
  readonly _context: CanvasRenderingContext2D;

  readonly _fromX: number;
  readonly _fromY: number;
  readonly _toX: number;
  readonly _toY: number;
  
  readonly _length: number;
  readonly _headLength: number;

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
    
    this._length = length;
    this._headLength = headLength;
  }

  draw(strokeStyle: string = '#000'): void {
    let dx = this._toX - this._fromX;
    let dy = this._toY - this._fromY;
    let angle = Math.atan2(dy, dx);

    this._context.beginPath();

    this._context.moveTo(this._fromX, this._fromY);
    this._context.lineTo(this._toX, this._toY);
    this._context.lineTo(
      this._toX - 15 * Math.cos(angle - Math.PI / 6),
      this._toY - 15 * Math.sin(angle - Math.PI / 6)
    );
    this._context.moveTo(this._toX, this._toY);
    this._context.lineTo(
      this._toX - 15 * Math.cos(angle + Math.PI / 6),
      this._toY - 15 * Math.sin(angle + Math.PI / 6)
    );

    this._context.strokeStyle = strokeStyle;
    this._context.stroke();
  }
}
