import { NgModule, LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { InMemoryWebApiModule } from 'angular-in-memory-web-api';
import { CommonModule, DecimalPipe } from '@angular/common';
import { AdminComponent } from '../admin.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgBoostedModule } from 'ng-boosted';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { RouterModule } from '@angular/router';
import { routes } from './admin-routing';
import { NavbarComponent } from '../navbar/navbar.component';
import { UsersComponent } from '../users/users.component';
import { UserViewComponent } from '../user-view/user-view.component';
import { DemandeViewComponent } from '../demande-view/demande-view.component';
import { DemandeListComponent } from '../demande-list/demande-list.component';
import { AjoutDemandeComponent } from '../ajout-demande/ajout-demande.component';
import { EditComponent } from '../edit/edit.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { AddUserComponent } from '../add-user/add-user.component';
import { FooterComponent } from '../footer/footer.component';
import { DemandeDirective } from 'src/app/directives/demande.directive';
import { UserDirective } from 'src/app/directives/user.directive';
import { OuvertureDeFluxComponent } from 'src/app/admin/ouverture-de-flux/ouverture-de-flux.component';
import { VpnSiteToSiteComponent } from 'src/app/admin/vpn-site-to-site/vpn-site-to-site.component';
import { VpnRemoteComponent } from 'src/app/admin/vpn-remote/vpn-remote.component';
import { MomentModule } from 'ngx-moment';
import { AutreDemandeComponent } from 'src/app/admin/autre-demande/autre-demande.component';
import { HistoriqueComponent } from 'src/app/admin/historique/historique.component';
import { Demandes } from 'src/app/modals/demandes';
import { EditDemandeComponent } from '../edit-demande/edit-demande.component';
import { from } from 'rxjs';

registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    DashboardComponent,
    AjoutDemandeComponent,
    UsersComponent,
    UserViewComponent,
    DemandeViewComponent,
    DemandeListComponent,
    HistoriqueComponent,
    NavbarComponent,
    FooterComponent,
    EditComponent,
    EditUserComponent,
    AddUserComponent,
    OuvertureDeFluxComponent,
    VpnSiteToSiteComponent,
    VpnRemoteComponent,
    AutreDemandeComponent,
    DemandeDirective,
    UserDirective,
    EditDemandeComponent,
    AdminComponent
  ],
  imports: [
    CommonModule,
    InMemoryWebApiModule.forRoot(Demandes),
    RouterModule.forChild(routes),
    MomentModule.forRoot({
      relativeTimeThresholdOptions: {
        m: 59
      }
    }),
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgBoostedModule,
    FilterPipeModule,
  ],
  exports: [
    RouterModule
  ],
  providers: [
    DecimalPipe,
    {provide: LOCALE_ID, useValue: 'fr'}
  ]
})
export class AdminModule { }
