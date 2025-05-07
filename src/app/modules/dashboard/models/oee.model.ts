export interface OEEDataDTO {
    item: number;
    machineName: string;
    dateString: string;
    availability: number;
    performance: number;
    quality: number;
    oee: number;
    giveaway: number;
    oeeTarget: number;
    giveAwayMin: number;
    giveAwayMax: number;
    titleOEE: string;
    titleGiveAway: string;
    color: string;
    hasProduction?: boolean;
    productionStatusMessage?: string;
    remarks: string[];
  }
  
  export interface MachineOEEData {
    oeeDataListPP12A: OEEDataDTO[];
    oeeDataListPP12C: OEEDataDTO[];
    oeeDataListPP3A: OEEDataDTO[];
    oeeDataListPP3B: OEEDataDTO[];
    oeeDataListPPCA: OEEDataDTO[];
    oeeDataListPPCB: OEEDataDTO[];
    oeeDataListPPEC: OEEDataDTO[];
    oeeDataListPPED: OEEDataDTO[];
    oeeDataListHDPEA: OEEDataDTO[];
  }
  export enum MachineOrder {
    PP12A = 1,
    PP12C = 2,
    PP3A = 3,
    PP3B = 4,
    PPCA = 5,
    PPCB = 6,
    PPEC = 7,
    PPED = 8,
    HDPEA = 9
  }