import { Component , OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MACHINES }  from '@models/oee/oee.model'; 


@Component({
  selector: 'app-oee-entry',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule
  ],
  templateUrl: './oee-entry.component.html',
  styleUrls: ['./oee-entry.component.css']
})
export class OeeEntryComponent implements OnInit {
  title = 'OEE Entry Form';
  form: FormGroup;
  machines = MACHINES;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    this.form = this.fb.group({
      machineId: ['', Validators.required],
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
      machineId: MACHINES[0].machineId, // Use first machine PP12/A
      recordDateString: new Date().toISOString().split('T')[0],
      availability: +(factor * 100).toFixed(2),
      performance: +(factor * 100).toFixed(2),
      quality: +(factor * 100).toFixed(2),
      giveaway: 25.112,
      oee: oee
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
  }


}
