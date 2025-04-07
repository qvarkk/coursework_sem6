import Event from "../event/Event";
import { LineCoordinates } from "../types/types";

export default class TwoPointAnimatedObject {
  private _fromX: number;
  private _fromY: number;
  private _toX: number;
  private _toY: number;

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

  private _targetFromX: number;
  private _targetFromY: number;
  private _targetToX: number;
  private _targetToY: number;

  private _fromDx: number;
  private _fromDy: number;
  private _toDx: number;
  private _toDy: number;

  private _isAnimationPlaying: boolean = false;
  readonly animationFinishedEvent = new Event(this);

  constructor({ fromX, fromY, toX, toY }: LineCoordinates) {
    this._fromX = this._targetFromX = fromX;
    this._fromY = this._targetFromY = fromY;
    this._toX = this._targetToX = toX;
    this._toY = this._targetToY = toY;

    this._fromDx = this._fromDy = 0;
    this._toDx = this._toDy = 0;
  }

  public moveTo(
    { fromX, fromY, toX, toY }: LineCoordinates,
    timespan: number = 60
  ) {
    this._targetFromX = fromX;
    this._targetFromY = fromY;
    this._targetToX = toX;
    this._targetToY = toY;
    this._fromDx = (this._targetFromX - this._fromX) / timespan;
    this._fromDy = (this._targetFromY - this._fromY) / timespan;
    this._toDx = (this._targetToX - this._toX) / timespan;
    this._toDy = (this._targetToY - this._toY) / timespan;
  }

  public update() {
    if (Math.abs(this._fromX - this._targetFromX) < 1) {
      this._fromDx = 0;
      this._fromX = this._targetFromX;
    }

    if (Math.abs(this._fromY - this._targetFromY) < 1) {
      this._fromDy = 0;
      this._fromY = this._targetFromY;
    }

    if (Math.abs(this._toX - this._targetToX) < 1) {
      this._toDx = 0;
      this._toX = this._targetToX;
    }

    if (Math.abs(this._toY - this._targetToY) < 1) {
      this._toDy = 0;
      this._toY = this._targetToY;
    }

    if (
      this._fromX === this._targetFromX &&
      this._fromY === this._targetFromY &&
      this._toX === this._targetToX &&
      this._toY === this._targetToY &&
      this._isAnimationPlaying
    ) {
      this._isAnimationPlaying = false;
      this.animationFinishedEvent.notify(null);
    }

    this._fromX += this._fromDx;
    this._fromY += this._fromDy;
    this._toX += this._toDx;
    this._toY += this._toDy;
  }
}
