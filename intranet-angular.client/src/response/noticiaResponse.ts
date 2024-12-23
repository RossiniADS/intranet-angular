import { CategoriaResponse } from "./categoriaResponse";

export interface NoticiaResponse {
  id: number;
  titulo: string;
  conteudo: string;
  descricao: string;
  isTrendingTop: boolean;
  midiaUrl: string[];
  autorId?: number;
  categoria: CategoriaResponse[];
  dataPublicacao: Date;
}
