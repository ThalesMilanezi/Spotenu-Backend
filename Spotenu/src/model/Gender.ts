export class Gender {
  constructor(
    private id: string,
    private name: string
  ) { }
  public getid(): string {
    return this.id
  }
  public getName(): string {
    return this.name
  }
}