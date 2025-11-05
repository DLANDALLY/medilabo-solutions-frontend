import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, delayWhen, Observable, retryWhen, scan, throwError, timer } from 'rxjs';
import { IReporting } from '../../features/interfaces/IReporting';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  private baseUrl = `${environment.apiUrl}/REPORTING-SERVICE/api/v1/reporting`;

  constructor(private http: HttpClient) {}

  getReportingById(id: number): Observable<IReporting> {
    console.log('Test GetById Reporting ');
    
    return this.http.get<IReporting>(`${this.baseUrl}/${id}`).pipe(
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
      );;
  }
}
