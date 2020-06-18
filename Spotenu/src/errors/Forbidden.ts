import {BaseError} from './BaseError/BaseError'

export class Forbidden extends BaseError{
  constructor(message: string){
    super(message, 403)
  }
}