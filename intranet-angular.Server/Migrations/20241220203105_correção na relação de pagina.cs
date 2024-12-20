using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace intranet_angular.Server.Migrations
{
    /// <inheritdoc />
    public partial class correçãonarelaçãodepagina : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Slides_Paginas_PaginaId",
                table: "Slides");

            migrationBuilder.DropIndex(
                name: "IX_Slides_PaginaId",
                table: "Slides");

            migrationBuilder.DropColumn(
                name: "PaginaId",
                table: "Slides");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "PaginaId",
                table: "Slides",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Slides_PaginaId",
                table: "Slides",
                column: "PaginaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Slides_Paginas_PaginaId",
                table: "Slides",
                column: "PaginaId",
                principalTable: "Paginas",
                principalColumn: "Id");
        }
    }
}
