import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../Services/employee.service';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit{

  form!: FormGroup;
  isEditMode = false;
  employeeId?: number;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      id: [0],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      position: ['', Validators.required]
    });
    
    this.employeeId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.employeeId) {
      this.isEditMode = true;
      this.employeeService.getById(this.employeeId).subscribe(emp => {
        this.form.patchValue(emp);
      });
    }
  }

  onSubmit(): void {
    if (this.form.invalid) return;

    const employee: Employee = this.form.value;

    if (this.isEditMode) {
      this.employeeService.update(employee.id!, employee).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.employeeService.create(employee).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}