import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  
import { Observable } from 'rxjs';  
import { Employee } from '../class/employee';
import { Department } from '../class/department';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8081/';  


  constructor(private http:HttpClient) { }

  getEmployeeList(): Observable<any> {  
    return this.http.get(`${this.baseUrl}`+'emp/getEmp');  
  }  

  getDepartmentList(): Observable<any> {  
    return this.http.get(`${this.baseUrl}`+'emp/getAllDep');  
  }  

  createEmployee(employee: object,id:number): Observable<object> {  
    return this.http.post(`${this.baseUrl}emp/dep/${id}`+'/emp', employee);  
  }  
  
  deleteEmployee(id:number): Observable<Object> {
    return this.http.delete(`${this.baseUrl}/emp/deleteEmp/${id}`, { responseType: 'text' });  
  }

  getEmployee(id:number):  Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/emp/getEmp/${id}`);  
  }

  updateEmployee(id: number, value: any): Observable<Object> {  
    return this.http.post(`${this.baseUrl}/emp/dep/1`, value);  
  }  


}
