import { MidiaTamanhoEnum } from "../app/enum/midia-tamanho.enum";
import { TipoMidiaEnum } from "../app/enum/tipo-midia.enum";

export interface MidiaNoticiaResponse {
  id: number;
  noticiaId: number;
  tipo: TipoMidiaEnum;
  url: string;
  midiaTamanho: MidiaTamanhoEnum;
}
