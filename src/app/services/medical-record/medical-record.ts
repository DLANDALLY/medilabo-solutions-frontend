import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { IMedicalRecord } from '../../features/interfaces/IMedicalRecord';
import { MedicalHistoricalDtos } from '../../features/interfaces/MedicalHistoricalDtos';

@Injectable({
  providedIn: 'root'
})
export class MedicalRecordService {
  private baseUrl = `${environment.apiUrl}/MEDICAL-RECORD-SERVICE/api/v1/medicalrecord`;

  constructor(private http: HttpClient) {}

  getMedicalRecordById(id: number): Observable<IMedicalRecord> {
    return this.http.get<IMedicalRecord>(`${this.baseUrl}/${id}`);
  }

  addNoteHistorique(idPatient: number, medicalHistorique: MedicalHistoricalDtos): Observable<any> {
    console.log('Add Note service');
    console.log(' ID ', idPatient);
    console.log(' COntent ' , medicalHistorique);
    
    return this.http.post(`${this.baseUrl}/${idPatient}/add`, medicalHistorique).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur lors de l’ajout de la note :', error);
        if (error.status === 400 && error.error) {
          return throwError(() => error.error); }

        return throwError(() => 'Une erreur est survenue code: '+ error.status );
      })
    );
  }
}
