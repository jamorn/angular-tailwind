import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OeeEntryComponent } from './oee-entry.component';

describe('OeeEntryComponent', () => {
  let component: OeeEntryComponent;
  let fixture: ComponentFixture<OeeEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OeeEntryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OeeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
