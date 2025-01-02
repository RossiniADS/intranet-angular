using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace intranet_angular.Server.Entities
{
    public class MenuItem
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(255)]
        public string Label { get; set; }

        public string? PdfUrl { get; set; }

        public int? ParentId { get; set; }

        [ForeignKey("ParentId")]
        public MenuItem? Parent { get; set; }

        public ICollection<MenuItem> Children { get; set; } = new List<MenuItem>();
    }
}