import { BaseError } from "./BaseError/BaseError"

export class Unauthorized extends BaseError {
  constructor(message: string){
    super(message, 401)
  }
}