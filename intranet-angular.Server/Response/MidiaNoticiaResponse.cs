using intranet_angular.Server.Entities;
using intranet_angular.Server.Enuns;

namespace intranet_angular.Server.Response
{
    public class MidiaNoticiaResponse
    {
        public int Id { get; set; }
        public int NoticiaId { get; set; }
        public TipoMidiaEnum Tipo { get; set; }
        public string URL { get; set; }
        public MidiaTamanhoEnum MidiaTamanho { get; set; }

    }
}
