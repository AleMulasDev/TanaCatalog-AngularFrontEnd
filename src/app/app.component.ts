import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';

import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthenticationService } from './_services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  title = 'Tana dei Goblin';
  isMediumMonitor = true;

  get isLogged(): boolean {
    if (this.auth.currentTokenValue != null) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    this.auth.logout();
  }

  constructor(breakpointObserver: BreakpointObserver, private auth: AuthenticationService,
              private _snackBar: MatSnackBar) {
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.isMediumMonitor = false;
      } else {
        this.isMediumMonitor = true;
      }
    });
    this._snackBar.open('\
Questo sito utilizza cookie e/o local storage tecnici propri per le sue funzionalità \
Chiudendo questo banner, scorrendo questa pagina o cliccando qualunque suo elemento acconsenti all\'uso dei cookie e/o local storage.\
    ', 'Chiudi');
  }

  ngOnDestroy(): void {
  }
}
