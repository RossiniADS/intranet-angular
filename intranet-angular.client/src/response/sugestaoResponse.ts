export interface SugestaoResponse {
  id: number;
  nome: string;
  email: string;
  celular: string;
  assunto: string;
  mensagem: string;
  lida: boolean;
  criadaEm: Date;
  lidaEm: Date;
}
