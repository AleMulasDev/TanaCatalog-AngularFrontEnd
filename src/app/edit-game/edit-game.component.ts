import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Game } from '../_models/Game';
import { GameService } from '../_services/game.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-game',
  templateUrl: './edit-game.component.html',
  styleUrls: ['./edit-game.component.css']
})
export class EditGameComponent implements OnInit {
  gameid: string;
  error: string;
  games: Game[];
  game: Game;

  onSubmit() {
    this.g.addGame(this.game)
    .then(val => {
      const snakRef = this.snackBar.open(val, 'Chiudi', {duration: 3000});
      snakRef.afterDismissed().subscribe(() => {
        this.router.navigate(['']);
      });
    }).catch(err => {
      this.snackBar.open(err, 'Chiudi', {duration: 3000});
    });
  }


  constructor(
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private g: GameService) {
      this.route.params.subscribe(params => {
        if (params.id != null && params.id !== '') {
          this.gameid = params.id;
          g.retrieveGameList()
          .then(value => {
            this.games = value instanceof Array ? value : undefined;
            for (const game of this.games) {
              if (game.id == this.gameid) {
                this.game = game;
              }
            }
          }).catch(err => {
            this.error = err;
          });
        } else {
          this.error = 'Errore, non è stato ricevuto il gioco da modificare';
        }
      });
    }

  ngOnInit() {
  }

}
