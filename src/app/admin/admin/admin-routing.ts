import { Route, Routes } from '@angular/router';
import { DashboardComponent } from '../dashboard/dashboard.component';

import { UsersComponent } from '../users/users.component';
import { DemandeListComponent } from '../demande-list/demande-list.component';
import { UserViewComponent } from '../user-view/user-view.component';
import { DemandeViewComponent } from '../demande-view/demande-view.component';
import { EditComponent } from '../edit/edit.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { OuvertureDeFluxComponent } from 'src/app/admin/ouverture-de-flux/ouverture-de-flux.component';
import { HistoriqueComponent } from 'src/app/admin/historique/historique.component';
import { EditDemandeComponent } from '../edit-demande/edit-demande.component';
import { ProfileGuardGuard } from 'src/app/guards/profile-guard.guard';

export const routes: Routes = [
      {
         path: 'dashboard',
         component: DashboardComponent
      },
      {
         path: 'users',
         component: UsersComponent
      },
      {
         path: 'liste-des-demandes',
         component: DemandeListComponent
      },
      {
         path: 'user/:id',
         component: UserViewComponent
      },
      {
         path: 'demande-view/:id',
         component: DemandeViewComponent
      },
      {
         path: 'edit',
         component: EditComponent
      },
      {
         path: 'edit-user/:id',
         component: EditUserComponent
      },
      {
         path: 'add-user',
         component: AddUserComponent
      },
      {
         path: 'flux/:id',
         component: OuvertureDeFluxComponent
      },
      {
         path: 'edit-demande/:id',
         component: EditDemandeComponent
      },
      {
         path: 'historique',
         canActivate: [ProfileGuardGuard],
         component: HistoriqueComponent
      }
];
