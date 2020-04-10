import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './componant/EmployeeAdd/employee.component';
import { EmployeeListComponent } from './componant/EmployeeList/employee-list.component';


const routes: Routes = [

  { path: 'emp/add', component: EmployeeComponent },
  { path: 'emp/list', component: EmployeeListComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
