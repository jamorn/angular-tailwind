import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OeeFormComponent } from './oee-form.component';

describe('OeeFormComponent', () => {
  let component: OeeFormComponent;
  let fixture: ComponentFixture<OeeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OeeFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OeeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
