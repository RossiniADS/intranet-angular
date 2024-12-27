using intranet_angular.Server.Enuns;

namespace intranet_angular.Server.Entities
{
    public class Cardapio
    {
        public int Id { get; set; }
        public DiaDaSemana DiaDaSemana { get; set; }
        public string Titulo { get; set; }
        public string Descricao { get; set; }
        public string ImagemUrl { get; set; }
    }
}
