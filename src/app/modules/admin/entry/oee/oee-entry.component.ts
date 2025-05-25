import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { signal } from '@angular/core';
import { OeeFormComponent } from './components/oee-form/oee-form.component';
import { OeeMockService } from './services/oee-mock.service';
import { OeeEntryResponse } from './models/oee-entry.model';

@Component({
  selector: 'app-oee-entry',
  standalone: true,
  imports: [
    CommonModule,
    OeeFormComponent  // Make sure this is imported
  ],
  templateUrl: './oee-entry.component.html',
  styleUrls: ['./oee-entry.component.css']
})
export class OeeEntryComponent implements OnInit {
  showForm = signal<boolean>(false);
  recentEntries = signal<OeeEntryResponse['dashboards']>([]);
  selectedEntry = signal<any>(null);
  expandedRows: boolean[] = [];

  constructor(private mockService: OeeMockService) {}

  ngOnInit() {
    this.loadRecentEntries();
  }

  private loadRecentEntries() {
    this.mockService.getRecent().subscribe({
      next: (response: OeeEntryResponse) => {
        if (response.success) {
          this.recentEntries.set(response.dashboards);
          // Initialize expanded state array
          this.expandedRows = new Array(response.dashboards.length).fill(false);
        }
      },
      error: (error: Error) => {
        console.error('Error loading entries:', error);
      }
    });
  }

  onEdit(entry: any) {
    console.log('Selected entry for edit:', entry);
    this.selectedEntry.set(entry);
    this.showForm.set(true);
  }

  onCancelForm() {
    // Reset form state without refreshing data
    this.showForm.set(false);
    this.selectedEntry.set(null);
  }

  onCloseForm() {
    // Reset form state and refresh data after successful submit
    this.showForm.set(false);
    this.selectedEntry.set(null);
    this.loadRecentEntries();
  }

  toggleRow(index: number) {
    this.expandedRows[index] = !this.expandedRows[index];
  }
}

