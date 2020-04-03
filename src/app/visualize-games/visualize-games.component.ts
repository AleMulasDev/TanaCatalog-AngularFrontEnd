import { Component, OnInit } from '@angular/core';
import { GameService } from '../_services/game.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Game } from '../_models/Game';
import { constant } from '../_utils/constants';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSliderChange } from '@angular/material/slider';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-visualize-games',
  templateUrl: './visualize-games.component.html',
  styleUrls: ['./visualize-games.component.css']
})
export class VisualizeGamesComponent implements OnInit {
  games: Game[];
  error: string;
  displayType = 1;
  isMediumMonitor = false;

  displayChange(evt: MatSliderChange) {
    this.displayType = evt.value;
  }

  isLogged(): boolean {
    if (this.auth.currentTokenValue) {
      return true;
    } else {
      return false;
    }
  }

  getImage(game: Game): string {
    return game.thumbnail.indexOf('/') === 0 ? constant.server.BASE_PATH + game.thumbnail : game.thumbnail;
  }

  constructor(private g: GameService, private auth: AuthenticationService, private router: Router,
              private snackBar: MatSnackBar, breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.isMediumMonitor = false;
        this.displayType = 2;
      } else {
        this.isMediumMonitor = true;
        this.displayType = 1;
      }
    });
    g.retrieveGameList()
    .then(value => {
      this.games = value instanceof Array ? value : undefined;
    }).catch(err => {
      this.error = err;
    });
  }



  deleteGame(game: Game, index: number) {
    if (confirm('Sei sicuro di voler cancellare questo gioco? L\'azione non potrà essere annullata')) {
      this.g.deleteGame(game.id)
      .then(success => {
        this.snackBar.open(success, 'Chiudi', {duration: 3000});
        this.games.splice(index, 1);
      }).catch(err => {
        console.error(err);
        this.snackBar.open(err, 'Chiudi', {duration: 3000});
      });
    } else {
      // TODO
    }
  }

  ngOnInit() {
  }

}
