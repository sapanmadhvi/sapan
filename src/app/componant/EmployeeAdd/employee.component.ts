import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/Service/employee.service';
import { Employee } from 'src/app/class/employee';
import {FormControl,FormGroup,Validators} from '@angular/forms';  
import { Department } from 'src/app/class/department';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  addEmp="Add EmployeeComponent ";

  constructor(private employyeService:EmployeeService) { }

  employee : Employee=new Employee();
  submitted = false;  
  department: Observable<Department[]>;

  dep:Department=new Department();
  
  ngOnInit(): void {
    this.submitted=false;  
    this.employyeService.getDepartmentList().subscribe(data =>{  
      console.log(data); 
    this.department =data;    
    }) 
  }

  employeesaveform=new FormGroup({
  name: new FormControl('' , [Validators.required , Validators.minLength(1) ] ),
  tech:new FormControl('' , [Validators.required , Validators.minLength(2) ] ),
  department:new FormControl('' , [Validators.required] ),
  DOB: new FormControl()
})

saveEmployee(saveEmployee){  
  this.employee=new Employee();     
  this.employee.name=this.EmployeeName.value; 
  this.employee.tech=this.EmployeeTech.value;  
  this.employee.DOB='';  
  this.dep.id=this.EmployeeDep.value;
 // this.employee.department.id=this.EmployeeDep.value;
  this.submitted = true;  

  this.save();  
}  

save() {  
  this.employyeService.createEmployee(this.employee,this.EmployeeDep.value)  
    .subscribe(data => console.log(data), error => console.log(error));  
  this.employee = new Employee();  
}  


get EmployeeName(){  
  return this.employeesaveform.get('name');  
}  

get EmployeeTech(){  
  return this.employeesaveform.get('tech');  
}  

get EmployeeDep(){  
  return this.employeesaveform.get('department');  
}  

addEmployeeForm(){  
  this.submitted=false;  
  this.employeesaveform.reset();  
}  



}
