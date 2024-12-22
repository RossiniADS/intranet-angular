import { SlideResponse } from "./slideResponse";

export interface GroupDeSlideResponse {
  id: number;
  paginaId: number;
  nome: string;
  slides: SlideResponse[]
}
