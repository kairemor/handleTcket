import { Profils } from './demandeur';

export class User {
   constructor(
      public username: string,
      public password: string,
      public profile: Profils,
      public token?: string,
   ) {

   }
}
