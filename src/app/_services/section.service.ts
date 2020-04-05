import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { constant } from '../_utils/constants';
import { Section, SectionUser, UserPermission, AddUserPermission } from '../_models/Section';
import { Holder } from '../_models/Holder';

@Injectable({
  providedIn: 'root'
})
export class SectionService {
  constructor(private auth: AuthenticationService, private http: HttpClient) {}

  //
  //          SECTION PERMISSION
  //
  retrieveSectionPermission(sectionID): Promise<UserPermission | string> {
    return new Promise((resolve, reject) => {
      const token = this.auth.currentTokenValue;
      if (!token) {
        reject('Unlogged user');
      }
      const params = `?token=${encodeURIComponent(token)}&sectionID=${encodeURIComponent(sectionID)}`;
      this.http.get<any>(constant.server.SECTION_PERMISSION_PATH + params)
      .subscribe(response => {
        if (response.status && response.status === 'ok') {
          if (response.permission) {
            try {
              resolve(new UserPermission(response.permission));
            } catch (err) {
              reject('Errore nell\'elaborazione dei permessi');
            }
          } else {
            reject('Impossibile ottenere i permessi della sezione');
          }
        } else {
          reject('Impossibile ottenere una risposta dal server');
        }
      }, err => {
        reject('Si è verificato un errore di connessione ' + err);
      });
    });
  }

