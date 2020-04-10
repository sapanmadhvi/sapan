import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/Service/employee.service';
import { Observable,Subject } from "rxjs";  
import { Employee } from 'src/app/class/employee';
import { FormGroup, FormControl, Validators, FormGroupName } from '@angular/forms';
import { Department } from 'src/app/class/department';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  constructor(private employyeService:EmployeeService) {}

  empl: any[] = [];  
  dtOptions: DataTables.Settings ={};
  dtTrigger: Subject<any>= new Subject();  
  department: Observable<Department[]>;
  employees: Observable<Employee[]>;  
  employee : Employee=new Employee();  
  emp : Employee;
  deleteMessage=false;  
  employeeList:any;  
  isupdated = false;      
    
  ngOnInit() {  
    this.emp = new Employee();
    this.isupdated=false;  
    this.dtOptions = {  
      pageLength: 6,  
      stateSave:true,  
      lengthMenu:[[6, 16, 20, -1], [6, 16, 20, "All"]],  
      processing: true  
    };     
    this.employyeService.getEmployeeList().subscribe(data =>{  
      console.log("get emp ngonit  "+JSON.stringify(data)); 
    this.employees =data;  
    this.dtTrigger.next();  
    })  
  }  


  deleteEmployee(id: number) {  
    this.employyeService.deleteEmployee(id)  
      .subscribe(  
        data => {  
          console.log(data);  
          this.deleteMessage=true;  
          this.employyeService.getEmployeeList().subscribe(data =>{  
            this.employees =data  
            })  
        },  
        error => console.log(error));  
  }  
  
  updateEmployee(id: number){  

    this.employyeService.getEmployee(id)  
      .subscribe(  
        data => { 
          this.emp=data;  
          console.log(data)           
        },  
        error => console.log(error));  

        this.employyeService.getDepartmentList().subscribe(data =>{  
          console.log(data); 
        this.department =data;    
        this.employeeupdateform.controls['department'].setValue(this.emp.dep.id, {onlySelf: true});
        })      
  }  

  employeeupdateform=new FormGroup({
    name: new FormControl('' , [Validators.required , Validators.minLength(5) ] ),
    tech:new FormControl('' , [Validators.required , Validators.minLength(2) ] ),
    dob: new FormControl(''),
    id:new FormControl(),
    department:new FormControl('')
  })


  updateEmp(updEmp){  
    
    this.employee=new Employee(); 
    this.employee.id=this.EmployeeId.value;    
    this.employee.name=this.EmployeeName.value;  
   this.employee.tech=this.EmployeeTech.value;  
   this.employee.DOB=this.EmployeeDob.value;  
  

   this.employyeService.createEmployee(this.employee,this.EmployeeDepartment.value)  
    .subscribe(
      data => {
        this.isupdated=true;  
        console.log(data);
        this.employyeService.getEmployeeList().subscribe(data =>{  
                this.employees =data  
                })  
            },  
            error => console.log(error));  
      }

  changeisUpdate(){  
    this.isupdated=false;  
  }  

  get EmployeeId(){  
    return this.employeeupdateform.get('id');  
  }  

  get EmployeeName(){  
    return this.employeeupdateform.get('name');  
  }  
  
  get EmployeeTech(){  
    return this.employeeupdateform.get('tech');  
  }  

  get EmployeeDob(){  
    return this.employeeupdateform.get('dob');  
  }  

  get EmployeeDepartment(){  
    return this.employeeupdateform.get('department');  
  }  

}
