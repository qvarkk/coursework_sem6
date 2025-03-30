export default class TreeNode {
  private _value: number;

  private _left: TreeNode | null;
  private _right: TreeNode | null;

  public get value(): number {
    return this._value;
  }

  public set value(value: number) {
    this.value = value;
  }

  public get left(): TreeNode | null {
    return this._left;
  }

  public set left(value: TreeNode | null) {
    this._left = value;
  }

  public get right(): TreeNode | null {
    return this._right;
  }

  public set right(value: TreeNode | null) {
    this._right = value;
  }

  constructor(value: number) {
    this._value = value;
    this._left = null;
    this._right = null;
  }
}