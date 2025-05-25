export interface OeeEntryData {
  machineId: number;
  recordDateString: string;
  availability: number;
  performance: number;
  quality: number;
  oee: number;
  giveaway: number;
  remarks: string[];
  responsiblePerson: string | null;
}

export interface OeeEntryResponse {
  success: boolean;
  count: number;
  dashboards: {
    machineId: number;
    machineName: string;
    recordDateString: string;
    availability: number;
    performance: number;
    quality: number;
    oee: number;
    giveaway: number;
    remarks: string[];
    responsiblePerson: string | null;
  }[];
}