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
}
