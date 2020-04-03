import { Component, OnInit } from '@angular/core';
import { GameService } from '../_services/game.service';
import { BggGameSearch } from '../_models/BggGameSearch';
import { CompleterService } from 'ng2-completer';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { BggGameData } from '../_models/bggGameData';
import { Game } from '../_models/Game';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
  searched = false;
  title: string;
  suggestedGames: BggGameSearch[];
  game: Game;

  titleTimeout = undefined;
  searching = false;
  error: string;
  file: File;
  canFind = true;

  imagePreview;

  cantFind() {
    this.game = new Game();
    this.canFind = false;
    this.searched = true;
    this.game.canUpdateGame = 'true';
  }

  handleFile(files: FileList) {
    this.file = files.item(0);

    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.error = 'Only images are supported.';
      return;
    }
 
    const reader = new FileReader();
    reader.readAsDataURL(files[0]);
    reader.onload = (event) => {
      this.imagePreview = reader.result;
    }
  }

  onSubmit() {
    this.gameService.addGame(this.game, this.file)
    .then(val => {
      const snakRef = this.snackBar.open(val, 'Chiudi', {duration: 3000});
      snakRef.afterDismissed().subscribe(() => {
        this.router.navigate(['visualizeGames']);
      });
    }).catch(err => {
      this.snackBar.open(err, 'Chiudi', {duration: 3000});
    });
  }

  onSelect(evt: MatAutocompleteSelectedEvent) {
    this.error = undefined;
    let bggId: string;
    for (const game of this.suggestedGames) {
      if (game.name === evt.option.value) {
        bggId = game.objectid;
      }
    }
    if (bggId) {
      this.gameService.getbggGameData(bggId).then(val => {
        if (val instanceof Array) {
          this.searched = true;
          this.game = new Game(val[0]);
          this.game.thumbnail = val[0].thumbnailURI;
          this.game.canUpdateGame = 'true';
        }
      }).catch(err => {
        this.error = err;
      });
    } else {
      // Print error?
    }
  }

  searchBggGame() {
    this.error = undefined;
    if (this.title === '') {
      return;
    }
    if (this.titleTimeout) {
      clearInterval(this.titleTimeout);
    }
    this.gameService.searchbggGame(this.title)
    .then(val => {
      val instanceof Array ? this.suggestedGames = val : null;
      this.searching = false;
      // console.log(JSON.stringify(val));
    })
    .catch(err => this.error = err ? err : 'Errore non specificato');
  }

  startTimer() {
    this.suggestedGames = undefined;
    if (this.title === '') {
      return;
    }
    if (this.titleTimeout) {
      clearTimeout(this.titleTimeout);
    }
    this.titleTimeout = setTimeout(() => {
      this.searchBggGame();
      this.searching = true;
    }, 500);
  }

  constructor(private gameService: GameService, private completerService: CompleterService, private snackBar: MatSnackBar,
              private router: Router) {
    this.completerService.local(this.suggestedGames, 'name', 'title');
  }

  ngOnInit() {
  }

}
