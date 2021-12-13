import { Injectable } from '@angular/core';

import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apiService: ApiService) { }

  login(login: string, password: string) {
    this.apiService.login(login, password).subscribe(token => {
      localStorage.setItem('token', token.jwt);
    });
  }

  registration(login: string, password: string, repPassword: string) {
    this.apiService.registration(login, password, repPassword).subscribe(token => {
      localStorage.setItem('token', token.jwt);
    });
  }
}
