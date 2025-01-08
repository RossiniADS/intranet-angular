import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventoService } from '../../../service/evento.service'; // Importe o serviço que irá gerenciar os eventos
import { EventoResponse } from '../../../../response/eventoResponse';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evento',
  standalone: false,

  templateUrl: './evento.component.html',
  styleUrl: './evento.component.css'
})
export class EventoComponent implements OnInit {
  eventoForm: FormGroup;
  eventos: EventoResponse[] = [{
    id: 0,
    dataFim: new Date(),
    dataInicio: new Date(),
    descricao: '',
    imagemUrl: '',
    localizacao: '',
    nome: ''
  }];
  isEditing = false;
  currentEventoId: number | null = null;
  selectedFile: File | null = null;
  page: number = 1;
  pageSize: number = 10;
  totalItems: number = 0;

  constructor(private fb: FormBuilder, private toastrService: ToastrService, private eventoService: EventoService) {
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
    this.eventoService.getEventoPaginadas(this.page, this.pageSize).subscribe(data => {
      this.eventos = data.data.map(eve => ({
        id: eve.id,
        dataFim: eve.dataFim,
        dataInicio: eve.dataInicio,
        descricao: eve.descricao,
        imagemUrl: eve.imagemUrl,
        localizacao: eve.localizacao,
        nome: eve.nome
      }));
      this.totalItems = data.totalRecords;
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
      this.eventoService.update(this.currentEventoId, formData).subscribe({
        next: () => {
          this.toastrService.success('Evento atualizado com sucesso!');
          this.loadEventos();
          this.resetForm();
        },
        error: () => {
          this.toastrService.error('Erro ao atualizar o evento!');
        }
      });
    } else {
      this.eventoService.add(formData).subscribe({
        next: () => {
          this.toastrService.success('Evento adicionado com sucesso!');
          this.loadEventos();
          this.resetForm();
        },
        error: () => {
          this.toastrService.error('Erro ao adicionar o evento!');
        }
      });
    }
  }

  editEvento(evento: any) {
    this.isEditing = true;
    this.currentEventoId = evento.id;
    this.eventoForm.patchValue(evento);
  }

  deleteEvento(id: number) {
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
        this.eventoService.delete(id).subscribe({
          next: () => {

            Swal.fire('Excluído!', 'O cardápio foi excluído com sucesso.', 'success');
            this.loadEventos();
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
    this.currentEventoId = null;
    this.eventoForm.reset();
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

  onFilterChange(): void {
    this.page = 1;
    this.loadEventos();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadEventos();
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.pageSize);
  }
}
