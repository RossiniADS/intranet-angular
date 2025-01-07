import { ConfiguracaoGrupoDeSlideResponse } from "./configuracaoGrupoDeSlideResponse";

export interface PaginaResponse {
  id: number;
  nome: string;
  descricao: string;
  configuracoesDeGrupos: ConfiguracaoGrupoDeSlideResponse[]
}
