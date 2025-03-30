import panzoom, { PanZoomOptions } from "panzoom";

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

  init(config: CanvasConfig, panzoomOptions: PanZoomOptions = {}): void {
    this.el.height = config.height;
    this.el.width = config.width;
    const pz = panzoom(this.el, panzoomOptions);
    pz.moveTo(-config.width / 2 + window.innerWidth / 2, 0);
  }
}
