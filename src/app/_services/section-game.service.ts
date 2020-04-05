import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { constant } from '../_utils/constants';
import { Section, SectionUser, UserPermission, AddUserPermission } from '../_models/Section';
import { Holder } from '../_models/Holder';
import { SectionGames, SectionGamesToAdd } from '../_models/SectionGame';

@Injectable({
  providedIn: 'root'
})
export class SectionGameService {

  constructor(private auth: AuthenticationService, private http: HttpClient) { }

  getSectionGameList(sectionID): Promise<SectionGames[] | string>  {
    return new Promise((resolve, reject) => {
      const token = this.auth.currentTokenValue;
      if (!token) {
        reject('Unlogged user');
      }
      const params = `?token=${encodeURIComponent(token)}&sectionID=${encodeURIComponent(sectionID)}`;
      this.http.get<any>(constant.server.SECTION_GAMES_PATH + params)
      .subscribe(response => {
        if (response.status && response.status === 'ok') {
          if (response.sectionGames) {
            try {
              const sectionGames: SectionGames[] = new Array();
              for (const sectionGame of response.sectionGames) {
                sectionGames.push(new SectionGames(sectionGame));
              }
              resolve(sectionGames);
            } catch (err) {
              reject('Errore nell\'elaborazione dei giochi della sezioni');
            }
          } else {
            reject('Impossibile ottenere i giochi della sezioni');
          }
        } else {
          reject(response.error || 'Impossibile ottenere una risposta dal server');
        }
      }, err => {
        reject('Si è verificato un errore di connessione ' + err);
      });
    });
  }

  sendSectionGame(SectionGame: SectionGames): Promise<string> {
    const toSend = new SectionGamesToAdd(SectionGame).get();
    return new Promise((resolve, reject) => {
      const token = this.auth.currentTokenValue;
      if (!token) {
        reject('Unlogged user');
      }
      const formdata: FormData = new FormData();
      formdata.set('token', token);
      // tslint:disable-next-line: forin
      for (const obj in toSend) {
        formdata.set(obj, toSend[obj]);
      }
      this.http.put<any>(constant.server.SECTION_GAMES_PATH, formdata)
      .subscribe(response => {
        if (response.status && response.status === 'ok') {
          resolve(response.sectionGameID ? response.sectionGameID : -1);
        } else {
          reject(response.error || 'Impossibile ottenere una risposta dal server');
        }
      }, err => {
        reject('Si è verificato un errore di connessione: ' + err);
      });
    });
  }

  removeSectionGame(sectionGameID, sectionID): Promise<string>  {
    return new Promise((resolve, reject) => {
      const token = this.auth.currentTokenValue;
      if (!token) {
        reject('Unlogged user');
      }
      const params = `?token=${encodeURIComponent(token)}&sectionID=${encodeURIComponent(sectionID)}&id=${encodeURIComponent(sectionGameID)}`;
      this.http.delete<any>(constant.server.SECTION_GAMES_PATH + params)
      .subscribe(response => {
        if (response.status && response.status === 'ok') {
          resolve();
        } else {
          reject(response.error || 'Impossibile ottenere una risposta dal server');
        }
      }, err => {
        reject('Si è verificato un errore di connessione ' + err);
      });
    });
  }
}
