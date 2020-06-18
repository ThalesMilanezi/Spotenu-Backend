import * as jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class TokenGenerator {
  private static getExpiresIn(): number {
    return Number(process.env.ACCESS_TOKEN_EXPIRES_IN)
  }

  public generate = (
    input: AuthenticationData,
    expiresIn: string = process.env.ACCESS_TOKEN_EXPIRES_IN!
  ): string => {
    const token = jwt.sign(
      {
        id: input.id,
        role: input.role,
      },
      process.env.JWT_KEY as string,
      {
        expiresIn
      }
    );
    return token;
  };

  public verify(token: string) {
    const payload = jwt.verify(token, process.env.JWT_KEY as string) as any;
    const result = { id: payload.id, role: payload.role };
    return result;
  }
}

export interface AuthenticationData {
  id: string;
  role: string;
}