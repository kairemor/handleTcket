export enum Profils {
   VALIDATEUR,
   DEMANDEUR,
   ADMIN_ARS,
   SUPER_ADMIN
   }

export class Demandeur {
constructor(
      public id: number,
      public username: string,
      public firstName: string,
      public lastName: string,
      public phone: string,
      public email: string,
      public service: string,
      public department: string,
      public profil: Profils,
   ) {}
}
