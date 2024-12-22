using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace intranet_angular.Server.Migrations
{
    /// <inheritdoc />
    public partial class NoticiaIDnoslide : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "NoticiaId",
                table: "Slides",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Slides_NoticiaId",
                table: "Slides",
                column: "NoticiaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Slides_Noticias_NoticiaId",
                table: "Slides",
                column: "NoticiaId",
                principalTable: "Noticias",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Slides_Noticias_NoticiaId",
                table: "Slides");

            migrationBuilder.DropIndex(
                name: "IX_Slides_NoticiaId",
                table: "Slides");

            migrationBuilder.DropColumn(
                name: "NoticiaId",
                table: "Slides");
        }
    }
}
