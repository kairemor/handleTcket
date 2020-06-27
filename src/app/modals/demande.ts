import { User } from './user';
import { Demandeur } from './demandeur';
import { Type } from './type';

export enum Status {
  initiée,
  validée,
  rejetée,
  en_attente,
  expirée,
  en_cours,
  traitée,
}
export class Etat {
   constructor(
      public id: number,
      public name: Status,
   ) {}
}
export class Demande {
   constructor(
      public id: number,
      public type: Type,
      public description: string,
      public createdAt: number,
      public author: Demandeur,
      public status: Etat,
      public validator: Demandeur,
      public endOfValidity: Date,
      public ipSource: string,
      public ipDestination: string,
      public protocole: string,
      public port: number,
      ) {

   }
}
