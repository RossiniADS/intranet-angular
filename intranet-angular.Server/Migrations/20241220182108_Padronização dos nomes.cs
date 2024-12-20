using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace intranet_angular.Server.Migrations
{
    /// <inheritdoc />
    public partial class Padronizaçãodosnomes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Paginas",
                newName: "Nome");

            migrationBuilder.RenameColumn(
                name: "Description",
                table: "Paginas",
                newName: "Descricao");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Nome",
                table: "Paginas",
                newName: "Name");

            migrationBuilder.RenameColumn(
                name: "Descricao",
                table: "Paginas",
                newName: "Description");
        }
    }
}
