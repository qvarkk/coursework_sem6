interface CanvasConfig {
  height: number;
  width: number;
}

export default class Canvas {
  readonly el: HTMLCanvasElement;
  readonly context: CanvasRenderingContext2D;

  constructor(selector: string = "#canvas") {
    this.el = document.querySelector(selector) as HTMLCanvasElement;

    if (!this.el)
      throw new Error(
        `Unable to find canvas with current selector (${selector})`
      );

    this.context = this.el.getContext("2d") as CanvasRenderingContext2D;
  }

  public init(config: CanvasConfig): void {
    this.el.height = config.height;
    this.el.width = config.width;
  }

  public reset(fillStyle: string = '#fff') {
    const oldFillStyle = this.context.fillStyle;
    this.context.fillStyle = fillStyle;
    this.context.fillRect(0, 0, this.el.width, this.el.height);
    this.context.fillStyle = oldFillStyle;
  }

  public drawGrid() {
    const cellSize = 50;
    const lineWidth = 1;
    const strokeStyle = '#e0e0e0';
    const dashed = true;
    const dashPattern = [5, 5];

    const ctx = this.context;
    const width = this.el.width;
    const height = this.el.height;

    ctx.save();
    
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = strokeStyle;
    
    if (dashed) {
      ctx.setLineDash(dashPattern);
    } else {
      ctx.setLineDash([]);
    }

    for (let x = 0; x <= width; x += cellSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }

    for (let y = 0; y <= height; y += cellSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.setLineDash([]);
    ctx.lineWidth = lineWidth * 2;
    ctx.strokeStyle = '#f0f0f0';
    
    for (let x = 0; x <= width; x += cellSize * 5) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    
    for (let y = 0; y <= height; y += cellSize * 5) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    ctx.restore();
  }
}
