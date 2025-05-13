import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService} from '../../../services/authservice/authService'
import { Logindto } from 'src/app/services/authservice/logindto';
import {CommonModule} from '@angular/common';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-side-login',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './side-login.component.html',
})
export class AppSideLoginComponent {


  constructor(private router: Router, private authService: AuthService, private notificationService: NotificationService) { }

  formlogin = new FormGroup({
    uname: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get f() {
    return this.formlogin.controls;
  }

  login() {
    if (this.formlogin.invalid) {
      this.formlogin.markAllAsTouched();
      this.notificationService.error('Usuario o Contraseña incorrectos')
      return; 
    }
    const loginData: Logindto = {
      username: this.formlogin.get('uname')?.value || '',
      password: this.formlogin.get('password')?.value || '',
    }

    this.authService.login(loginData).subscribe(
      (response) => {
        console.log('Login successful:', response);
        this.notificationService.success('Inicio de sesion correcto')
        this.router.navigate(['/']);
      },
      (error) => {
        this.formlogin.markAllAsTouched();
        this.notificationService.error('Usuario o Contraseña incorrectos')
      }
    );
  }
}
