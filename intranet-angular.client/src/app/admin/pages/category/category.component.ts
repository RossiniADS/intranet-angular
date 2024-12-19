import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../../service/categoria.service';

@Component({
  selector: 'app-category',
  standalone: false,

  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categoriaForm: FormGroup;
  categorias: any[] = [];
  isEditing = false;
  currentCategoriaId: number | null = null;

  constructor(private fb: FormBuilder, private categoriaService: CategoriaService) {
    this.categoriaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {
    this.loadCategorias();
  }

  loadCategorias() {
    this.categoriaService.getAll().subscribe(data => {
      this.categorias = data;
    });
  }

  submitForm() {
    if (this.categoriaForm.invalid) return;

    const categoria = this.categoriaForm.value;

    if (this.isEditing && this.currentCategoriaId !== null) {
      this.categoriaService.update(this.currentCategoriaId, categoria).subscribe(() => {
        this.loadCategorias();
        this.resetForm();
      });
    } else {
      this.categoriaService.add(categoria).subscribe(() => {
        this.loadCategorias();
        this.resetForm();
      });
    }
  }

  editCategoria(categoria: any) {
    this.isEditing = true;
    this.currentCategoriaId = categoria.id;
    this.categoriaForm.patchValue(categoria);
  }

  deleteCategoria(id: number) {
    if (confirm('Tem certeza que deseja excluir esta categoria?')) {
      this.categoriaService.delete(id).subscribe(() => {
        this.loadCategorias();
      });
    }
  }

  resetForm() {
    this.isEditing = false;
    this.currentCategoriaId = null;
    this.categoriaForm.reset();
  }
}