  //
  //          SECTION LIST
  //
  retrieveSectionList(): Promise<Section[] | string> {
    return new Promise((resolve, reject) => {
      const token = this.auth.currentTokenValue;
      if (!token) {
        reject('Unlogged user');
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
        reject('Si è verificato un errore di connessione ' + err);
      });
    });
  }

  //
  //          SECTION USER LIST
  //
  retrieveSectionUserList(section: Section): Promise<SectionUser[] | string> {
    return new Promise((resolve, reject) => {
      const sectionID = section.id;
      const token = this.auth.currentTokenValue;
      if (!token) {
        reject('Unlogged user');
      }
      const params = `?token=${encodeURIComponent(token)}&sectionID=${encodeURIComponent(sectionID)}`;
      this.http.get<any>(constant.server.SECTION_USER_PATH + params)
      .subscribe(response => {
        if (response.status && response.status === 'ok') {
          if (response.users) {
            let users: SectionUser[];
            users = new Array();
            try {
              for(const user of response.users){
                users.push(new SectionUser(user));
              }
              resolve(users);
            } catch (err) {
              reject('Errore nell\'elaborazione degli utenti nella sezione ' + err);
            }
          } else {
            reject('Impossibile ottenere la lista degli utenti nella sezione');
          }
        } else {
          reject(response.error || 'Impossibile ottenere una risposta dal server: ');
        }
      }, err => {
        reject('Si è verificato un errore di connessione ' + err);
      });
    });
  }

  //
  //          ADD SECTION
  //
  addSection(title: string): Promise<string> {
    return new Promise((resolve, reject) => {
    const formdata: FormData = new FormData();
    formdata.set('title', title);
    const token = this.auth.currentTokenValue;
    if (!token) {
      reject('Unlogged user');
    }
    formdata.set('token', token);
    this.http.put<any>(constant.server.BASE_PATH_SECTIONS,
    formdata)
    .subscribe(response => {
      if (response.status && response.status === 'ok') {
        resolve(response.sectionId || null);
      } else {
        reject(response.error || 'Impossibile ottenere una risposta dal server');
      }
    }, err => {
      reject('Si è verificato un errore di connessione: ' + err);
    });
  });
  }

  //
  //          ADD USER IN SECTION
  //
  addUserInSection(section: Section, email: string, permission: UserPermission): Promise<string> {
    return new Promise((resolve, reject) => {
    const token = this.auth.currentTokenValue;
    if (!token) {
      reject('Unlogged user');
    }
    const queryPermission = new AddUserPermission(permission);
    this.http.put<any>(constant.server.SECTION_USER_PATH,
    {
      token,
      sectionID: section.id,
      userEmail: email,
      permission: queryPermission
    })
    .subscribe(response => {
      if (response.status && response.status === 'ok') {
        resolve();
      } else {
        reject(response.error || 'Impossibile ottenere una risposta dal server');
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
    return new Promise((resolve, reject) => {
    const formdata: FormData = new FormData();
    formdata.set('title', title);
    formdata.set('id', id);
    const token = this.auth.currentTokenValue;
    if (!token) {
      reject('Unlogged user');
    }
    formdata.set('token', token);
    this.http.put<any>(constant.server.BASE_PATH_SECTIONS,
    formdata)
    .subscribe(response => {
      if (response.status && response.status === 'ok') {
        resolve('Sezione modificata con successo');
      } else {
        reject(response.error || 'Impossibile ottenere una risposta dal server');
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
    return new Promise((resolve, reject) => {
    const token = this.auth.currentTokenValue;
    if (!token) {
      reject('Unlogged user');
    }
    const params = `?token=${encodeURIComponent(token)}&id=${encodeURIComponent(id)}`;
    this.http.delete<any>(constant.server.BASE_PATH_SECTIONS + params)
    .subscribe(response => {
      if (response.status && response.status === 'ok') {
        resolve('Sezione rimossa con successo');
      } else {
        reject(response.error || 'Impossibile ottenere una risposta dal server');
      }
    }, err => {
      reject('Si è verificato un errore di connessione: ' + err);
    });
  });
  }

  //
  //          REMOVE SECTION USER
  //
  removeSectionUser(section: Section, userEmail: string): Promise<SectionUser[] | string> {
    return new Promise((resolve, reject) => {
      const sectionID = section.id;
      const token = this.auth.currentTokenValue;
      if (!token) {
        reject('Unlogged user');
      }
      const params =
      `?token=${encodeURIComponent(token)}&sectionID=${encodeURIComponent(section.id)}&userEmail=${encodeURIComponent(userEmail)}`;
      this.http.delete<any>(constant.server.SECTION_USER_PATH + params)
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

  //
  //          GET HOLDERS
  //
  getHolders(sectionID: string): Promise<Holder[] | string> {
    return new Promise((resolve, reject) => {
    const token = this.auth.currentTokenValue;
    if (!token) {
      reject('Unlogged user');
    }
    const params = `?token=${encodeURIComponent(token)}&sectionID=${encodeURIComponent(sectionID)}`;
    this.http.get<any>(constant.server.HOLDER_PATH + params)
    .subscribe(response => {
      if (response.status && response.status === 'ok') {
        try {
          if (!response.holders) {
            resolve();
          } else {
            const holders = new Array();
            for (const holder of response.holders) {
              holders.push(new Holder(holder));
            }
            resolve(holders);
          }
        } catch (err) {
          reject('Errore elaborando la lista di custodi...');
        }
      } else {
        reject(response.error);
      }
    }, err => {
      reject('Si è verificato un errore di connessione: ' + err);
    });
  });
  }

  //
  //          ADD HOLDER
  //
  addHolder(holder: Holder, sectionID: string): Promise<string> {
    return new Promise((resolve, reject) => {
    const formdata: FormData = new FormData();
    // tslint:disable-next-line: forin
    for (const obj in holder) {
      formdata.set(obj, holder[obj]);
    }
    formdata.set('sectionID', sectionID);
    const token = this.auth.currentTokenValue;
    if (!token) {
      reject('Unlogged user');
    }
    formdata.set('token', token);
    this.http.put<any>(constant.server.HOLDER_PATH,
    formdata)
    .subscribe(response => {
      if (response.status && response.status === 'ok') {
        if (response.holderID) {
          resolve(response.holderID);
        } else {
          resolve();
        }
      } else {
        reject(response.error || 'Impossibile ottenere una risposta dal server');
      }
    }, err => {
      reject('Si è verificato un errore di connessione: ' + err);
    });
  });
  }

  //
  //          REMOVE HOLDER
  //
  removeHolder(holderID, sectionID: string): Promise<string> {
    return new Promise((resolve, reject) => {
    const token = this.auth.currentTokenValue;
    if (!token) {
      reject('Unlogged user');
    }
    const params = `?token=${encodeURIComponent(token)}&sectionID=${encodeURIComponent(sectionID)}&id=${encodeURIComponent(holderID)}`;
    this.http.delete<any>(constant.server.HOLDER_PATH + params)
    .subscribe(response => {
      if (response.status && response.status === 'ok') {
        resolve();
      } else {
        reject(response.error || 'Impossibile ottenere una risposta dal server');
      }
    }, err => {
      reject('Si è verificato un errore di connessione: ' + err);
    });
    });
  }

  //
  //          MODIFY HOLDER
  //
  modifyHolder(holder: Holder, sectionID: string, holderID): Promise<string> {
    return new Promise((resolve, reject) => {
    const formdata: FormData = new FormData();
    // tslint:disable-next-line: forin
    for (const obj in holder) {
      formdata.set(obj, holder[obj]);
    }
    formdata.set('sectionID', sectionID);
    formdata.set('holderID', holderID);
    const token = this.auth.currentTokenValue;
    if (!token) {
      reject('Unlogged user');
    }
    formdata.set('token', token);
    this.http.put<any>(constant.server.HOLDER_PATH,
    formdata)
    .subscribe(response => {
      if (response.status && response.status === 'ok') {
        if (response.holderID) {
          resolve(response.holderID);
        } else {
          resolve();
        }
      } else {
        reject(response.error || 'Impossibile ottenere una risposta dal server');
      }
    }, err => {
      reject('Si è verificato un errore di connessione: ' + err);
    });
  });
  }
}
