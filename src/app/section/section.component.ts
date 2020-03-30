import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SectionService } from '../_services/section.service';
import { Section } from '../_models/Section';
import { GameService } from '../_services/game.service';
import { Holder } from '../_models/Holder';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {
  sectionID;
  sections: Section[];
  section: Section;
  error: string;
  holders: Holder[];

  isAdding = false;
  newHolder: Holder;

  editIndex = -1;
  editingHolder: Holder;

  constructor(private route: ActivatedRoute,
              private s: SectionService,
              private g: GameService,
              private snackBar: MatSnackBar) {
    this.route.params.subscribe(params => {
      if (params.id != null && params.id !== '') {
        this.sectionID = params.id;
        this.s.retrieveSectionList()
        .then(value => {
          this.sections = value instanceof Array ? value : undefined;
          for (const section of this.sections) {
            if (section.id == this.sectionID) {
              this.section = section;
              this.getHolders(this.sectionID);
            }
          }
          if (this.section == null) {
            this.error = 'Errore, non è stata trovata la sezione richiesta';
          }
        }).catch(err => {
          this.error = err;
        });
      } else {
        this.error = 'Errore, non è stata trovata la sezione richiesta';
      }
    });
  }

  getHolders(sectionID) {
    this.s.getHolders(sectionID)
    .then(val => {
      if (val instanceof Array) {
        this.holders = val;
      } else {
        this.holders = undefined;
      }
    }).catch(err => {
      this.error = err;
    })
  }

  startAdd() {
    this.newHolder = new Holder();
    this.isAdding = true;
  }

  stopAdding() {
    this.newHolder = new Holder();
    this.isAdding = false;
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

  ngOnInit() {
  }

}
