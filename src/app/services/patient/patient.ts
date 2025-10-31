import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, delayWhen, Observable, retryWhen, scan, throwError, timer } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IPatient } from '../../features/interfaces/IPatient';

@Injectable({ providedIn: 'root' })
export class PatientService {
  private baseUrl = `${environment.apiUrl}/PATIENT-SERVICE/api/v1/patient`;

  constructor(private http: HttpClient) {}

  getAllPatients(): Observable<IPatient[]> {
  return this.http.get<IPatient[]>(`${this.baseUrl}/all`).pipe(
    retryWhen(errors =>
      errors.pipe(
        scan((acc, error) => {
          if (acc >= 5) { throw error; }
          return acc + 1;
        }, 0),
        delayWhen(acc => timer(acc * 1000)) 
      )
    ),
    catchError(err => {
      console.error('Erreur lors de la récupération des patients', err);
      return throwError(() => err);
    })
  );
}

  getPatientById(id: number): Observable<IPatient> {
    console.log('test Get patient');
    
    return this.http.get<IPatient>(`${this.baseUrl}/${id}`);
  }

  updatePatient(id: number, updated: IPatient): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, updated)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erreur updateEvent:', error);
        return throwError(() => error.error || 'Erreur inconnue');
      })
    );
  }

  createPatient(patient: IPatient): Observable<any> {
    return this.http.post(`${this.baseUrl}/create`, patient).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 400 && error.error) {
          return throwError(() => error.error); }

        return throwError(() => 'Une erreur est survenue code: '+ error.status );
      })
    );
  }

}
