import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { constant } from '../_utils/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserToken: BehaviorSubject<string>;

  constructor(private http: HttpClient, private snackBar: MatSnackBar, private router: Router) {
    this.currentUserToken = new BehaviorSubject<string>(localStorage.getItem('currentUserToken'));
    this.confirmToken()
    .then(val => {
    }).catch(err => {
    });
  }

  public getBehaviourSubject(): BehaviorSubject<string> {
    return this.currentUserToken;
  }

  public get currentTokenValue(): string {
    return this.currentUserToken.value;
  }

  async confirmToken() {
    return new Promise((resolve, reject) => {
    const token = this.currentTokenValue;
    if (token == null || token === undefined || token === '') {
      reject('Unlogged user');
      return;
    }
    const params = `?token=${encodeURIComponent(token)}`;
    this.http.get<any>(constant.server.TOKEN_CHECK_PATH + params
      ).subscribe(response => {
      if (response.status && response.status === 'ok') {
        resolve(true);
      } else {
        localStorage.setItem('currentUserToken', '');
        sessionStorage.setItem('currentUserToken', '');
        if (this.currentTokenValue != '') {
          this.currentUserToken.next('');
          this.router.navigate(['/login']);
        }
        this.currentUserToken.next('');
        resolve(false);
      }
    }, err => {
      reject('Si è verificato un errore di connessione');
    });
  });
  }

  recover(e: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return new Promise((resolve, reject) => {
      this.http.post<any>(constant.server.RECOVER_PATH, {
      email: e,
      redirect: constant.client.APP_AFTERLOGIN_CHANGEPASS
      }, httpOptions).subscribe(response => {
        if (response.status && response.status === 'ok') {
          resolve();
        } else {
          reject('Unable to get response from server');
        }
      }, err => {
        reject('Si è verificato un errore di connessione');
      });
    });
  }

  login(e: string, p: string, keepLogged: boolean): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return new Promise((resolve, reject) => {
      this.http.post<any>(constant.server.LOGIN_PATH, {
      email: e,
      password: p
      }, httpOptions).subscribe(response => {
        if (response.token && response.token != null) {
          if (keepLogged) {
            localStorage.setItem('currentUserToken', response.token);
          } else {
            sessionStorage.setItem('currentUserToken', response.token);
          }
          this.currentUserToken.next(response.token);
          resolve(response.token);
        } else {
          if (response.error) {
            reject(response.error);
          } else {
            reject('Impossibile avere risposta dal server');
          }
        }
      }, err => {
        reject('Si è verificato un errore di connessione');
      });
    });
  }

  register(f: string, l: string, e: string, p: string): Promise<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return new Promise((resolve, reject) => {
      this.http.post<any>(constant.server.REGISTER_PATH, {
      firstname: f,
      lastname: l,
      email: e,
      password: p,
      redirect: constant.client.APP_LOGIN_PATH
      }, httpOptions).subscribe(response => {
        if (response.status && response.status === 'ok') {
          resolve();
        } else {
          if (response.error) {
            reject(response.error);
          } else {
            reject('Impossibile avere risposta dal server');
          }
        }
      }, err => {
        reject('Si è verificato un errore di connessione');
      });
    });
  }

  changeEmail(oldEmail: string, newEmail: string, password: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return new Promise((resolve, reject) => {
      this.http.post<any>(constant.server.CHANGE_EMAIL_PATH, {
        password, oldEmail, newEmail, redirect: constant.client.APP_LOGIN_PATH
      }, httpOptions).subscribe(response => {
        if (response.status && response.status === 'ok') {
          resolve();
        } else {
          if (response.error) {
            reject(response.error);
          } else {
            reject('Impossibile avere risposta dal server');
          }
        }
      }, err => {
        reject('Si è verificato un errore di connessione ' + JSON.stringify(err));
      });
    });
  }

  changePassword(newPassword: string, oldPassword: string) {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json'
      })
    };
    return new Promise((resolve, reject) => {
      this.http.post<any>(constant.server.CHANGE_PATH, {
        oldPassword, newPassword, token: this.currentTokenValue
      }, httpOptions).subscribe(response => {
        if (response.status && response.status === 'ok') {
          resolve();
        } else {
          if (response.error) {
            reject(response.error);
          } else {
            reject('Impossibile avere risposta dal server');
          }
        }
      }, err => {
        reject('Si è verificato un errore di connessione ' + JSON.stringify(err));
      });
    });
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUserToken');
    sessionStorage.removeItem('currentUserToken');
    this.currentUserToken.next('');
  }
}
