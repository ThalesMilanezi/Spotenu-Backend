export class Album {
  constructor(
    private id: string,
    private name: string,
    private band: string
  ) { }
  public getid(): string {
    return this.id
  }
  public getName(): string {
    return this.name
  }
  public getBand(): string {
    return this.band
  }

}