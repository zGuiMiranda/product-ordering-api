export class Supplier {
  constructor(
    private name: string,
    private id: string,
  ) {
    this.name = name;
    this.id = id;
  }

  public get getName(): string {
    return this.name;
  }

  public get getId(): string {
    return this.id;
  }
}
