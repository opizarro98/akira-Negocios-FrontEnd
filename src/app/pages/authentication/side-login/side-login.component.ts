import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { Logindto } from 'src/app/services/authservice/Logindto';
import { AuthService } from 'src/app/services/authservice/authService';

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {


  constructor(private router: Router, private authService: AuthService) { }

  formlogin = new FormGroup({
    uname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.formlogin.controls;
  }

  login() {
    const loginData: Logindto = {
      username: this.formlogin.get('uname')?.value || '',
      password: this.formlogin.get('password')?.value || '',
    }

    this.authService.login(loginData).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.router.navigate(['/']);
      },
      (error) => {
        console.error('Login failed:', error);
      }
    );
  }
}
