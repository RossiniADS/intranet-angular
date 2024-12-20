﻿namespace intranet_angular.Server.Response
{
    public class NoticiaResponse
    {
        public int Id { get; set; }
        public string Titulo { get; set; }
        public string Conteudo { get; set; }
        public DateTime DataPublicacao { get; set; }
        public int? AutorId { get; set; }
        public List<int> CategoriaIds { get; set; }
        public List<string> MidiaUrl { get; set; }
    }
}
