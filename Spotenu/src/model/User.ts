export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private nickname: string,
    private password: string,
    private role: UserRole,
    private description?: string

  ) { }

  public getId(): string {
    return this.id
  }

  public getName(): string {
    return this.name
  }

  public getEmail(): string {
    return this.email
  }

  public getNickname(): string {
    return this.nickname
  }

  public getPassword(): string {
    return this.password
  }

  public getRole(): UserRole {
    return this.role
  }

  public getDescription(): string {
    return this.description
  }

}

export enum UserRole {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
  ADMIN = 'ADMIN',
  BAND = 'BAND'
}