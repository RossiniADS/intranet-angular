import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SugestaoService } from '../../service/sugestao.service';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  standalone: false,
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  contactTitle = 'Deixe sua sugestão!';
  feedbackForm: FormGroup;

  contactInfos = [
    { icon: 'fa-solid fa-house', title: 'Lorena, São Paulo.', description: 'Rua Dom Bosco, 562' },
    { icon: 'fa-solid fa-tablet-screen-button', title: '(12) 3159-3344 / (12) 3159-3349', description: 'Telefone de contato' },
    { icon: 'fa-solid fa-tablet-screen-button', title: '(12) 98891-5484', description: 'WhatsApp do Ambulatório Convênio' },
    { icon: 'fa-regular fa-envelope', title: 'internacao@santacasalorena.org.br', description: 'Contacte-nos a qualquer momento!' }
  ];

  constructor(private fb: FormBuilder, private sugestaoService: SugestaoService) {
    this.feedbackForm = this.fb.group({
      nome: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      celular: ['', Validators.required],
      assunto: ['', Validators.required],
      mensagem: ['', Validators.required]
    });
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.feedbackForm.valid) {
      this.sugestaoService.add(this.feedbackForm.value).subscribe(() => {
        this.resetForm();
      })
    } else {
      console.log('Form is invalid');
    }
  }

  resetForm() {
    this.feedbackForm.reset();
  }
}
