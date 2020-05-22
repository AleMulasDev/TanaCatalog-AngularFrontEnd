import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { Ng2CompleterModule } from "ng2-completer";

import { HttpClientModule } from '@angular/common/http';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// angular material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VisualizeGamesComponent } from './visualize-games/visualize-games.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PasswordValidatorDirective } from './password-validator.directive';
import { RecoverComponent } from './recover/recover.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { AddGameComponent } from './add-game/add-game.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EditGameComponent } from './edit-game/edit-game.component';
import { HomePageComponent } from './home-page/home-page.component';
import { VisualizeSectionsComponent } from './visualize-sections/visualize-sections.component';
import { SectionComponent } from './section/section.component';
import { HoldersComponent } from './holders/holders.component';
import { GameComponent } from './game/game.component';
import { CollaboratorsComponent } from './collaborators/collaborators.component';

@NgModule({
  declarations: [
    AppComponent,
    VisualizeGamesComponent,
    LoginComponent,
    RegisterComponent,
    PasswordValidatorDirective,
    RecoverComponent,
    ChangePasswordComponent,
    ChangeEmailComponent,
    AddGameComponent,
    EditGameComponent,
    HomePageComponent,
    VisualizeSectionsComponent,
    SectionComponent,
    HoldersComponent,
    GameComponent,
    CollaboratorsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    Ng2CompleterModule,
    FormsModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTabsModule,
    MatExpansionModule,
    MatSliderModule,
    MatGridListModule,
    MatCheckboxModule,
    MatRadioModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
