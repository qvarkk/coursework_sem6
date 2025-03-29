export default class TreeNodeCircle {
  private _context: CanvasRenderingContext2D;

  private _positionX: number;
  private _positionY: number;
  private _radius: number;

  private _value: string;

  constructor(
    context: CanvasRenderingContext2D,
    positionX: number,
    positionY: number,
    value: string,
    radius: number = 75
  ) {
    this._context = context;
    this._positionX = positionX;
    this._positionY = positionY;
    this._value = value;
    this._radius = radius;
  }

  draw(strokeStyle: string = '#000'): void {
    this._context.beginPath();
    
    this._context.arc(this._positionX, this._positionY, this._radius, 0, Math.PI * 2);

    this._context.strokeStyle = strokeStyle;
    this._context.stroke();

    this._context.font = '48px serif';
    this._context.textAlign = 'center';
    this._context.fillText(this._value, this._positionX, this._positionY + 16);
  }
}
