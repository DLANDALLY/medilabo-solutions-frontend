import { MedicalHistoricalDtos } from "./MedicalHistoricalDtos";

export interface IMedicalRecord {
    id: string;
    lastName: string;
    medicalHistoricalDtos: MedicalHistoricalDtos[]
}