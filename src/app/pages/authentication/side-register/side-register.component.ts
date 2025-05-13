import { Component } from '@angular/core';
import { CoreService } from 'src/app/services/core.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CommonModule } from '@angular/common';
import { RegisterDto } from 'src/app/services/authservice/registerdto';
import { AuthService } from 'src/app/services/authservice/authService';
import { PersonService } from 'src/app/services/person/personService';
import { CustomSnackbarComponent } from 'src/assets/alerts/custom-snackbar.component';
import { MatIconModule } from '@angular/material/icon';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-side-register',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './side-register.component.html',
})
export class AppSideRegisterComponent {
  options = this.settings.getOptions();
  dataRegistration: RegisterDto;

  constructor(private settings: CoreService, private router: Router, private authService: AuthService, private personService: PersonService, private notificationService: NotificationService) { }

  formResgisration = new FormGroup({
    names: new FormControl('', [Validators.required]),
    lastnames: new FormControl('', [Validators.required]),
    identification: new FormControl('', [Validators.required]),
    landlinePhone: new FormControl(''),
    mobilePhone: new FormControl('', [Validators.required]),
    birthDate: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    uname: new FormControl('', [Validators.required, Validators.minLength(6)]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
  });

  registration() {
    /*if (this.formResgisration.invalid) {
      this.formResgisration.markAllAsTouched();
      this.notificationService.error('Llene todos los campos del formulario')
      return;
    }*/

    const names = this.formResgisration.get('names')?.value?.trim() || '';
    const nameParts = names.split(' ');
    const lastnames = this.formResgisration.get('lastnames')?.value?.trim() || '';
    const lastnameParts = lastnames.split(' ');

    const registerDto: RegisterDto = {
      username: this.formResgisration.get('uname')?.value || '',
      password: this.formResgisration.get('password')?.value || '',
      roleUser: 'CLIENT_PORTAL_USER',
      identification: this.formResgisration.get('identification')?.value || '',
      firstName: nameParts[0] || '',
      middleName: nameParts.slice(1).join(' ') || '',
      lastName: lastnameParts[0] || '',
      secondLastName: lastnameParts.slice(1).join(' ') || '',
      landlinePhone: this.formResgisration.get('landlinePhone')?.value || '',
      mobilePhone: this.formResgisration.get('mobilePhone')?.value || '',
      email: this.formResgisration.get('email')?.value || '',
      birthDate: this.formResgisration.get('birthDate')?.value || '',
      address: this.formResgisration.get('address')?.value || '',
      type: 'CLIENTE',
    }

    this.authService.registreClient(registerDto).subscribe(
      (response) => {
        console.log('User registered successfully:', response);
        this.notificationService.success('Usuario registrado correctamente');
        this.router.navigate(['/']);
      },
      (error) => {
        this.notificationService.error('Error al registrar el usuario');
        console.error('Error registering user:', error);
      }
    );
  }

  personExist() {
    const identification = this.formResgisration.get('identification')?.value || '';
    this.personService.personExist(identification).subscribe(
      (response) => {
        if (response) {
          console.log('User already exists:', response);
          this.notificationService.warn('La persona ya se encuentra registrada.');
          this.formResgisration.get('identification')?.setErrors({ alreadyExists: true });
        } else {
          console.log('User not exist', response);
          this.formResgisration.get('identification')?.setErrors(null);
        }
      },
      (error) => {
        console.error('Error checking user existence:', error);
      }
    );
  }

}
