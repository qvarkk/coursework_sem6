import Event from "../event/Event";
import { Vector } from "../types/types";

export default class OnePointAnimatedObject {
  private _positionX: number;
  private _positionY: number;

  public get positionX(): number {
    return this._positionX;
  }

  public get positionY(): number {
    return this._positionY;
  }

  private _targetX: number;
  private _targetY: number;

  private _dx: number;
  private _dy: number;

  private _isAnimationPlaying: boolean = false;
  readonly animationFinishedEvent = new Event(this);

  constructor({ x, y }: Vector) {
    this._positionX = this._targetX = x;
    this._positionY = this._targetY = y;

    this._dx = this._dy = 0;
  }

  public moveTo(x: number, y: number, timespan: number = 60) {
    this._targetX = Math.floor(x);
    this._targetY = Math.floor(y);
    this._dx = (this._targetX - this._positionX) / timespan;
    this._dy = (this._targetY - this._positionY) / timespan;
    this._isAnimationPlaying = true;
  }

  public update() {
    if (Math.abs(this._positionX - this._targetX) < 1) {
      this._dx = 0;
      this._positionX = this._targetX;
    }

    if (Math.abs(this._positionY - this._targetY) < 1) {
      this._dy = 0;
      this._positionY = this._targetY;
    }

    if (
      this._positionX === this._targetX &&
      this._positionY === this._targetY &&
      this._isAnimationPlaying
    ) {
      this._isAnimationPlaying = false;
      this.animationFinishedEvent.notify(null);
    }

    this._positionX += this._dx;
    this._positionY += this._dy;
  }
}
