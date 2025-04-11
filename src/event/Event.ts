type CallbackFunction = (sender: object, args: any) => any;

export default class Event {
  private _sender: object;
  private _listeners: CallbackFunction[];

  constructor(sender: object) {
    this._sender = sender;
    this._listeners = [];
  }

  public attach(listener: CallbackFunction) {
    this._listeners.push(listener);
  }

  public detach(listenerToRemove: CallbackFunction): void {
    this._listeners = this._listeners.filter(
      listener => listener !== listenerToRemove
    );
  }

  public notify(args: any): void {
    for (var i = 0; i < this._listeners.length; i++) {
      this._listeners[i](this._sender, args);
    }
  }

  public clearListeners(): void {
    this._listeners = [];
  }
}