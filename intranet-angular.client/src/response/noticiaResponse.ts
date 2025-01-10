import { CategoriaResponse } from "./categoriaResponse";
import { MidiaNoticiaResponse } from "./midiaNoticiaResponse";

export interface NoticiaResponse {
  id: number;
  titulo: string;
  conteudo: string;
  descricao: string;
  isTrendingTop: boolean;
  midiaNoticia: MidiaNoticiaResponse[];
  autorId?: number;
  autor: string;
  categoria: CategoriaResponse[];
  dataPublicacao: Date;
  categoriaNomes?: string;
}
