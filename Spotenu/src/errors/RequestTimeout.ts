import {BaseError} from "./BaseError/BaseError"

export class RequestTimeOut extends BaseError{
  constructor(message: string){
    super(message, 408)
  }
}