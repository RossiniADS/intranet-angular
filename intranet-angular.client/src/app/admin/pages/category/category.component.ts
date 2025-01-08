import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaService } from '../../../service/categoria.service';
import { CategoriaResponse } from '../../../../response/categoriaResponse';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  standalone: false,

  templateUrl: './category.component.html',
  styleUrl: './category.component.css'
})
export class CategoryComponent {
  categoriaForm: FormGroup;
  categorias: CategoriaResponse[] = [{
    id: 0,
    nome: '',
    qtdNoticia: 0
  }];
  isEditing = false;
  currentCategoriaId: number | null = null;

  constructor(private fb: FormBuilder, private toastrService: ToastrService, private categoriaService: CategoriaService) {
    this.categoriaForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
    });
  }

  ngOnInit() {
    this.loadCategorias();
  }

  loadCategorias() {
    this.categoriaService.getAll().subscribe(data => {
      this.categorias = data.map(cat => ({
        id: cat.id,
        nome: cat.nome,
        qtdNoticia: cat.qtdNoticia
      }));
    });
  }

  submitForm() {
    if (this.categoriaForm.invalid) return;

    const categoria = this.categoriaForm.value;

    if (this.isEditing && this.currentCategoriaId !== null) {
      this.categoriaService.update(this.currentCategoriaId, categoria).subscribe({
        next: () => {
          this.toastrService.success('Categoria atualizada com sucesso!');
          this.loadCategorias();
          this.resetForm();
        },
        error: () => {
          this.toastrService.error('Erro ao atualizar a categoria!');
        }
      });
    } else {
      this.categoriaService.add(categoria).subscribe({
        next: () => {
          this.toastrService.success('Categoria adicionada com sucesso!');
          this.loadCategorias();
          this.resetForm();
        },
        error: () => {
          this.toastrService.error('Erro ao adicionar a categoria!');
        }
      });
    }
  }

  editCategoria(categoria: any) {
    this.isEditing = true;
    this.currentCategoriaId = categoria.id;
    this.categoriaForm.patchValue(categoria);
  }

  deleteCategoria(id: number) {
    Swal.fire({
      title: 'Você tem certeza?',
      text: 'Esta ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriaService.delete(id).subscribe({
          next: () => {

            Swal.fire('Excluído!', 'A categoria foi excluída com sucesso.', 'success');
            this.loadCategorias();
          },
          error: () => {
            Swal.fire('Erro!', 'Ocorreu um problema ao excluir a categoria.', 'error');
          }
        });
      }
    });
  }

  resetForm() {
    this.isEditing = false;
    this.currentCategoriaId = null;
    this.categoriaForm.reset();
  }
}
