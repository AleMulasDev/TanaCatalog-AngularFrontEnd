import { Component, OnInit, Input } from '@angular/core';
import { Section, UserPermission } from '../_models/Section';
import { Holder } from '../_models/Holder';
import { SectionService } from '../_services/section.service';
import { AuthenticationService } from '../_services/authentication.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-holders',
  templateUrl: './holders.component.html',
  styleUrls: ['./holders.component.css']
})
export class HoldersComponent implements OnInit {
  @Input() section: Section;
  @Input() isMediumMonitor: boolean;
  @Input() permission: UserPermission;
  holders: Holder[];
  error: string;
  sectionID;

  isAdding = false;
  newHolder: Holder;

  editIndex = -1;
  editingHolder: Holder;

  constructor(private s: SectionService, private auth: AuthenticationService,
              private snackBar: MatSnackBar) {
  }

  isLogged(): boolean {
    if (this.auth.currentTokenValue) {
      return true;
    } else {
      return false;
    }
  }

  add() {
    this.s.addHolder(this.newHolder, this.sectionID)
    .then(val => {
      if (val) {
        this.newHolder.id = val;
        this.holders = this.holders ? this.holders : new Array();
        this.holders.push(this.newHolder);
        this.newHolder = new Holder();
        this.snackBar.open('Custode aggiunto con successo', 'Chiudi', {duration: 3000});
        this.error = '';
        this.isAdding = false;
      }
    }).catch(err => {
      console.error(err);
      this.error = 'Errore nell\'aggiunta del custode';
    });
  }

  removeHolders(holderID, index) {
    this.s.removeHolder(holderID, this.sectionID)
    .then(val => {
      this.snackBar.open('Custode rimosso con successo', 'Chiudi', {duration: 3000});
      this.error = '';
      this.holders.splice(index, 1);
    }).catch(err => {
      this.error = `Errore nell'eliminazione del custode`;
      console.error(err);
    });
  }

  startEdit(index: number, holder: Holder) {
    if (this.editIndex !== -1) {
      this.holders[this.editIndex] = this.editingHolder;
    }
    this.editingHolder = new Holder(holder);
    this.editIndex = index;
  }

  undoEdit() {
    this.holders[this.editIndex] = this.editingHolder;
    this.editIndex = -1;
    this.editingHolder = null;
  }

  edit(holder: Holder) {
    this.s.modifyHolder(holder, this.sectionID, holder.id)
    .then(value => {
      this.snackBar.open('Custode modificato con successo', 'Chiudi', {duration: 3000});
      this.editIndex = -1;
    }).catch(err => {
      this.error = err;
    });
  }

  startAdd() {
    this.newHolder = new Holder();
    this.isAdding = true;
  }

  stopAdding() {
    this.newHolder = new Holder();
    this.isAdding = false;
  }

  ngOnInit() {
    this.sectionID = this.section.id;
    this.s.getHolders(this.section.id)
    .then(val => {
      if (val instanceof Array) {
        this.holders = val;
      } else {
        this.holders = undefined;
      }
    }).catch(err => {
      this.error = err;
      console.error(err);
    });
  }

}
