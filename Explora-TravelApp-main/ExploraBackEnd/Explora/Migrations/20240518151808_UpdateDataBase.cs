using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Explora.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDataBase : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "t_AIRLINE",
                columns: table => new
                {
                    IdAirline = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AirlineName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AddressAirline = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDelete = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_AIRLINE", x => x.IdAirline);
                });

            migrationBuilder.CreateTable(
                name: "t_NHA_XE",
                columns: table => new
                {
                    IdNhaXe = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NhaXeName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AddressNhaXe = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    IsDelete = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_NHA_XE", x => x.IdNhaXe);
                });

            migrationBuilder.CreateTable(
                name: "t_ROLE",
                columns: table => new
                {
                    RoleId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StatusRole = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_ROLE", x => x.RoleId);
                });

            migrationBuilder.CreateTable(
                name: "t_USER",
                columns: table => new
                {
                    UserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasswordUser = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UrlAvatar = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EmailConfirm = table.Column<byte>(type: "tinyint", nullable: true),
                    EmailConfirmToken = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ResetPasswordToken = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_USER", x => x.UserId);
                });

            migrationBuilder.CreateTable(
                name: "t_PLANE",
                columns: table => new
                {
                    IdPlane = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PlaneName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Slot = table.Column<int>(type: "int", nullable: false),
                    EmptySlot = table.Column<int>(type: "int", nullable: false),
                    StartPoint = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EndPoint = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDelete = table.Column<int>(type: "int", nullable: false),
                    IdAirline = table.Column<int>(type: "int", nullable: false),
                    IdAirlineNavigationIdAirline = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_PLANE", x => x.IdPlane);
                    table.ForeignKey(
                        name: "FK_t_PLANE_t_AIRLINE_IdAirlineNavigationIdAirline",
                        column: x => x.IdAirlineNavigationIdAirline,
                        principalTable: "t_AIRLINE",
                        principalColumn: "IdAirline",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "t_BUS",
                columns: table => new
                {
                    IdBus = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IdNhaXe = table.Column<int>(type: "int", nullable: false),
                    BusName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Slot = table.Column<int>(type: "int", nullable: false),
                    EmptySlot = table.Column<int>(type: "int", nullable: false),
                    StartPoint = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EndPoint = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsDelete = table.Column<int>(type: "int", nullable: false),
                    IdNhaXeNavigationIdNhaXe = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_BUS", x => x.IdBus);
                    table.ForeignKey(
                        name: "FK_t_BUS_t_NHA_XE_IdNhaXeNavigationIdNhaXe",
                        column: x => x.IdNhaXeNavigationIdNhaXe,
                        principalTable: "t_NHA_XE",
                        principalColumn: "IdNhaXe",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "t_HOTEL",
                columns: table => new
                {
                    IdHotel = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HotelName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AddressHotel = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    RoomCount = table.Column<int>(type: "int", nullable: false),
                    IsDelete = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_HOTEL", x => x.IdHotel);
                    table.ForeignKey(
                        name: "FK_t_HOTEL_t_USER_UserId",
                        column: x => x.UserId,
                        principalTable: "t_USER",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "t_ROLE_USER",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_ROLE_USER", x => x.Id);
                    table.ForeignKey(
                        name: "FK_t_ROLE_USER_t_ROLE_RoleId",
                        column: x => x.RoleId,
                        principalTable: "t_ROLE",
                        principalColumn: "RoleId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_t_ROLE_USER_t_USER_UserId",
                        column: x => x.UserId,
                        principalTable: "t_USER",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "t_ORDER_PLANE",
                columns: table => new
                {
                    OrderId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    TotalPrice = table.Column<int>(type: "int", nullable: false),
                    BuyTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    IdPlane = table.Column<int>(type: "int", nullable: false),
                    IdPlaneNavigationIdPlane = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_ORDER_PLANE", x => x.OrderId);
                    table.ForeignKey(
                        name: "FK_t_ORDER_PLANE_t_PLANE_IdPlaneNavigationIdPlane",
                        column: x => x.IdPlaneNavigationIdPlane,
                        principalTable: "t_PLANE",
                        principalColumn: "IdPlane",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_t_ORDER_PLANE_t_USER_UserId",
                        column: x => x.UserId,
                        principalTable: "t_USER",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "t_ORDER_BUS",
                columns: table => new
                {
                    OrderId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    TotalPrice = table.Column<int>(type: "int", nullable: false),
                    BuyTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    IdBus = table.Column<int>(type: "int", nullable: false),
                    IdBusNavigationIdBus = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_ORDER_BUS", x => x.OrderId);
                    table.ForeignKey(
                        name: "FK_t_ORDER_BUS_t_BUS_IdBusNavigationIdBus",
                        column: x => x.IdBusNavigationIdBus,
                        principalTable: "t_BUS",
                        principalColumn: "IdBus",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_t_ORDER_BUS_t_USER_UserId",
                        column: x => x.UserId,
                        principalTable: "t_USER",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "t_BILL_ROOM",
                columns: table => new
                {
                    BillId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GuessName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GuessEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Amount = table.Column<int>(type: "int", nullable: false),
                    TotalPrice = table.Column<int>(type: "int", nullable: false),
                    StartTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    EndTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    BuyTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    HotelId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_BILL_ROOM", x => x.BillId);
                    table.ForeignKey(
                        name: "FK_t_BILL_ROOM_t_HOTEL_HotelId",
                        column: x => x.HotelId,
                        principalTable: "t_HOTEL",
                        principalColumn: "IdHotel",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_t_BILL_ROOM_t_USER_UserId",
                        column: x => x.UserId,
                        principalTable: "t_USER",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "T_TYPE_ROOM",
                columns: table => new
                {
                    RoomTypeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoomTypeName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ImageUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Price = table.Column<int>(type: "int", nullable: false),
                    Area = table.Column<int>(type: "int", nullable: false),
                    HotelId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_T_TYPE_ROOM", x => x.RoomTypeId);
                    table.ForeignKey(
                        name: "FK_T_TYPE_ROOM_t_HOTEL_HotelId",
                        column: x => x.HotelId,
                        principalTable: "t_HOTEL",
                        principalColumn: "IdHotel",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "t_PLANE_TICKET",
                columns: table => new
                {
                    TicketId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    GuessName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GuessEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateOfBirth = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Nationality = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PasspostNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ExpiredTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    TPlaneIdPlane = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_PLANE_TICKET", x => x.TicketId);
                    table.ForeignKey(
                        name: "FK_t_PLANE_TICKET_t_ORDER_PLANE_OrderId",
                        column: x => x.OrderId,
                        principalTable: "t_ORDER_PLANE",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_t_PLANE_TICKET_t_PLANE_TPlaneIdPlane",
                        column: x => x.TPlaneIdPlane,
                        principalTable: "t_PLANE",
                        principalColumn: "IdPlane");
                });

            migrationBuilder.CreateTable(
                name: "t_BUS_TICKET",
                columns: table => new
                {
                    TicketId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrderId = table.Column<int>(type: "int", nullable: false),
                    GuessName = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    GuessEmail = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TBuIdBus = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_BUS_TICKET", x => x.TicketId);
                    table.ForeignKey(
                        name: "FK_t_BUS_TICKET_t_BUS_TBuIdBus",
                        column: x => x.TBuIdBus,
                        principalTable: "t_BUS",
                        principalColumn: "IdBus");
                    table.ForeignKey(
                        name: "FK_t_BUS_TICKET_t_ORDER_BUS_OrderId",
                        column: x => x.OrderId,
                        principalTable: "t_ORDER_BUS",
                        principalColumn: "OrderId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "t_ROOM",
                columns: table => new
                {
                    IdRoom = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HotelId = table.Column<int>(type: "int", nullable: false),
                    RoomTypeId = table.Column<int>(type: "int", nullable: false),
                    RoomNumber = table.Column<int>(type: "int", nullable: false),
                    IsDelete = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_t_ROOM", x => x.IdRoom);
                    table.ForeignKey(
                        name: "FK_t_ROOM_T_TYPE_ROOM_RoomTypeId",
                        column: x => x.RoomTypeId,
                        principalTable: "T_TYPE_ROOM",
                        principalColumn: "RoomTypeId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_t_ROOM_t_HOTEL_HotelId",
                        column: x => x.HotelId,
                        principalTable: "t_HOTEL",
                        principalColumn: "IdHotel",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "TBillRoomTRoom",
                columns: table => new
                {
                    TBillRoomsBillId = table.Column<int>(type: "int", nullable: false),
                    TRoomsIdRoom = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TBillRoomTRoom", x => new { x.TBillRoomsBillId, x.TRoomsIdRoom });
                    table.ForeignKey(
                        name: "FK_TBillRoomTRoom_t_BILL_ROOM_TBillRoomsBillId",
                        column: x => x.TBillRoomsBillId,
                        principalTable: "t_BILL_ROOM",
                        principalColumn: "BillId",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TBillRoomTRoom_t_ROOM_TRoomsIdRoom",
                        column: x => x.TRoomsIdRoom,
                        principalTable: "t_ROOM",
                        principalColumn: "IdRoom",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_t_BILL_ROOM_HotelId",
                table: "t_BILL_ROOM",
                column: "HotelId");

            migrationBuilder.CreateIndex(
                name: "IX_t_BILL_ROOM_UserId",
                table: "t_BILL_ROOM",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_t_BUS_IdNhaXeNavigationIdNhaXe",
                table: "t_BUS",
                column: "IdNhaXeNavigationIdNhaXe");

            migrationBuilder.CreateIndex(
                name: "IX_t_BUS_TICKET_OrderId",
                table: "t_BUS_TICKET",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_t_BUS_TICKET_TBuIdBus",
                table: "t_BUS_TICKET",
                column: "TBuIdBus");

            migrationBuilder.CreateIndex(
                name: "IX_t_HOTEL_UserId",
                table: "t_HOTEL",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_t_ORDER_BUS_IdBusNavigationIdBus",
                table: "t_ORDER_BUS",
                column: "IdBusNavigationIdBus");

            migrationBuilder.CreateIndex(
                name: "IX_t_ORDER_BUS_UserId",
                table: "t_ORDER_BUS",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_t_ORDER_PLANE_IdPlaneNavigationIdPlane",
                table: "t_ORDER_PLANE",
                column: "IdPlaneNavigationIdPlane");

            migrationBuilder.CreateIndex(
                name: "IX_t_ORDER_PLANE_UserId",
                table: "t_ORDER_PLANE",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_t_PLANE_IdAirlineNavigationIdAirline",
                table: "t_PLANE",
                column: "IdAirlineNavigationIdAirline");

            migrationBuilder.CreateIndex(
                name: "IX_t_PLANE_TICKET_OrderId",
                table: "t_PLANE_TICKET",
                column: "OrderId");

            migrationBuilder.CreateIndex(
                name: "IX_t_PLANE_TICKET_TPlaneIdPlane",
                table: "t_PLANE_TICKET",
                column: "TPlaneIdPlane");

            migrationBuilder.CreateIndex(
                name: "IX_t_ROLE_USER_RoleId",
                table: "t_ROLE_USER",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_t_ROLE_USER_UserId",
                table: "t_ROLE_USER",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_t_ROOM_HotelId",
                table: "t_ROOM",
                column: "HotelId");

            migrationBuilder.CreateIndex(
                name: "IX_t_ROOM_RoomTypeId",
                table: "t_ROOM",
                column: "RoomTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_T_TYPE_ROOM_HotelId",
                table: "T_TYPE_ROOM",
                column: "HotelId");

            migrationBuilder.CreateIndex(
                name: "IX_TBillRoomTRoom_TRoomsIdRoom",
                table: "TBillRoomTRoom",
                column: "TRoomsIdRoom");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "t_BUS_TICKET");

            migrationBuilder.DropTable(
                name: "t_PLANE_TICKET");

            migrationBuilder.DropTable(
                name: "t_ROLE_USER");

            migrationBuilder.DropTable(
                name: "TBillRoomTRoom");

            migrationBuilder.DropTable(
                name: "t_ORDER_BUS");

            migrationBuilder.DropTable(
                name: "t_ORDER_PLANE");

            migrationBuilder.DropTable(
                name: "t_ROLE");

            migrationBuilder.DropTable(
                name: "t_BILL_ROOM");

            migrationBuilder.DropTable(
                name: "t_ROOM");

            migrationBuilder.DropTable(
                name: "t_BUS");

            migrationBuilder.DropTable(
                name: "t_PLANE");

            migrationBuilder.DropTable(
                name: "T_TYPE_ROOM");

            migrationBuilder.DropTable(
                name: "t_NHA_XE");

            migrationBuilder.DropTable(
                name: "t_AIRLINE");

            migrationBuilder.DropTable(
                name: "t_HOTEL");

            migrationBuilder.DropTable(
                name: "t_USER");
        }
    }
}
