import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieHead } from './movie-head';

describe('MovieHead', () => {
  let component: MovieHead;
  let fixture: ComponentFixture<MovieHead>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieHead]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovieHead);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
