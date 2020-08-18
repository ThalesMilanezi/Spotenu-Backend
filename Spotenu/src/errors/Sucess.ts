import {BaseError} from './BaseError/BaseError'

export class Sucess extends BaseError {
  constructor(message:string){
    super(message,200)
  }
}