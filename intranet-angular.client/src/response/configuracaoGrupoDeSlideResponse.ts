import { TipoMidiaEnum } from "../app/enum/tipo-midia.enum";

export interface ConfiguracaoGrupoDeSlideResponse {
  id: number;
  paginaId: number;
  posicao: number;
  tipoDeMidia: TipoMidiaEnum;
}
