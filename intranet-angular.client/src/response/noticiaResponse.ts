export interface NoticiaResponse {
  id: number;
  titulo: string;
  conteudo: string;
  midiaUrl: string[];
  autorId?: number;
  categoriaIds: number[];
  dataPublicacao: Date;
}
