using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Explora.Migrations
{
    /// <inheritdoc />
    public partial class UpdateData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_t_ORDER_BUS_t_BUS_IdBusNavigationIdBus",
                table: "t_ORDER_BUS");

            migrationBuilder.DropForeignKey(
                name: "FK_t_ORDER_PLANE_t_PLANE_IdPlaneNavigationIdPlane",
                table: "t_ORDER_PLANE");

            migrationBuilder.DropIndex(
                name: "IX_t_ORDER_PLANE_IdPlaneNavigationIdPlane",
                table: "t_ORDER_PLANE");

            migrationBuilder.DropIndex(
                name: "IX_t_ORDER_BUS_IdBusNavigationIdBus",
                table: "t_ORDER_BUS");

            migrationBuilder.DropColumn(
                name: "IdPlaneNavigationIdPlane",
                table: "t_ORDER_PLANE");

            migrationBuilder.DropColumn(
                name: "IdBusNavigationIdBus",
                table: "t_ORDER_BUS");

            migrationBuilder.CreateIndex(
                name: "IX_t_ORDER_PLANE_IdPlane",
                table: "t_ORDER_PLANE",
                column: "IdPlane");

            migrationBuilder.CreateIndex(
                name: "IX_t_ORDER_BUS_IdBus",
                table: "t_ORDER_BUS",
                column: "IdBus");

            migrationBuilder.AddForeignKey(
                name: "FK_t_ORDER_BUS_t_BUS_IdBus",
                table: "t_ORDER_BUS",
                column: "IdBus",
                principalTable: "t_BUS",
                principalColumn: "IdBus",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_t_ORDER_PLANE_t_PLANE_IdPlane",
                table: "t_ORDER_PLANE",
                column: "IdPlane",
                principalTable: "t_PLANE",
                principalColumn: "IdPlane",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_t_ORDER_BUS_t_BUS_IdBus",
                table: "t_ORDER_BUS");

            migrationBuilder.DropForeignKey(
                name: "FK_t_ORDER_PLANE_t_PLANE_IdPlane",
                table: "t_ORDER_PLANE");

            migrationBuilder.DropIndex(
                name: "IX_t_ORDER_PLANE_IdPlane",
                table: "t_ORDER_PLANE");

            migrationBuilder.DropIndex(
                name: "IX_t_ORDER_BUS_IdBus",
                table: "t_ORDER_BUS");

            migrationBuilder.AddColumn<int>(
                name: "IdPlaneNavigationIdPlane",
                table: "t_ORDER_PLANE",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "IdBusNavigationIdBus",
                table: "t_ORDER_BUS",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_t_ORDER_PLANE_IdPlaneNavigationIdPlane",
                table: "t_ORDER_PLANE",
                column: "IdPlaneNavigationIdPlane");

            migrationBuilder.CreateIndex(
                name: "IX_t_ORDER_BUS_IdBusNavigationIdBus",
                table: "t_ORDER_BUS",
                column: "IdBusNavigationIdBus");

            migrationBuilder.AddForeignKey(
                name: "FK_t_ORDER_BUS_t_BUS_IdBusNavigationIdBus",
                table: "t_ORDER_BUS",
                column: "IdBusNavigationIdBus",
                principalTable: "t_BUS",
                principalColumn: "IdBus",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_t_ORDER_PLANE_t_PLANE_IdPlaneNavigationIdPlane",
                table: "t_ORDER_PLANE",
                column: "IdPlaneNavigationIdPlane",
                principalTable: "t_PLANE",
                principalColumn: "IdPlane",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
