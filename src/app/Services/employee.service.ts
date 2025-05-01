import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateEmployee, Employee, UpdateEmployee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private apiUrl =  'https://localhost:7287/api/Employees'; 
  private baseUrl = 'https://localhost:7287/api/Employees'; 

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<any> {
    return this.http.get<Employee>(this.apiUrl);
  }

  getAll(): Observable<Employee[]> {
    return this.http.get<Employee[]>(`${this.baseUrl}/All`);
  }

  getById(id: number): Observable<Employee> {
    return this.http.get<Employee>(`${this.baseUrl}/${id}`);
  }

  create(emp: Partial<CreateEmployee>): Observable<any> {
    return this.http.post(this.baseUrl, emp);
  }

  update(id: number, emp: UpdateEmployee): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, emp);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  
}