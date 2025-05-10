import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonthyEiiComponent } from './monthly-eii.component';

describe('MonthyEiiComponent', () => {
  let component: MonthyEiiComponent;
  let fixture: ComponentFixture<MonthyEiiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonthyEiiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonthyEiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
