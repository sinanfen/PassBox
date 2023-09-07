using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class migration_2_createdBymodifiedBy : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Boxes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "ModifiedBy",
                table: "Boxes",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "CreatedBy", "CreatedDate", "ModifiedBy" },
                values: new object[] { "Admin", new DateTime(2023, 9, 7, 21, 39, 33, 549, DateTimeKind.Local).AddTicks(455), "" });

            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "CreatedBy", "CreatedDate", "ModifiedBy" },
                values: new object[] { "Admin", new DateTime(2023, 9, 7, 21, 39, 33, 549, DateTimeKind.Local).AddTicks(460), "" });

            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "CreatedBy", "CreatedDate", "ModifiedBy" },
                values: new object[] { "Admin", new DateTime(2023, 9, 7, 21, 39, 33, 549, DateTimeKind.Local).AddTicks(462), "" });

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "9e0a43e9-8fa3-4daa-9567-e17b975cf25c");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "aee382ad-23a4-4bc7-b885-bb0acd118aa9", "AQAAAAIAAYagAAAAEH3RJ3jUlYQz4YGl4DgDV/zUr3zsnzX/jj3oGawxNfCgnZpRTheLEzxSw0Sln+IlOg==", "796395d2-71d5-485c-bdbb-7886528746c6" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Boxes");

            migrationBuilder.DropColumn(
                name: "ModifiedBy",
                table: "Boxes");

            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2023, 9, 7, 18, 0, 48, 11, DateTimeKind.Local).AddTicks(8413));

            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2023, 9, 7, 18, 0, 48, 11, DateTimeKind.Local).AddTicks(8417));

            migrationBuilder.UpdateData(
                table: "Boxes",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2023, 9, 7, 18, 0, 48, 11, DateTimeKind.Local).AddTicks(8419));

            migrationBuilder.UpdateData(
                table: "Roles",
                keyColumn: "Id",
                keyValue: 1,
                column: "ConcurrencyStamp",
                value: "4da13928-6547-4245-ae8b-5ca2c8652f45");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "ConcurrencyStamp", "PasswordHash", "SecurityStamp" },
                values: new object[] { "f394b371-e1a0-4da8-99d6-3008b9ab8d4d", "AQAAAAIAAYagAAAAEFsbXhae/h+kYCbQrgx7kYvJkJZxdHuYI0BQ+EEhC9gNuGTEhpPWqYaoNKEQbainKA==", "a8025e90-22ab-44cd-b2a0-4e1204292c13" });
        }
    }
}
