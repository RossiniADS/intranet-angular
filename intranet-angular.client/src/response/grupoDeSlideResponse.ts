import { SlideResponse } from "./slideResponse";

export interface GrupoDeSlideResponse {
  id: number;
  paginaId: number;
  autorId: number;
  autor: string;
  dataPublicacao: Date;
  autorUrl: string;
  nome: string;
  posicao: number;
  slides: SlideResponse[]
}
