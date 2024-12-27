import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoService } from '../../../service/evento.service'; // Importe o serviço que irá gerenciar os eventos

@Component({
  selector: 'app-evento',
  standalone: false,

  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css'
})
export class EventoComponent {
  eventoForm: FormGroup;
  eventos: any[] = [];
  isEditing = false;
  currentEventoId: number | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private eventoService: EventoService) {
    this.eventoForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      descricao: ['', [Validators.required]],
      dataInicio: ['', [Validators.required]],
      dataFim: [''],
      localizacao: ['', [Validators.required]],
    });
  }

  ngOnInit() {
    this.loadEventos();
  }

  loadEventos() {
    this.eventoService.getAll().subscribe(data => {
      this.eventos = data;
    });
  }

  submitForm() {
    if (this.eventoForm.invalid) return;

    const formData = new FormData();
    formData.append('nome', this.eventoForm.get('nome')?.value);
    formData.append('descricao', this.eventoForm.get('descricao')?.value);
    formData.append('dataInicio', this.eventoForm.get('dataInicio')?.value);
    formData.append('dataFim', this.eventoForm.get('dataFim')?.value);
    formData.append('localizacao', this.eventoForm.get('localizacao')?.value);

    if (this.selectedFile) {
      formData.append('file', this.selectedFile, this.selectedFile.name);
    }

    if (this.isEditing && this.currentEventoId !== null) {
      this.eventoService.update(this.currentEventoId, formData).subscribe(() => {
        this.loadEventos();
        this.resetForm();
      });
    } else {
      this.eventoService.add(formData).subscribe(() => {
        this.loadEventos();
        this.resetForm();
      });
    }
  }

  editEvento(evento: any) {
    this.isEditing = true;
    this.currentEventoId = evento.id;
    this.eventoForm.patchValue(evento);
  }

  deleteEvento(id: number) {
    if (confirm('Tem certeza que deseja excluir este evento?')) {
      this.eventoService.delete(id).subscribe(() => {
        this.loadEventos();
      });
    }
  }

  resetForm() {
    this.isEditing = false;
    this.currentEventoId = null;
    this.eventoForm.reset();
    this.selectedFile = null;
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }
}
