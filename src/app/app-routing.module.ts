import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisualizeGamesComponent } from './visualize-games/visualize-games.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoverComponent } from './recover/recover.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { AddGameComponent } from './add-game/add-game.component';
import { EditGameComponent } from './edit-game/edit-game.component';
import { HomePageComponent } from './home-page/home-page.component';
import { VisualizeSectionsComponent } from './visualize-sections/visualize-sections.component';
import { SectionComponent } from './section/section.component';

import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'visualizeGames', component: VisualizeGamesComponent, canActivate: [AuthGuard] },
  { path: 'visualizeSections', component: VisualizeSectionsComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'recover', component: RecoverComponent},
  { path: 'changePassword' , component: ChangePasswordComponent, canActivate: [AuthGuard] },
  { path: 'changeEmail' , component: ChangeEmailComponent, canActivate: [AuthGuard] },
  { path: 'addGame', component: AddGameComponent, canActivate: [AuthGuard] },
  { path: 'editGame/:id', component: EditGameComponent, canActivate: [AuthGuard] },
  { path: 'section/:id', component: SectionComponent, canActivate: [AuthGuard] },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
