import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';
import { AuthenticationGuard } from './guards/authentication.guard';

const routes: Routes = [
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'admin',
    canActivate: [AuthenticationGuard],
    component: AdminComponent,
    children: [{
      path: '',
      loadChildren: () => import('./admin/admin/admin.module').then(m => m.AdminModule)
    }],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
