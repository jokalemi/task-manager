import { ConfigService } from './../services/config.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private configService: ConfigService) {}

  login(username: string, password: string): Observable<any> {
    const authApiUrl = this.configService.getAuthApiUrl();
    return this.http
      .post<{ token: string; expiresIn: number }>(`${authApiUrl}/auth/login`, {
        username,
        password,
      })
      .pipe(
        tap((response) => {
          localStorage.setItem('token', response.token);
          const expiration = new Date().getTime() + response.expiresIn * 1000;
          localStorage.setItem('token_expiration', expiration.toString());
        }),
        catchError((error) => {
          console.error('Error en el login', error);
          return of(null);
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('token_expiration');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('token_expiration');

    if (!token || !expiration) {
      return false;
    }

    return new Date().getTime() < Number(expiration);
  }
}
