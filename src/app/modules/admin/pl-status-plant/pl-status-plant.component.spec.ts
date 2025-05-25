import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlStatusPlantComponent } from './pl-status-plant.component';

describe('PlStatusPlantComponent', () => {
  let component: PlStatusPlantComponent;
  let fixture: ComponentFixture<PlStatusPlantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PlStatusPlantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlStatusPlantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
