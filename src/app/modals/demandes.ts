import { Demande, Status } from '../modals/demande';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Profils } from './demandeur';

export class Demandes implements InMemoryDbService {

  createDb() {
  const DEMANDES: any[] = [

    {
       id: 1,
       type: 'Ouverture de flux',
       author: {
         id: 1,
         username: '@kairemor',
         firstName: 'Mor',
         lastName: 'Kairé',
         service: 'IRCP',
         department: 'INS',
         profil: Profils.DEMANDEUR
       },
       createdDate: Date.now(),
       endOfValidity: new Date('2019-09-29'),
       ipSource : 'njnsko',
       ipDestination: 'kjdnkk',
       protocole: 'nzsn',
       port: 8273,
       status: Status.validée,
       // tslint:disable-next-line: max-line-length
       description: 'Lorem ipsum dolor sit amet consectetur, adipisi'
     },
     {
       id: 2,
       type: 'VPN Remote Access',
       author:  {
        id: 2,
        username: '@assquare',
        firstName: 'Amy',
        lastName: 'Sidibé',
        service: 'IRCP',
        department: 'INS',
        profil: Profils.DEMANDEUR
      },
       createdDate: Date.now(),
       endOfValidity: new Date('2019-01-16'),
       ipSource : 'njnsko',
       ipDestination: 'kjdnkk',
       protocole: 'nzsn',
       port: 8273,
       status: Status.validée,
       // tslint:disable-next-line: max-line-length
       description: 'Lorem ipsum dolor sit amet consectetur, adipisi'
     },
     {
        id: 3,
       type: 'Ouverture de flux',
       author:  {
        id: 3,
        username: '@',
        firstName: 'Mor',
        lastName: 'Kairé',
        service: 'IRCP',
        department: 'INS',
        profil: Profils.DEMANDEUR
      },
       createdDate: Date.now(),
       endOfValidity: new Date('2019-01-16'),
       ipSource : 'njnsko',
       ipDestination: 'kjdnkk',
       protocole: 'nzsn',
       port: 8273,
       status: Status.validée,
       // tslint:disable-next-line: max-line-length
       description: 'Lorem ipsum dolor sit amet consectetur, adipisi'
     },
     {
       id: 4,
       type: 'Ouverture de flux',
       author: {

       },
       createdDate: Date.now(),
       endOfValidity: new Date('2019-01-16'),
       ipSource : 'njnsko',
       ipDestination: 'kjdnkk',
       protocole: 'nzsn',
       port: 8273,
       status: Status.rejetée,
       // tslint:disable-next-line: max-line-length
       description: 'Lorem ipsum dolor sit amet consectetur, adipisi'
     },
     {
        id: 5,
       type: 'VPN site to site',
       author: 'Mouhammad Diakhaté',
       createdDate: Date.now(),
       endOfValidity: new Date('2019-01-16'),
       ipSource : 'njnsko',
       ipDestination: 'kjdnkk',
       protocole: 'nzsn',
       port: 8273,
       status: Status.en_cours,
       // tslint:disable-next-line: max-line-length
       description: 'Lorem ipsum dolor sit amet consectetur, adipisi'
     },
     {
       id: 6,
       type: 'Ouverture de flux',
       author: 'Maty Diaw',
       createdDate: Date.now(),
       endOfValidity: new Date('2019-01-16'),
       ipSource : 'njnsko',
       ipDestination: 'kjdnkk',
       protocole: 'nzsn',
       port: 8273,
       status: Status.traitée,
       // tslint:disable-next-line: max-line-length
       description: 'Lorem ipsum dolor sit amet consectetur, adipisi'
     },
     {
       id: 7,
       type: 'Création Virtual Server',
       author: 'Ibrahima Ndiaye',
       createdDate: Date.now(),
       endOfValidity: new Date('2019-01-16'),
       ipSource : 'njnsko',
       ipDestination: 'kjdnkk',
       protocole: 'nzsn',
       port: 8273,
       status: Status.rejetée,
       // tslint:disable-next-line: max-line-length
       description: 'Lorem ipsum dolor sit amet consectetur, adipisi'
     }
 ];
  return { DEMANDES };
}
}

