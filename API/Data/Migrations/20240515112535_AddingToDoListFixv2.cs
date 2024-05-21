using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddingToDoListFixv2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ToDoListDayId",
                table: "ToDoListTasks");

            migrationBuilder.AddColumn<int>(
                name: "AppUserId",
                table: "ToDoListTasks",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Task",
                table: "ToDoListTasks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_ToDoListTasks_AppUserId",
                table: "ToDoListTasks",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoListTasks_AspNetUsers_AppUserId",
                table: "ToDoListTasks",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDoListTasks_AspNetUsers_AppUserId",
                table: "ToDoListTasks");

            migrationBuilder.DropIndex(
                name: "IX_ToDoListTasks_AppUserId",
                table: "ToDoListTasks");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "ToDoListTasks");

            migrationBuilder.DropColumn(
                name: "Task",
                table: "ToDoListTasks");

            migrationBuilder.AddColumn<int>(
                name: "ToDoListDayId",
                table: "ToDoListTasks",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
