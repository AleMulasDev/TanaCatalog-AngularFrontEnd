import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeGamesComponent } from './visualize-games.component';

describe('VisualizeGamesComponent', () => {
  let component: VisualizeGamesComponent;
  let fixture: ComponentFixture<VisualizeGamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizeGamesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizeGamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
