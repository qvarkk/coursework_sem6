import Event from "../event/Event.ts";
import { EasingFn, Vector } from "../types/types";

export default class OnePointAnimatedObject {
  private _positionX: number;
  private _positionY: number;

  private _targetX: number;
  private _targetY: number;

  private _startX: number;
  private _startY: number;

  private _duration: number;
  private _prevTime: number | Object = 0;
  private _elapsedTime: number;
  private _easing: EasingFn;

  private _isAnimationPlaying: boolean = false;
  readonly animationFinishedEvent = new Event(this);

  public get positionX(): number {
    return this._positionX;
  }

  public get positionY(): number {
    return this._positionY;
  }

  constructor({ x, y }: Vector) {
    this._positionX = this._targetX = this._startX = x;
    this._positionY = this._targetY = this._startY = y;

    this._duration = this._elapsedTime = 0;
    this._easing = (t) => t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2; // easeInOutQuad
  }

  public moveTo({ x, y }: Vector, duration: number = 1000, easing?: EasingFn) {
    this._startX = this._positionX;
    this._startY = this._positionY;

    this._targetX = x;
    this._targetY = y;

    this._duration = duration;
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame#timestamp
    this._prevTime = document.timeline.currentTime!.valueOf();
    this._elapsedTime = 0;
    this._easing = easing || this._easing;
    this._isAnimationPlaying = true;
  }

  public moveToAsync(
    { x, y }: Vector,
    duration: number = 1000,
    easing?: EasingFn
  ): Promise<void> {
    return new Promise((resolve) => {
      if (
        this._positionX === x &&
        this._positionY === y &&
        !this._isAnimationPlaying
      ) {
        resolve();
        return;
      }

      // Set up a one-time event listener
      const onComplete = () => {
        this.animationFinishedEvent.detach(onComplete);
        resolve();
      };

      this.animationFinishedEvent.attach(onComplete);
      this.moveTo({ x, y }, duration, easing);
    });
  }

  public update(deltaTime: number) {
    if (!this._isAnimationPlaying) return;

    this._elapsedTime += deltaTime - (this._prevTime as number);
    this._prevTime = deltaTime;

    const progress = Math.min(this._elapsedTime / this._duration, 1);
    const easedProgress = this._easing(progress);

    this._positionX =
      this._startX + (this._targetX - this._startX) * easedProgress;
    this._positionY =
      this._startY + (this._targetY - this._startY) * easedProgress;

    if (progress >= 1) {
      this._isAnimationPlaying = false;
      this.animationFinishedEvent.notify(this);
    }
  }

  public dispose() {
    this.animationFinishedEvent.clearListeners();
  }
}
