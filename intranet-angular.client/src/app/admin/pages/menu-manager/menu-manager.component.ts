import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../service/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItemResponse } from '../../../../response/menuItemResponse';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-menu-manager',
  standalone: false,

  templateUrl: './menu-manager.component.html',
  styleUrl: './menu-manager.component.css'
})
export class MenuManagerComponent implements OnInit {
  menuForm: FormGroup;
  menuItems: MenuItemResponse[] = [];
  isEditing = false;
  currentMenuItemId: number | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private toastrService: ToastrService, private menuService: MenuService) {
    this.menuForm = this.fb.group({
      label: ['', [Validators.required, Validators.minLength(3)]],
      parentId: [null],
    });
  }

  ngOnInit() {
    this.loadMenuItems();
  }

  loadMenuItems() {
    this.menuService.getAll().subscribe((data) => {
      this.menuItems = data;
    });
  }

  submitForm() {
    if (this.menuForm.invalid) return;

    const formData = new FormData();
    formData.append('label', this.menuForm.get('label')?.value);
    formData.append('parentId', this.menuForm.get('parentId')?.value ?? '');

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    if (this.isEditing && this.currentMenuItemId !== null) {
      this.menuService.update(this.currentMenuItemId, formData).subscribe({
        next: () => {
          this.toastrService.success('Menu atualizado com sucesso!');
          this.loadMenuItems();
          this.resetForm();
        },
        error: () => {
          this.toastrService.error('Erro ao atualizar o menu!');
        }
      });
    } else {
      this.menuService.add(formData).subscribe({
        next: () => {
          this.toastrService.success('Menu adicionado com sucesso!');
          this.loadMenuItems();
          this.resetForm();
        },
        error: () => {
          this.toastrService.error('Erro ao adicionar o menu!');
        }
      });
    }
  }

  editMenuItem(item: MenuItemResponse) {
    this.isEditing = true;
    this.currentMenuItemId = item.id;
    this.menuForm.patchValue(item);
  }

  deleteMenuItem(id: number) {
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
        this.menuService.delete(id).subscribe({
          next: () => {

            Swal.fire('Excluído!', 'O menu foi excluído com sucesso.', 'success');
            this.loadMenuItems();
          },
          error: () => {
            Swal.fire('Erro!', 'Ocorreu um problema ao excluir o menu.', 'error');
          }
        });
      }
    });
  }

  resetForm() {
    this.isEditing = false;
    this.currentMenuItemId = null;
    this.menuForm.reset();
    this.resetFileInputs();
  }

  getParentLabel(parentId: number | undefined): string {
    if (!parentId) return '-'; // Se não há parentId, retorna '-'
    const parent = this.menuItems.find((item) => item.id === parentId);
    return parent ? parent.label : '-'; // Retorna o label do item pai ou '-' se não encontrado
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  resetFileInputs(): void {
    // Limpar os inputs de arquivos na tela
    const fileInputs = document.querySelectorAll('input[type="file"]');
    fileInputs.forEach((input: any) => {
      input.value = '';  // Limpa o campo de arquivo
    })
  }
}
