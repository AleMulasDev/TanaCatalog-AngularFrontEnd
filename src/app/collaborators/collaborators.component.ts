import { Component, OnInit, Input } from '@angular/core';
import { Section, SectionUser, UserPermission } from '../_models/Section';
import { SectionService } from '../_services/section.service';
import { AuthenticationService } from '../_services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-collaborators',
  templateUrl: './collaborators.component.html',
  styleUrls: ['./collaborators.component.css']
})
export class CollaboratorsComponent implements OnInit {
  @Input() section: Section;
  @Input() isMediumMonitor: boolean;
  @Input() permission: UserPermission;

  constructor(private s: SectionService, private auth: AuthenticationService,
              private snackBar: MatSnackBar) {
  }
  users: SectionUser[];
  error: string;
  sectionID;

  isAdding = false;
  newUser: SectionUser;

  editIndex = -1;
  editingUser: SectionUser;

  isLogged(): boolean {
    if (this.auth.currentTokenValue) {
      return true;
    } else {
      return false;
    }
  }

  add() {
    this.s.addUserInSection(this.section, this.newUser.email, this.newUser.permission)
    .then(val => {
      if (val) {
        this.s.retrieveSectionUserList(this.section.id)
        .then(val => {
          if (val instanceof Array) {
            this.users = val;
          } else {
            this.users = undefined;
          }
        }).catch(err => {
          this.error = err;
          console.error(err);
        });
        this.newUser = new SectionUser();
        this.snackBar.open('Utente aggiunto con successo', 'Chiudi', {duration: 3000});
        this.error = '';
        this.isAdding = false;
      }
    }).catch(err => {
      console.error(err);
      this.error = err;
    });
  }

  removeUser(userEmail, index) {
    if (confirm('Sei sicuro di voler eliminare questo collaboratore?')) {
      this.s.removeSectionUser(this.section, userEmail)
      .then(val => {
        this.snackBar.open('Utente rimosso con successo', 'Chiudi', {duration: 3000});
        this.error = '';
        this.users.splice(index, 1);
      }).catch(err => {
        this.error = `Errore nell'eliminazione dell'utente: ${err}`;
        console.error(err);
      });
    }
  }

  modifyPermission(user: SectionUser) {
    if (!user.permission.canModifyPermissions) {
      user.permission.canAddGame = true;
      user.permission.canAddPeople = true;
      user.permission.canDeleteGame = true;
      user.permission.canUpdateGame = true;
    }
  }

  startEdit(index: number, user: SectionUser) {
    if (this.editIndex !== -1) {
      this.users[this.editIndex] = this.editingUser;
    }
    this.editingUser = new SectionUser(user);
    this.editIndex = index;
  }

  undoEdit() {
    this.users[this.editIndex] = this.editingUser;
    this.editIndex = -1;
    this.editingUser = null;
  }

  edit(user: SectionUser) {
    this.s.addUserInSection(this.section, user.email, user.permission)
    .then(value => {
      this.snackBar.open('Utente modificato con successo', 'Chiudi', {duration: 3000});
      this.editIndex = -1;
    }).catch(err => {
      this.error = `Errore nella modifica dell'utente: ${err}`;
    });
  }

  startAdd() {
    this.newUser = new SectionUser();
    this.isAdding = true;
  }

  stopAdding() {
    this.newUser = new SectionUser();
    this.isAdding = false;
  }

  ngOnInit() {
    this.newUser = new SectionUser();
    this.sectionID = this.section.id;
    this.s.retrieveSectionUserList(this.section)
    .then(val => {
      if (val instanceof Array) {
        this.users = val;
      } else {
        this.users = undefined;
      }
    }).catch(err => {
      this.error = `Errore nella ricezione della lista di utenti per la sezione: ${err}`;
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
