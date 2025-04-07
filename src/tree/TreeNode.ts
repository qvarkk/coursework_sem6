export default class TreeNode<T> {
  private _value: T;

  private _left: TreeNode<T> | null;
  private _right: TreeNode<T> | null;

  public get value(): T {
    return this._value;
  }

  public set value(value: T) {
    this.value = value;
  }

  public get left(): TreeNode<T> | null {
    return this._left;
  }

  public set left(value: TreeNode<T> | null) {
    this._left = value;
  }

  public get right(): TreeNode<T> | null {
    return this._right;
  }

  public set right(value: TreeNode<T> | null) {
    this._right = value;
  }

  constructor(value: T) {
    this._value = value;
    this._left = null;
    this._right = null;
  }
}