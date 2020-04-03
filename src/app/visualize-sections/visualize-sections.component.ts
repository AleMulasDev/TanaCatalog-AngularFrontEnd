import { Component, OnInit } from '@angular/core';
import { SectionService } from '../_services/section.service';
import { AuthenticationService } from '../_services/authentication.service';
import { Section } from '../_models/Section';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-visualize-sections',
  templateUrl: './visualize-sections.component.html',
  styleUrls: ['./visualize-sections.component.css']
})
export class VisualizeSectionsComponent implements OnInit {
  sections: Section[];
  error: string;
  editIndex = -1;
  editingSection: Section;

  addingSectionTitle: string;
  isAdding: boolean;

  isLogged(): boolean {
    if (this.auth.currentTokenValue) {
      return true;
    } else {
      return false;
    }
  }

  constructor(private s: SectionService, private auth: AuthenticationService, private router: Router,
              private snackBar: MatSnackBar) {
    s.retrieveSectionList()
    .then(value => {
      this.sections = value instanceof Array ? value : undefined;
    }).catch(err => {
      this.error = err;
    });
  }

  startAdd() {
    this.addingSectionTitle = '';
    this.isAdding = true;
  }

  add() {
    this.s.addSection(this.addingSectionTitle)
    .then(value => {
      if (value) { this.sections.push(new Section({id: value, title: this.addingSectionTitle, isOwner: true})); }
      this.snackBar.open('Sezione aggiunta con successo', 'Chiudi', {duration: 3000});
      this.isAdding = false;
      this.addingSectionTitle = '';
    }).catch(err => {
      this.error = err;
    });
  }

  stopAdd() {
    this.addingSectionTitle = '';
    this.isAdding = false;
  }

  startEdit(index: number, section: Section) {
    if (this.editIndex !== -1) {
      this.sections[this.editIndex] = this.editingSection;
    }
    this.editingSection = new Section(section);
    this.editIndex = index;
  }

  undoEdit() {
    this.sections[this.editIndex] = this.editingSection;
    this.editIndex = -1;
    this.editingSection = null;
  }

  edit(section: Section) {
    this.s.modifySection(section.id, section.title)
    .then(value => {
      this.snackBar.open('Sezione modificata con successo', 'Chiudi', {duration: 3000});
      this.editIndex = -1;
    }).catch(err => {
      this.error = err;
    });
  }

  deleteSection(section: Section, index: number) {
    if (confirm('Sei sicuro di voler cancellare questa sezione? L\'azione non potrà essere annullata')) {
      this.s.deleteSection(section.id)
      .then(success => {
        console.log(success);
        this.sections.splice(index, 1);
      }).catch(err => {
        console.error(err);
      });
    } else {
      // TODO
    }
  }
  ngOnInit() {
  }

}
