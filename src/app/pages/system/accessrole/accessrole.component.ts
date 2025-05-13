import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/material.module';
import { CoreService } from 'src/app/services/core.service';
import { NotificationService } from 'src/app/services/notification.service';
import { RoleService } from 'src/app/services/role/roleService';

@Component({
  selector: 'app-accessrole',
  imports: [RouterModule, MaterialModule, FormsModule, ReactiveFormsModule, CommonModule, MatIconModule],
  templateUrl: './accessrole.component.html'
})
export class AccessroleComponent {
  constructor(private settings: CoreService, private roleService: RoleService, private notificationService: NotificationService) { }

  formRole = new FormGroup({
    name: new FormControl('', [Validators.required]),
    desciption: new FormControl('', [Validators.required]),
  });

  createRole() {
    if (this.formRole.invalid) {
      this.formRole.markAllAsTouched();
      this.notificationService.error('Llene todos los campos del formulario')
      return;
    }

    const name = this.formRole.get('name')?.value?.trim() || '';
    const description = this.formRole.get('desciption')?.value?.trim() || '';

    const roleDto = {
      name: name,
      description: description,
    };
    this.roleService.createRole(roleDto).subscribe(
      (response) => {
        console.log('Role created successfully:', response);
        this.notificationService.success('Rol creado correctamente');
        this.formRole.reset();
      },
      (error) => {
        console.error('Error creating role:', error);
        this.notificationService.error('Error al crear el rol');
      }
    );


    console.log(roleDto);
  }
}
