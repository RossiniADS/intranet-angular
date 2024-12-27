import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardapioService } from '../../../service/cardapio.service';
import { CardapioResponse } from '../../../../response/cardapioResponse';

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

  constructor(private fb: FormBuilder, private cardapioService: CardapioService) {
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
      this.cardapioService.update(this.currentCardapioId, formData).subscribe(() => {
        this.loadCardapios();
        this.resetForm();
      });
    } else {
      this.cardapioService.add(formData).subscribe(() => {
        this.loadCardapios();
        this.resetForm();
      });
    }
  }

  editCardapio(cardapio: any) {
    this.isEditing = true;
    this.currentCardapioId = cardapio.id;
    this.cardapioForm.patchValue(cardapio);
  }

  deleteCardapio(id: number) {
    if (confirm('Tem certeza que deseja excluir este cardápio?')) {
      this.cardapioService.delete(id).subscribe(() => {
        this.loadCardapios();
      });
    }
  }

  resetForm() {
    this.isEditing = false;
    this.currentCardapioId = null;
    this.cardapioForm.reset();
    this.selectedFile = null;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}
