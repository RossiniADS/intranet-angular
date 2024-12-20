import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FuncionarioService } from '../../../service/funcionario.service';

@Component({
  selector: 'app-employees',
  standalone: false,
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css'
})
export class EmployeesComponent {
  funcionarios: any[] = [];
  funcionarioForm: FormGroup;
  isEditing = false;
  currentFuncionarioId: number | null = null;

  constructor(private funcionarioService: FuncionarioService, private fb: FormBuilder) {
    this.funcionarioForm = this.fb.group({
      nome: ['', Validators.required],
      dataNascimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      cargo: ['', Validators.required],
      departamento: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadFuncionarios();
  }

  loadFuncionarios(): void {
    this.funcionarioService.getFuncionarios().subscribe((data) => {
      this.funcionarios = data;
    });
  }

  submitForm(): void {
    if (this.funcionarioForm.invalid) return;

    const funcionario = this.funcionarioForm.value;

    if (this.isEditing && this.currentFuncionarioId !== null) {
      this.funcionarioService.updateFuncionario(this.currentFuncionarioId, funcionario).subscribe(() => {
        this.loadFuncionarios();
        this.resetForm();
      });
    } else {
      this.funcionarioService.createFuncionario(funcionario).subscribe(() => {
        this.loadFuncionarios();
        this.resetForm();
      });
    }
  }

  editFuncionario(funcionario: any): void {
    this.isEditing = true;
    this.currentFuncionarioId = funcionario.id;
    this.funcionarioForm.patchValue(funcionario);
  }

  deleteFuncionario(id: number): void {
    this.funcionarioService.deleteFuncionario(id).subscribe(() => {
      this.loadFuncionarios();
    });
  }

  resetForm(): void {
    this.funcionarioForm.reset();
    this.isEditing = false;
    this.currentFuncionarioId = null;
  }
}
