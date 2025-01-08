import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardapioService } from '../../../service/cardapio.service';
import { CardapioResponse } from '../../../../response/cardapioResponse';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cardapio',
  standalone: false,
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.css'
})
export class CardapioComponent {
  cardapioForm: FormGroup;
  cardapios: CardapioResponse[] = [{
    id: 0,
    descricao: '',
    diaDaSemana: 0,
    imagemUrl: '',
    titulo: ''
  }];
  isEditing = false;
  currentCardapioId: number | null = null;
  selectedFile: File | null = null;
  constructor(private fb: FormBuilder, private toastrService: ToastrService, private cardapioService: CardapioService) {
    this.cardapioForm = this.fb.group({
      diaDaSemana: [0, [Validators.required]],
      titulo: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadCardapios();
  }

  loadCardapios() {
    this.cardapioService.getAll().subscribe(data => {
      this.cardapios = data.map(car => ({
        id: car.id,
        titulo: car.titulo,
        descricao: car.descricao,
        diaDaSemana: car.diaDaSemana,
        imagemUrl: car.imagemUrl
      }));
    });
  }

  submitForm() {
    if (this.cardapioForm.invalid) return;

    const formData = new FormData();
    formData.append('diaDaSemana', this.cardapioForm.get('diaDaSemana')?.value);
    formData.append('titulo', this.cardapioForm.get('titulo')?.value);
    formData.append('descricao', this.cardapioForm.get('descricao')?.value);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    if (this.isEditing && this.currentCardapioId !== null) {
      this.cardapioService.update(this.currentCardapioId, formData).subscribe({
        next: () => {
          this.toastrService.success('Cardápio atualizado com sucesso!');
          this.loadCardapios();
          this.resetForm();
        },
        error: (error) => {
          this.toastrService.error('Erro ao adicionar o cardápio!');
        }
      });
    } else {
      this.cardapioService.add(formData).subscribe({
        next: () => {
          this.toastrService.success('Cardápio atualizado com sucesso!');
          this.loadCardapios();
          this.resetForm();
        },
        error: () => {
          this.toastrService.error('Erro ao adicionar o cardápio!');
        }
      });
    }
  }

  editCardapio(cardapio: any) {
    this.isEditing = true;
    this.currentCardapioId = cardapio.id;
    this.cardapioForm.patchValue(cardapio);
  }

  deleteCardapio(id: number) {
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
        this.cardapioService.delete(id).subscribe({
          next: () => {

            Swal.fire('Excluído!', 'O cardápio foi excluído com sucesso.', 'success');
            this.loadCardapios();
          },
          error: () => {
            Swal.fire('Erro!', 'Ocorreu um problema ao excluir o cardápio.', 'error');
          }
        });
      }
    });
  }

  resetForm() {
    this.isEditing = false;
    this.currentCardapioId = null;
    this.cardapioForm.reset();
    this.selectedFile = null;
    this.resetFileInputs();
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
    });
  }
}
