import { Component, OnInit } from '@angular/core';
import { MenuService } from '../../../service/menu.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItemResponse } from '../../../../response/menuItemResponse';

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

  constructor(private fb: FormBuilder, private menuService: MenuService) {
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
      this.menuService.update(this.currentMenuItemId, formData).subscribe(() => {
        this.loadMenuItems();
        this.resetForm();
      });
    } else {
      this.menuService.add(formData).subscribe(() => {
        this.loadMenuItems();
        this.resetForm();
      });
    }
  }

  editMenuItem(item: MenuItemResponse) {
    this.isEditing = true;
    this.currentMenuItemId = item.id;
    this.menuForm.patchValue(item);
  }

  deleteMenuItem(id: number) {
    if (confirm('Tem certeza que deseja excluir este item?')) {
      this.menuService.delete(id).subscribe(() => {
        this.loadMenuItems();
      });
    }
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
