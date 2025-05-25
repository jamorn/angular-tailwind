import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { signal } from '@angular/core';
import adminData from '@core/mocks/data/admin.json';

// Define all possible work type names
type TabType = 'Action' |'Coldwork' | 'Hotwork' | 'Equipment' | 'E4E' | 'ImproveWork' | 'PSM';

interface PlantItem {
  item: number;
  description: string;
  actionBy: string;
  issueDate: string;
  dueDate: string;
  baggingCode: string;
  baggingName: string;
  workTypeDetail: {
    id: number;
    name: TabType;
    description: string;
  };
}

@Component({
  selector: 'app-pl-status-plant',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './pl-status-plant.component.html',
})
export class PlStatusPlantComponent implements OnInit {
  // Define allTabs first
  readonly allTabs: TabType[] = [
    'Action',  
    'Coldwork', 
    'Hotwork', 
    'Equipment', 
    'E4E', 
    'ImproveWork', 
    'PSM'
  ];

  // Then use it in other properties
  activeTab = signal<TabType>(this.allTabs[0]);
  plantData = signal<PlantItem[]>([]);

  ngOnInit() {
    // Cast the data to PlantItem[] since we know the structure matches
    const typedData = adminData.data as PlantItem[];
    this.plantData.set(typedData.filter(item => item.baggingCode === 'PL'));
  }

  getTabs(): TabType[] {
    // แสดงทุก tab ที่กำหนด ไม่ว่าจะมีข้อมูลหรือไม่
    return this.allTabs;
  }

  hasDataForTab(tab: TabType): boolean {
    return this.plantData().some(item => 
      item.workTypeDetail?.name === tab
    );
  }

  setActiveTab(tab: TabType) {
    this.activeTab.set(tab);
  }

  getCurrentData(): PlantItem[] {
    return this.plantData().filter(item => 
      item.workTypeDetail?.name === this.activeTab()
    );
  }
}
