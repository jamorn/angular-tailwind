import { Component, OnInit, ViewEncapsulation, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MACHINES, Machine } from '@core/models/oee/oee.model';
import flatpickr from 'flatpickr';

@Component({
  selector: 'app-oee-entry',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './oee-entry.component.html',
  styleUrls: ['./oee-entry.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class OeeEntryComponent implements OnInit, AfterViewInit {
  title = 'OEE Entry Form';
  form: FormGroup;
  machines = MACHINES;
  @ViewChild('datepicker') datepickerEl!: ElementRef;

  constructor(private fb: FormBuilder) {
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
      try {
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
      } catch (error) {
        console.error('Form submission error:', error);
        // TODO: Show error dialog/notification
      }
    }
  }

  mockData() {
    const oee = 60;
    const factor = Math.cbrt(oee / 100);
    
    const mockValues = {
      machineId: MACHINES[0].machineId,  // Now uses number type
      recordDateString: new Date().toISOString().split('T')[0],
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
    // Call mockData for testing
    this.mockData();
    
    // Initialize datepicker after a short delay to ensure DOM is ready
    setTimeout(() => {
      if (this.datepickerEl?.nativeElement) {
        flatpickr(this.datepickerEl.nativeElement, {
          dateFormat: 'Y-m-d',
          altInput: true,
          altFormat: 'd-m-Y',
          defaultDate: this.form.get('recordDateString')?.value
        });
      }
    }, 0);
  }

  ngAfterViewInit() {
    flatpickr(this.datepickerEl.nativeElement, {
      dateFormat: 'Y-m-d',
      altInput: true,
      altFormat: 'd-m-Y',
      defaultDate: this.form.get('recordDateString')?.value,
      // เพิ่ม options สำหรับควบคุมการแสดง
      clickOpens: true,      // เปิดเมื่อคลิกเท่านั้น
      static: true,         // ป้องกันการเลื่อนของ calendar
      wrap: true,           // ห่อหุ้ม input
      onChange: (selectedDates) => {
        const isoDate = selectedDates[0]?.toISOString().split('T')[0];
        this.form.patchValue({ recordDateString: isoDate });
      }
    });

    // Set initial value
    const initialDate = this.form.get('recordDateString')?.value;
    if (initialDate) {
      this.datepickerEl.nativeElement.value = this.formatDate(new Date(initialDate));
    }
  }

  // Helper function to format date as dd-mm-yyyy
  private formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }
}
