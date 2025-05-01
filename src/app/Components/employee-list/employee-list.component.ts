import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Employee } from '../../models/employee.model';
import { Router } from '@angular/router';
import { EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  
  employees: Employee[] = [];
  filteredEmployees: Employee[] = [];
  search = '';
  positionFilter = '';
  sortDirection: 'asc' | 'desc' | '' = '';

  constructor(private employeeService: EmployeeService, private router: Router) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees(): void {
    this.employeeService.getAll().subscribe((res) => {
      this.employees = res;
      this.filteredEmployees = [...res];
    });
  }

  searchEmployees(): void {
    let list = [...this.employees];
    if (this.search) {
      list = list.filter(emp =>
        emp.firstName.toLowerCase().includes(this.search.toLowerCase()) ||
        emp.lastName.toLowerCase().includes(this.search.toLowerCase())
      );
    }

    if (this.positionFilter) {
      list = list.filter(emp =>
        emp.position.toLowerCase().includes(this.positionFilter.toLowerCase())
      );
    }
    
    if (this.sortDirection === 'asc') {
      list = list.sort((a, b) => a.firstName.localeCompare(b.firstName));
    } else if (this.sortDirection === 'desc') {
      list = list.sort((a, b) => b.firstName.localeCompare(a.firstName));
    }

    this.filteredEmployees = list;
  }

  deleteEmployee(id: number): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.delete(id).subscribe(() => {
        this.getEmployees();
      });
    }
  }

  editEmployee(id: number): void {
    this.router.navigate(['/edit', id]);
  }

  addEmployee(): void {
    this.router.navigate(['/add']);
  }
  
  toggleSort(): void {
    if (this.sortDirection === '') this.sortDirection = 'asc';
    else if (this.sortDirection === 'asc') this.sortDirection = 'desc';
    else this.sortDirection = '';
    this.searchEmployees();
  }


}
