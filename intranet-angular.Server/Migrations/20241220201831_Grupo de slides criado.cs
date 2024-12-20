using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace intranet_angular.Server.Migrations
{
    /// <inheritdoc />
    public partial class Grupodeslidescriado : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Slides_Paginas_PaginaId",
                table: "Slides");

            migrationBuilder.AlterColumn<int>(
                name: "PaginaId",
                table: "Slides",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "GrupoDeSlidesId",
                table: "Slides",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "GrupoDeSlides",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PaginaId = table.Column<int>(type: "int", nullable: false),
                    Nome = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_GrupoDeSlides", x => x.Id);
                    table.ForeignKey(
                        name: "FK_GrupoDeSlides_Paginas_PaginaId",
                        column: x => x.PaginaId,
                        principalTable: "Paginas",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Slides_GrupoDeSlidesId",
                table: "Slides",
                column: "GrupoDeSlidesId");

            migrationBuilder.CreateIndex(
                name: "IX_GrupoDeSlides_PaginaId",
                table: "GrupoDeSlides",
                column: "PaginaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Slides_GrupoDeSlides_GrupoDeSlidesId",
                table: "Slides",
                column: "GrupoDeSlidesId",
                principalTable: "GrupoDeSlides",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Slides_Paginas_PaginaId",
                table: "Slides",
                column: "PaginaId",
                principalTable: "Paginas",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Slides_GrupoDeSlides_GrupoDeSlidesId",
                table: "Slides");

            migrationBuilder.DropForeignKey(
                name: "FK_Slides_Paginas_PaginaId",
                table: "Slides");

            migrationBuilder.DropTable(
                name: "GrupoDeSlides");

            migrationBuilder.DropIndex(
                name: "IX_Slides_GrupoDeSlidesId",
                table: "Slides");

            migrationBuilder.DropColumn(
                name: "GrupoDeSlidesId",
                table: "Slides");

            migrationBuilder.AlterColumn<int>(
                name: "PaginaId",
                table: "Slides",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Slides_Paginas_PaginaId",
                table: "Slides",
                column: "PaginaId",
                principalTable: "Paginas",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
