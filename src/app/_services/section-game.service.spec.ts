import { TestBed } from '@angular/core/testing';

import { SectionGameService } from './section-game.service';

describe('SectionGameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SectionGameService = TestBed.get(SectionGameService);
    expect(service).toBeTruthy();
  });
});
