import { Component, OnInit } from '@angular/core';
import { GameService } from '../_services/game.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Game } from '../_models/Game';
import { constant } from '../_utils/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-visualize-games',
  templateUrl: './visualize-games.component.html',
  styleUrls: ['./visualize-games.component.css']
})
export class VisualizeGamesComponent implements OnInit {
  games: Game[];
  error: string;

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

  constructor(private g: GameService, private auth: AuthenticationService, private router: Router) {
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
        console.log(success);
        this.games.splice(index, 1);
      }).catch(err => {
        console.error(err);
      });
    } else {
      // TODO
    }
  }

  ngOnInit() {
  }

}
