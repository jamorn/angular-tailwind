/* OeeFormComponent */
import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
// แก้ไข path การ import
import { MACHINES, Machine } from '@core/models/oee/oee.model';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/themes/dark.css';
// แก้ไข path การ import services และ models
import { OeeMockService } from '../../services/oee-mock.service';
import { OeeEntryResponse } from '../../models/oee-entry.model';
import { signal } from '@angular/core';

@Component({
  selector: 'app-oee-form',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './oee-form.component.html',
  styleUrls: ['./oee-form.component.css']  // แก้ไขจาก styleUrl เป็น styleUrls
})
export class OeeFormComponent implements OnInit, AfterViewInit {
  title = 'OEE Entry Form';
  form: FormGroup;
  machines = MACHINES;
  @ViewChild('datepicker') datepickerEl!: ElementRef;
  recentEntries = signal<OeeEntryResponse['dashboards']>([]);
  @Output() closeForm = new EventEmitter<void>();
  @Output() cancelForm = new EventEmitter<void>();  // เพิ่ม Output
  @Input() entryData: any;

  constructor(
    private fb: FormBuilder,
    private mockService: OeeMockService
  ) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    this.form = this.fb.group({
      machineId: [null, Validators.required],  // Changed from '' to null
      recordDateString: [yesterday.toISOString().split('T')[0]],
      availability: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      performance: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      quality: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      giveaway: ['', [Validators.required, Validators.min(25), Validators.max(25.3)]],
      oee: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      remarks: this.fb.array([]),
      responsiblePerson: ['default auto-generate'],
      status: [1]
    });
  }

  get remarksArray() {
    return this.form.get('remarks') as FormArray;
  }

  addRemark() {
    this.remarksArray.push(this.fb.control(''));
  }

  removeRemark(index: number) {
    this.remarksArray.removeAt(index);
  }

  onSubmit() {
    if (this.form.valid) {
      this.mockService.submitEntry(this.form.value).subscribe({
        next: (response: OeeEntryResponse) => {
          if (response.success) {
            const formData = {
              ...this.form.value,
              lastUpdated: new Date().toISOString(),
              remarks: this.form.value.remarks.filter((remark: string) => remark.trim() !== '')
            };

            console.group('Form Data Preview:');
            console.log('Machine:', this.machines.find(m => m.machineId === formData.machineId)?.machineName);
            console.log('Date:', formData.recordDateString);
            console.log('OEE Factors:');
            console.table({
              Availability: formData.availability + '%',
              Performance: formData.performance + '%',
              Quality: formData.quality + '%',
              Giveaway: formData.giveaway + '%',
              OEE: formData.oee + '%'
            });
            console.log('Remarks:', formData.remarks);
            console.log('JSON Data:', JSON.stringify(formData, null, 2));
            console.groupEnd();

            this.closeForm.emit();  // emit event เมื่อ submit สำเร็จ
          }
        },
        error: (error: Error) => {
          console.error('Error submitting form:', error);
        }
      });
    }
  }

  mockData() {
    const oee = 60;
    const factor = Math.cbrt(oee / 100);

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const mockValues = {
      machineId: MACHINES[0].machineId,  // Now uses number type
      recordDateString: yesterday.toISOString().split('T')[0],
      availability: +(factor * 100).toFixed(2),
      performance: +(factor * 100).toFixed(2),
      quality: +(factor * 100).toFixed(2),
      giveaway: 25.112,
      oee: oee,
      responsiblePerson: 'Test User',
      status: 1
    };

    // Set form values
    this.form.patchValue(mockValues);

    // Add two remarks
    this.addRemark();
    this.addRemark();
    this.remarksArray.at(0)?.setValue('เครื่องจักรมีปัญหา Bearing เสีย');
    this.remarksArray.at(1)?.setValue('รอ Spare Part จากต่างประเทศ');
  }

  ngOnInit() {
    console.log('Received entry data:', this.entryData); // debug log
    
    if (this.entryData) {
      // Set form values including remarks
      this.form.patchValue({
        machineId: this.entryData.machineId,
        recordDateString: this.entryData.recordDateString,
        availability: this.entryData.availability,
        performance: this.entryData.performance,
        quality: this.entryData.quality,
        giveaway: this.entryData.giveaway,
        oee: this.entryData.oee,
        responsiblePerson: this.entryData.responsiblePerson,
        status: this.entryData.status
      });

      // Clear existing remarks
      while (this.remarksArray.length) {
        this.remarksArray.removeAt(0);
      }

      // Add remarks if any
      if (this.entryData.remarks && this.entryData.remarks.length) {
        this.entryData.remarks.forEach((remark: string) => {
          this.remarksArray.push(this.fb.control(remark));
        });
      }
    }
    // Remove loadMockData call since we don't need it in form component
    // this.mockData(); // Optional for testing
  }

  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  ngAfterViewInit() {
    if (this.datepickerEl?.nativeElement) {
      flatpickr(this.datepickerEl.nativeElement, {
        dateFormat: 'Y-m-d',
        altInput: true,
        altFormat: 'd-m-Y',
        defaultDate: this.form.get('recordDateString')?.value,
        clickOpens: true,
        static: true,
        // Remove theme property and use CSS instead
        onChange: (selectedDates) => {
          const isoDate = selectedDates[0]?.toISOString().split('T')[0];
          this.form.patchValue({ recordDateString: isoDate });
        }
      });

      // Add dark theme class to the element
      this.datepickerEl.nativeElement.classList.add('dark');

      // Set initial value
      const initialDate = this.form.get('recordDateString')?.value;
      if (initialDate) {
        this.datepickerEl.nativeElement.value = this.formatDate(new Date(initialDate));
      }
    }
  }

  onCancel() {
    this.cancelForm.emit();
  }
}

