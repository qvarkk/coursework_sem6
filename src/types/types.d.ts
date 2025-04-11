export type Vector = { x: number; y: number };

export type LineCoordinates = {
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
};


export type EasingFn = (t: number) => number;
