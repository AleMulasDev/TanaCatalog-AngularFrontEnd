import { Component, OnInit, Input } from '@angular/core';
import { Section, UserPermission } from '../_models/Section';
import { Game } from '../_models/Game';
import { GameService } from '../_services/game.service';
import { SectionGames } from '../_models/SectionGame';
import { SectionService } from '../_services/section.service';
import { SectionGameService } from '../_services/section-game.service';
import { AuthenticationService } from '../_services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Holder } from '../_models/Holder';

class SearchOption {
  constructor() {
    this.type = 1;
  }
  value: string;
  type: number;
  isNew: boolean;
}

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  @Input() section: Section;
  @Input() isMediumMonitor: boolean;
  @Input() permission: UserPermission;

  constructor(private s: SectionService, private auth: AuthenticationService,
              private snackBar: MatSnackBar, private sg: SectionGameService,
              private g: GameService) {
  }
  sectionGames: SectionGames[];
  filteredSectionGames: SectionGames[];
  searchOption: SearchOption = new SearchOption();

  originSuggested: string[];
  proprietySuggested: string[];

  gameList: Game[];
  filteredGameList: Game[];
  holderList: Holder[];
  filteredHolderList: Holder[];

  error: string;
  sectionID;

  isAdding = false;
  newSectionGame: SectionGames;

  editIndex = -1;
  editingSectionGame: SectionGames;

  isLogged(): boolean {
    if (this.auth.currentTokenValue) {
      return true;
    } else {
      return false;
    }
  }

  add() {
    this.newSectionGame.sectionID = this.sectionID;
    this.sg.sendSectionGame(this.newSectionGame)
    .then(val => {
      if (val) {
        this.newSectionGame = new SectionGames();
        this.sg.getSectionGameList(this.section.id)
        .then(val => {
          if (val instanceof Array) {
            this.sectionGames = val;
            this.filteredSectionGames = this.sectionGames;
          } else {
            this.sectionGames = undefined;
            this.filteredSectionGames = this.sectionGames;
          }
        }).catch(err => {
          this.error = err;
          console.error(err);
          this.newSectionGame = new SectionGames();
        });
        this.snackBar.open('Gioco di sezione aggiunto con successo', 'Chiudi', {duration: 3000});
        this.error = '';
        this.isAdding = false;
      }
    }).catch(err => {
      console.error(err);
      this.error = err;
    });
  }

  removesectionGame(sectionGameID, index) {
    if (confirm('Sei sicuro di voler eliminare questo collaboratore?')) {
      this.sg.removeSectionGame(sectionGameID, this.sectionID)
      .then(val => {
      this.snackBar.open('Gioco di sezione rimosso con successo', 'Chiudi', {duration: 3000});
      this.error = '';
      for (let i = 0; i < this.sectionGames.length; i++) {
        if (this.sectionGames[i].id == this.filteredSectionGames[index].id) {
          this.sectionGames.splice(i, 1);
          break;
        }
      }
      this.filteredSectionGames.splice(index, 1);
      }).catch(err => {
      this.error = `Errore nell'eliminazione del Gioco di sezione: ${err}`;
      console.error(err);
      });
    }
  }

  search() {
    if (!this.searchOption.value) {
      this.searchOption.value = '';
    }
    const arr: SectionGames[] = new Array();
    if (!this.searchOption.type) {
      this.searchOption.type = 1; // default
    }
    let search = 'gameTitle';
    switch (this.searchOption.type) {
    case 1: // Title
      search = 'gameTitle';
      break;
    case 2: // holder
      search = 'holderTitle';
      break;
    case 3: // origin
      search = 'origin';
      break;
    case 4: // propriety
      search = 'propriety';
      break;
    }
    let n = this.searchOption.isNew;
    for (const sGame of this.sectionGames) {
      if (sGame[search].toLowerCase().includes(this.searchOption.value.toLowerCase())
      && (!n || sGame.isNew)) {
        arr.push(sGame);
      }
    }
    this.filteredSectionGames = arr;
  }

  onSelectGame(evt: MatAutocompleteSelectedEvent) {
    this.newSectionGame.gameID = evt.option.value.id;
  }

  onSelectHolder(evt: MatAutocompleteSelectedEvent) {
    this.newSectionGame.holderID = evt.option.value.id;
  }

  displayFn(obj): string {
    return obj && obj.title ? obj.title : '';
  }

  filterGame(value: string) {
    const sugg: Game[] = new Array();
    for (const game of this.gameList) {
      if (game.title.startsWith(value)) {
        sugg.push(game);
      }
    }
    this.filteredGameList = sugg;
  }

  filterHolder(value: string) {
    const sugg: Holder[] = new Array();
    for (const holder of this.holderList) {
      if (holder.title.startsWith(value)) {
        sugg.push(holder);
      }
    }
    this.filteredHolderList = sugg;
  }

  updateSuggested() {
    this.originSuggested = new Array();
    for (const sectionGame of this.sectionGames) {
      const origin = sectionGame.origin;
      let notFound = true;
      for (const originSaved of this.originSuggested) {
        if (origin === originSaved) {
          notFound = false;
        }
      }
      if (notFound) {
        this.originSuggested.push(origin);
      }
    }

    this.proprietySuggested = new Array();
    for (const sectionGame of this.sectionGames) {
      const propriety = sectionGame.propriety;
      let notFound = true;
      for (const proprietySaved of this.proprietySuggested) {
        if (propriety === proprietySaved) {
          notFound = false;
        }
      }
      if (notFound) {
        this.proprietySuggested.push(propriety);
      }
    }
  }

  startEdit(index: number, sectionGame: SectionGames) {
    this.updateSuggested();
    if (this.editIndex !== -1) {
      this.sectionGames[this.editIndex] = this.editingSectionGame;
    }
    this.editingSectionGame = new SectionGames(sectionGame);
    this.editIndex = index;
  }

  undoEdit() {
    this.sectionGames[this.editIndex] = this.editingSectionGame;
    this.editIndex = -1;
    this.editingSectionGame = null;
  }

  edit(sectionGame: SectionGames) {
    this.sg.sendSectionGame(sectionGame)
    .then(value => {
      this.snackBar.open('Gioco di sezione modificato con successo', 'Chiudi', {duration: 3000});
      this.editIndex = -1;
      this.error = '';
    }).catch(err => {
      this.error = `Errore nella modifica del gioco di sezione: ${err}`;
    });
  }

  startAdd() {
    this.updateSuggested();
    this.newSectionGame = new SectionGames();
    this.isAdding = true;
    this.g.retrieveGameList()
    .then(val => {
      this.gameList = val instanceof Array ? val : undefined;
      this.filteredGameList = this.gameList;
    }).catch(err => {
      this.error = err;
      console.error(err);
    });

    this.s.getHolders(this.sectionID)
    .then(val => {
      this.holderList = val instanceof Array ? val : undefined;
      this.filteredHolderList = this.holderList;
    }).catch(err => {
      this.error = err;
      console.error(err);
    });
  }

  stopAdding() {
    this.newSectionGame = new SectionGames();
    this.isAdding = false;
  }

  ngOnInit() {
    this.newSectionGame = new SectionGames();
    this.sectionID = this.section.id;
    this.sg.getSectionGameList(this.section.id)
    .then(val => {
    if (val instanceof Array) {
      this.sectionGames = val;
      this.filteredSectionGames = this.sectionGames;
      this.error = '';
    } else {
      this.sectionGames = undefined;
      this.filteredSectionGames = undefined;
    }
    }).catch(err => {
      this.error = `Errore nella ricezione della lista di giochi della sezione: ${err}`;
    });
    if (!this.permission) {
      this.permission.canAddGame = false;
      this.permission.canAddPeople = false;
      this.permission.canDeleteGame = false;
      this.permission.canModifyPermissions = false;
      this.permission.canUpdateGame = false;
      this.permission.isOwner = false;
    }
  }
}
