import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TokenStorageService } from '../storage/token-storage-service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = `${environment.apiUrl}/AUTH-SERVICE/api/auth`;
  private tokenKey = 'auth_token';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}
  
  login(username: string, password: string): Observable<any> {
    this.tokenStorage.removeToken();
    return this.http.post(`${this.baseUrl}/login`, {username, password},{ withCredentials: true }).pipe(
      tap((response: any) => {
        if (response.token) {
          this.tokenStorage.saveToken(response.token);
        }
      })
    );
  }

  getToken() { return localStorage.getItem(this.tokenKey); }
  logout() { localStorage.removeItem(this.tokenKey); }
  isAuthenticated() { return !!this.getToken(); }
}
