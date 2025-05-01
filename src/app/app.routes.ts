import { Routes } from '@angular/router';
import { EmployeeFormComponent } from './Components/employee-form/employee-form.component';
import { EmployeeListComponent } from './Components/employee-list/employee-list.component';
import { ErrorPageComponent } from './Components/error-page/error-page.component';

export const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'add', component: EmployeeFormComponent },
  { path: 'edit/:id', component: EmployeeFormComponent },
  { path: '**', component: ErrorPageComponent }
];
