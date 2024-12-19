using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace intranet_angular.Server.Migrations
{
    /// <inheritdoc />
    public partial class AtualizaçãoEnumMidiaNoticia : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TipoMidia",
                table: "MidiasNoticias");

            migrationBuilder.AlterColumn<int>(
                name: "Tipo",
                table: "MidiasNoticias",
                type: "int",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Tipo",
                table: "MidiasNoticias",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "TipoMidia",
                table: "MidiasNoticias",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
