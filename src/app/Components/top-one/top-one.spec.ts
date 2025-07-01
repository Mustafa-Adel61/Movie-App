import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopOne } from './top-one';

describe('TopOne', () => {
  let component: TopOne;
  let fixture: ComponentFixture<TopOne>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopOne]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TopOne);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
