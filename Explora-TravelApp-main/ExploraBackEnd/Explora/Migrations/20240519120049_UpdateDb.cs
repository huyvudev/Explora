using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Explora.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDb : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_t_BUS_t_NHA_XE_IdNhaXeNavigationIdNhaXe",
                table: "t_BUS");

            migrationBuilder.DropForeignKey(
                name: "FK_t_PLANE_t_AIRLINE_IdAirlineNavigationIdAirline",
                table: "t_PLANE");

            migrationBuilder.DropIndex(
                name: "IX_t_PLANE_IdAirlineNavigationIdAirline",
                table: "t_PLANE");

            migrationBuilder.DropIndex(
                name: "IX_t_BUS_IdNhaXeNavigationIdNhaXe",
                table: "t_BUS");

            migrationBuilder.DropColumn(
                name: "IdAirlineNavigationIdAirline",
                table: "t_PLANE");

            migrationBuilder.DropColumn(
                name: "IdNhaXeNavigationIdNhaXe",
                table: "t_BUS");

            migrationBuilder.CreateIndex(
                name: "IX_t_PLANE_IdAirline",
                table: "t_PLANE",
                column: "IdAirline");

            migrationBuilder.CreateIndex(
                name: "IX_t_BUS_IdNhaXe",
                table: "t_BUS",
                column: "IdNhaXe");

            migrationBuilder.AddForeignKey(
                name: "FK_t_BUS_t_NHA_XE_IdNhaXe",
                table: "t_BUS",
                column: "IdNhaXe",
                principalTable: "t_NHA_XE",
                principalColumn: "IdNhaXe",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_t_PLANE_t_AIRLINE_IdAirline",
                table: "t_PLANE",
                column: "IdAirline",
                principalTable: "t_AIRLINE",
                principalColumn: "IdAirline",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_t_BUS_t_NHA_XE_IdNhaXe",
                table: "t_BUS");

            migrationBuilder.DropForeignKey(
                name: "FK_t_PLANE_t_AIRLINE_IdAirline",
                table: "t_PLANE");

            migrationBuilder.DropIndex(
                name: "IX_t_PLANE_IdAirline",
                table: "t_PLANE");

            migrationBuilder.DropIndex(
                name: "IX_t_BUS_IdNhaXe",
                table: "t_BUS");

            migrationBuilder.AddColumn<int>(
                name: "IdAirlineNavigationIdAirline",
                table: "t_PLANE",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IdNhaXeNavigationIdNhaXe",
                table: "t_BUS",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_t_PLANE_IdAirlineNavigationIdAirline",
                table: "t_PLANE",
                column: "IdAirlineNavigationIdAirline");

            migrationBuilder.CreateIndex(
                name: "IX_t_BUS_IdNhaXeNavigationIdNhaXe",
                table: "t_BUS",
                column: "IdNhaXeNavigationIdNhaXe");

            migrationBuilder.AddForeignKey(
                name: "FK_t_BUS_t_NHA_XE_IdNhaXeNavigationIdNhaXe",
                table: "t_BUS",
                column: "IdNhaXeNavigationIdNhaXe",
                principalTable: "t_NHA_XE",
                principalColumn: "IdNhaXe",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_t_PLANE_t_AIRLINE_IdAirlineNavigationIdAirline",
                table: "t_PLANE",
                column: "IdAirlineNavigationIdAirline",
                principalTable: "t_AIRLINE",
                principalColumn: "IdAirline",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
