import { Routes } from '@angular/router';
import { EmployeeComponent } from './employee/employee.component';
import { ClientesComponent } from './clientes/clientes.component';
import { SupplierComponent } from './supplier/supplier.component';
import { AccessroleComponent } from './accessrole/accessrole.component';
import { EmployeeroleComponent } from './employeerole/employeerole.component';


export const SystemComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'employee',
        component: EmployeeComponent,
      },
      {
        path: 'clientes',
        component: ClientesComponent,
      },
      {
        path: 'supplier',
        component: SupplierComponent,
      },
      {
        path: 'accessrole',
        component: AccessroleComponent,
      },
      {
        path: 'employeerole',
        component: EmployeeroleComponent,
      },
    ],
  },
];
