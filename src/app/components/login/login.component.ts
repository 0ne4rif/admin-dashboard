import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { TokenStorageService } from '../../services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(
    private fb: FormBuilder,
    private _service: LoginService,
    private router: Router,
    private tokenStorage: TokenStorageService
    
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  login() {
    const data = this.loginForm.value;

    if (data.username && data.password) {
      this._service.login(data.username, data.password).subscribe((response) => {
        this.isLoggedIn = true;
        this.tokenStorage.saveToken(response);
        this.tokenStorage.saveUser(response);
        this.roles = this.tokenStorage.getUser().roles;
        console.log('Login success', response);
        window.alert('Login success!');
        this.router.navigate(['dashboard']);
      }, (err) => {
        this.isLoginFailed = true;
        this.errorMessage = err.error.message
        console.log('Login fail', err);
        window.alert('Login failed!');
      });
    }
  }
}
