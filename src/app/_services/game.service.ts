import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { Game } from '../_models/Game';
import { BggGameSearch } from '../_models/BggGameSearch';
import { BggGameData } from '../_models/bggGameData';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { constant } from '../_utils/constants';
import xml2js from 'xml2js';
const parseString = xml2js.parseString;

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private auth: AuthenticationService, private http: HttpClient) {}

  //
  //          GAME LIST
  //
  retrieveGameList(): Promise<Game[] | string> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(constant.server.BASE_PATH_GAMES)
      .subscribe(response => {
        if (response.status && response.status === 'ok') {
          if (response.games) {
            let games: Game[];
            try {
              games = response.games;
              resolve(games);
            } catch (err) {
              reject('Errore nell\'elaborazione dei giochi');
            }
          } else {
            reject('Impossibile ottenere la lista di giochi');
          }
        } else {
          reject('Impossibile ottenere una risposta dal server');
        }
      }, err => {
        reject('Si è verificato un errore di connessione');
      });
    });
  }

  //
  //          SEARCH
  //
  searchbggGame(name: string): Promise<BggGameSearch[] | string> {
    let params = `?search=${encodeURIComponent(name)}`;
    return new Promise((resolve, reject) => {
      this.http.get<any>(constant.server.SEARCHBGG_GAME_PATH + params)
      .subscribe(response => {
        if (response.status && response.status === 'ok') {
          if (response.result) {
            let games: BggGameSearch[];
            games = new Array();
            try {
              for (let boardgame of response.result) {
                let game = new BggGameSearch();
                if (boardgame.name) {
                  game.name = boardgame.name[0]._ ? boardgame.name[0]._ : boardgame.name;
                }
                if (boardgame.yearpublished) {
                  game.yearpublished = boardgame.yearpublished;
                }
                if (boardgame.$ && boardgame.$.objectid) {
                  game.objectid = boardgame.$.objectid;
                }
                games.push(game);
              }
              resolve(games);
            } catch (err) {
              reject('Errore nell\'elaborazione dei giochi ' + err);
            }
          } else {
            reject('Impossibile ottenere la lista di giochi');
          }
        } else {
          reject('Impossibile ottenere una risposta dal server');
        }
      }, err => {
        reject('Si è verificato un errore di connessione: ' + err);
      });
    });
  }

  //
  //          DATA
  //
  getbggGameData(id: string): Promise<BggGameData[] | string> {
    const params = `?bggid=${encodeURIComponent(id)}`;
    return new Promise((resolve, reject) => {
      this.http.get<any>(constant.server.FETCHBGG_GAME_PATH + params)
      .subscribe(response => {
        if (response.status && response.status === 'ok') {
          if (response.result) {
            let games: BggGameData[];
            games = new Array();
            try {
              for (let boardgame of response.result) {
                const game = new BggGameData(boardgame);
                games.push(game);
              }
              resolve(games);
            } catch (err) {
              reject('Errore nell\'elaborazione dei giochi ' + err);
            }
          } else {
            reject('Impossibile ottenere la lista di giochi');
          }
        } else {
          reject('Impossibile ottenere una risposta dal server');
        }
      }, err => {
        reject('Si è verificato un errore di connessione: ' + err);
      });
    });
  }

  //
  //          ADD GAME
  //
  addGame(game: Game, file?: File): Promise<string> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type':  'multipart/form-data',
      })
    };
    const formdata: FormData = new FormData();
    if (file) {
      formdata.set('image', file, file.name);
    }
    // tslint:disable-next-line: forin
    for (const obj in game) {
      formdata.set(obj, game[obj]);
    }
    const token = this.auth.currentTokenValue;
    formdata.set('token', token);
    const {id, title, description, link_tdg, players, playtime, age, gamebgg_id, image, thumbnail, price} = game;
    return new Promise((resolve, reject) => {
      this.http.put<any>(constant.server.BASE_PATH_GAMES,
      // {id, title, description, link_tdg, players, playtime, age, gamebgg_id, image, thumbnail, price, token})
      formdata)
      .subscribe(response => {
        if (response.status && response.status === 'ok') {
          resolve('Gioco modificato con successo');
        } else {
          reject('Impossibile ottenere una risposta dal server');
          console.error(response);
        }
      }, err => {
        reject('Si è verificato un errore di connessione: ' + err);
      });
    });
  }

  //
  //          DELETE GAME
  //
  deleteGame(id: string): Promise<string> {
    const formdata: FormData = new FormData();
    formdata.set('id', id);
    let token = this.auth.currentTokenValue;
    if (!token) {
      return Promise.reject('Unlogged user');
    }
    const params = `?token=${encodeURIComponent(token)}&id=${encodeURIComponent(id)}`;
    formdata.set('token', token);
    return new Promise((resolve, reject) => {
      this.http.delete<any>(constant.server.BASE_PATH_GAMES+params)
      .subscribe(response => {
        if (response.status && response.status === 'ok') {
          resolve('Gioco rimosso con successo');
        } else {
          reject('Impossibile ottenere una risposta dal server');
        }
      }, err => {
        reject('Si è verificato un errore di connessione: ' + err);
      });
    });
  }
}
