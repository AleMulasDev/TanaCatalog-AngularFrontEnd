import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { constant } from '../_utils/constants';
import { Section } from '../_models/Section';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  constructor(private auth: AuthenticationService, private http: HttpClient) {}

  //
  //          SECTION LIST
  //
  retrieveSectionList(): Promise<Section[] | string> {
    return new Promise((resolve, reject) => {
      const token = this.auth.currentTokenValue;
      if (!token) {
        return Promise.reject('Unlogged user');
      }
      const params = `?token=${encodeURIComponent(token)}`;
      this.http.get<any>(constant.server.BASE_PATH_SECTIONS + params)
      .subscribe(response => {
        if (response.status && response.status === 'ok') {
          if (response.sections) {
            let sections: Section[];
            try {
              sections = response.sections;
              resolve(sections);
            } catch (err) {
              reject('Errore nell\'elaborazione delle sezioni');
            }
          } else {
            reject('Impossibile ottenere la lista di sezioni');
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
  //          ADD SECTION
  //
  addSection(title: string): Promise<string> {
    const formdata: FormData = new FormData();
    formdata.set('title', title);
    const token = this.auth.currentTokenValue;
    if (!token) {
      return Promise.reject('Unlogged user');
    }
    formdata.set('token', token);
    return new Promise((resolve, reject) => {
      this.http.put<any>(constant.server.BASE_PATH_SECTIONS,
      formdata)
      .subscribe(response => {
        if (response.status && response.status === 'ok') {
          resolve(response.sectionId || null);
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
  //          MODIFY SECTION
  //
  modifySection(id: string, title: string): Promise<string> {
    const formdata: FormData = new FormData();
    formdata.set('title', title);
    formdata.set('id', id);
    const token = this.auth.currentTokenValue;
    if (!token) {
      return Promise.reject('Unlogged user');
    }
    formdata.set('token', token);
    return new Promise((resolve, reject) => {
      this.http.put<any>(constant.server.BASE_PATH_SECTIONS,
      formdata)
      .subscribe(response => {
        if (response.status && response.status === 'ok') {
          resolve('Sezione modificata con successo');
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
  //          DELETE SECTION
  //
  deleteSection(id: string): Promise<string> {
    const token = this.auth.currentTokenValue;
    if (!token) {
      return Promise.reject('Unlogged user');
    }
    const params = `?token=${encodeURIComponent(token)}&id=${encodeURIComponent(id)}`;
    return new Promise((resolve, reject) => {
      this.http.delete<any>(constant.server.BASE_PATH_SECTIONS + params)
      .subscribe(response => {
        if (response.status && response.status === 'ok') {
          resolve('Sezione rimossa con successo');
        } else {
          reject('Impossibile ottenere una risposta dal server');
        }
      }, err => {
        reject('Si è verificato un errore di connessione: ' + err);
      });
    });
  }
}
