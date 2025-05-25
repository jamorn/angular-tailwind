import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OeeEntryComponent } from './oee-entry.component';
import { OeeMockService } from './services/oee-mock.service';

describe('OeeEntryComponent', () => {
  let component: OeeEntryComponent;
  let fixture: ComponentFixture<OeeEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OeeEntryComponent],
      providers: [OeeMockService]
    }).compileComponents();

    fixture = TestBed.createComponent(OeeEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
