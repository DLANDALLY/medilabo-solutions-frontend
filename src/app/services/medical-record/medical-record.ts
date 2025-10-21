import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IMedicalRecord } from '../../features/interfaces/IMedicalRecord';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {
  private baseUrl = `${environment.apiUrl}/MEDICAL-RECORD-SERVICE/api/v1/medicalrecord`;

  constructor(private http: HttpClient) {}

  getMedicalRecordById(id: number): Observable<IMedicalRecord> {
    console.log('Test GetById MR ');
    
    return this.http.get<IMedicalRecord>(`${this.baseUrl}/${id}`);
  }
  
}
