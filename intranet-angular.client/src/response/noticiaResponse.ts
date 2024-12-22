import { CategoriaResponse } from "./categoriaResponse";

export interface NoticiaResponse {
  id: number;
  titulo: string;
  conteudo: string;
  midiaUrl: string[];
  autorId?: number;
  categoria: CategoriaResponse[];
  dataPublicacao: Date;
}
