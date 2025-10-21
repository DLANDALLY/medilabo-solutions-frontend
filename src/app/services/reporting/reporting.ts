import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IReporting } from '../../features/interfaces/IReporting';

@Injectable({
  providedIn: 'root'
})
export class ReportingService {
  private baseUrl = `${environment.apiUrl}/REPORTING-SERVICE/api/v1/reporting`;

  constructor(private http: HttpClient) {}

  getReportingById(id: number): Observable<IReporting> {
    console.log('Test GetById Reporting ');
    
    return this.http.get<IReporting>(`${this.baseUrl}/${id}`);
  }
}
