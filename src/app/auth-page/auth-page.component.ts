import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent implements OnInit {

  constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

  isRegistration = false;

  loginForm = this.formBuilder.group({
    login: '',
    password: ''
  });

  registrationForm = this.formBuilder.group({
    login: '',
    password: '',
    repPassword: ''
  });

  login() {
    const { login, password } = this.loginForm.value;
    if (login.trim() && password.trim()) {
      this.loginForm.reset();
      this.authService.login(login.trim(), password.trim());
    }
  }

  registration() {
    const { login, password, repPassword } = this.registrationForm.value;

    if (login.trim() && password.trim() && repPassword.trim() === password.trim()){
      this.loginForm.reset();
      this.authService.registration(login.trim(), password.trim(), repPassword.trim());
    }
  }

  setIsRegistration(bool: boolean) {
    this.isRegistration = bool;
  }

  ngOnInit(): void {
  }

}
