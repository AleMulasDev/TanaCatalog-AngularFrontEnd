import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SectionService } from '../_services/section.service';
import { Section, UserPermission } from '../_models/Section';
import { GameService } from '../_services/game.service';
import { Holder } from '../_models/Holder';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatSliderChange } from '@angular/material/slider';

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
  isMediumMonitor: boolean;
  userPermission: UserPermission;

  constructor(private route: ActivatedRoute,
              private s: SectionService,
              private g: GameService,
              private snackBar: MatSnackBar,
              breakpointObserver: BreakpointObserver) {
    this.route.params.subscribe(params => {
      if (params.id != null && params.id !== '') {
        this.sectionID = params.id;
        this.s.retrieveSectionList()
        .then(value => {
          this.sections = value instanceof Array ? value : undefined;
          for (const section of this.sections) {
            if (section.id == this.sectionID) {
              this.section = section;
              this.s.retrieveSectionPermission(this.section.id)
              .then(val => {
                this.userPermission = val instanceof UserPermission ? val : undefined;
              }).catch(err => {
                console.error(err);
                this.error = 'Errore, non è stato possibile elaborare i tuoi permessi';
              });
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

    breakpointObserver.observe([
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait
    ]).subscribe(result => {
      if (result.matches) {
        this.isMediumMonitor = false;
      } else {
        this.isMediumMonitor = true;
      }
    });
  }

  displayChange(event: MatSliderChange) {
    this.isMediumMonitor = event.value === 1 ? true : false;
  }

  ngOnInit() {
  }

}
