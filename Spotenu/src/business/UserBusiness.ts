import { UserDatabase } from "../data/UserDatabase";
import {} from '../services/'
export class UserBusiness {
  constructor(
    private userDataBase: UserDatabase,
    private hashGenerator: HashGenerator
  )
}