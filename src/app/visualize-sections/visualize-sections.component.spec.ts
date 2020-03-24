import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeSectionsComponent } from './visualize-sections.component';

describe('VisualizeSectionsComponent', () => {
  let component: VisualizeSectionsComponent;
  let fixture: ComponentFixture<VisualizeSectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisualizeSectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisualizeSectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
