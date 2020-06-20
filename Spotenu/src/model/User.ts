import { NotFoundError } from "../errors/NotFoundError"

export class User {
  constructor(
    private id: string,
    private name: string,
    private email: string,
    private nickname: string,
    private password: string,
    private role: UserRole,
    private description?: string,
    private isApproved?: boolean

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
    return this.description as string
  }

  public getisApproved(): boolean{
    return this.isApproved as boolean
  }

}

export enum UserRole {
  FREE = 'FREE',
  PREMIUM = 'PREMIUM',
  ADMIN = 'ADMIN',
  BAND = 'BAND'
}

export const stringToUserRole = (input: string): UserRole => {
  switch (input) {
    case "FREE":
      return UserRole.FREE;
    case "PREMIUM":
      return UserRole.PREMIUM;
      case "ADMIN":
      return UserRole.ADMIN;
      case "BAND":
      return UserRole.BAND;
    default:
      throw new NotFoundError("The specific user role was not found.");
  }
};