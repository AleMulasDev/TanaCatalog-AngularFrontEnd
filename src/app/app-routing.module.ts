import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizeGamesComponent } from './visualize-games/visualize-games.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeEmailComponent } from './change-email/change-email.component';

import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: '', component: VisualizeGamesComponent },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  // { path: 'admin', component: AdminComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recover', component: RecoverComponent},
  { path: 'changePassword' , component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'changeEmail' , component: ChangeEmailComponent, canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
