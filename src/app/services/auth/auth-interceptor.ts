import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth-service';
import { TokenStorageService } from '../storage/token-storage-service';

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptor implements HttpInterceptor{
  
  constructor(private auth: AuthService, private storage: TokenStorageService) {}
  
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const token = this.storage.getToken();
    if (token) {
      const cloned = req.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
      return next.handle(cloned);
    }
    return next.handle(req);
  }
}
