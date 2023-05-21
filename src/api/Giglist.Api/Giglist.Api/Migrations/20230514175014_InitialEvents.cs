using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Giglist.Api.Migrations
{
    /// <inheritdoc />
    public partial class InitialEvents : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Venues",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    City = table.Column<string>(type: "text", nullable: false),
                    SearchName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Venues", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Events",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Subtitle = table.Column<string>(type: "text", nullable: false),
                    StartDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    VenueId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Events", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Events_Venues_VenueId",
                        column: x => x.VenueId,
                        principalTable: "Venues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Venues",
                columns: new[] { "Id", "City", "Name", "SearchName" },
                values: new object[,]
                {
                    { new Guid("12bb42c3-94b0-49c6-919d-53a3ace9d7ac"), "London", "O2 Arena", "o2arena" },
                    { new Guid("42fc5d09-0e5b-4073-a58c-5a68ef47173e"), "Leeds", "O2 Academy Leeds", "o2academyleeds" },
                    { new Guid("f7908ef4-89fb-4822-b984-86869f4e45ee"), "Leeds", "First Direct Arena", "firstdirectarena" },
                    { new Guid("fa73c367-a28e-4548-a427-8186a2b7b0d3"), "Manchester", "New Century Hall", "newcenturyhall" }
                });

            migrationBuilder.InsertData(
                table: "Events",
                columns: new[] { "Id", "Name", "StartDate", "Subtitle", "VenueId" },
                values: new object[,]
                {
                    { new Guid("48455b22-b799-400e-a13a-7165860f79ef"), "Ev 3", new DateTime(2023, 1, 3, 0, 0, 0, 0, DateTimeKind.Utc), "Three", new Guid("42fc5d09-0e5b-4073-a58c-5a68ef47173e") },
                    { new Guid("68d95b5e-b41d-4f8c-89a6-1cbc34c7564f"), "Ev 2", new DateTime(2023, 1, 2, 0, 0, 0, 0, DateTimeKind.Utc), "Two", new Guid("fa73c367-a28e-4548-a427-8186a2b7b0d3") },
                    { new Guid("809dcb32-53db-46fc-a3c2-323cab66b05b"), "Ev 4", new DateTime(2023, 1, 4, 0, 0, 0, 0, DateTimeKind.Utc), "Four", new Guid("12bb42c3-94b0-49c6-919d-53a3ace9d7ac") },
                    { new Guid("92fabf6c-ed9c-4291-b9ed-115855925493"), "Ev 1", new DateTime(2023, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc), "One", new Guid("f7908ef4-89fb-4822-b984-86869f4e45ee") }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Events_VenueId",
                table: "Events",
                column: "VenueId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Events");

            migrationBuilder.DropTable(
                name: "Venues");
        }
    }
}
