export class Supplier {
  constructor(
    private name: string,
    private _id: string,
  ) {
    this.name = name;
    this._id = _id;
  }

  public get getName(): string {
    return this.name;
  }

  public get getId(): string {
    return this._id;
  }
}
