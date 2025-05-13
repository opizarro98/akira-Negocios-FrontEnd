import { Component } from '@angular/core';
import { MaterialModule } from '../../../material.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CoreService } from 'src/app/services/core.service';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from 'src/app/services/notification.service';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { PersonService } from 'src/app/services/person/personService';


@Component({
  selector: 'app-employee-page',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './employee.component.html',
})

export class EmployeeComponent {

  constructor(private settings: CoreService, private router: Router, private personService: PersonService, private notificationService: NotificationService) { }

  formResgisrationEmployee = new FormGroup({
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


  personExist() {
    const identification = this.formResgisrationEmployee.get('identification')?.value || '';
    this.personService.personExist(identification).subscribe(
      (response) => {
        if (response) {
          console.log('User already exists:', response);
          this.notificationService.warn('La persona ya se encuentra registrada.');
          this.formResgisrationEmployee.get('identification')?.setErrors({ alreadyExists: true });
        } else {
          console.log('User not exist', response);
          this.formResgisrationEmployee.get('identification')?.setErrors(null);
        }
      },
      (error) => {
        console.error('Error checking user existence:', error);
      }
    );
  }
}
