using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddingGroupTasksv2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AppUserId",
                table: "TasksGroup",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TasksGroup_AppUserId",
                table: "TasksGroup",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TasksGroup_AspNetUsers_AppUserId",
                table: "TasksGroup",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TasksGroup_AspNetUsers_AppUserId",
                table: "TasksGroup");

            migrationBuilder.DropIndex(
                name: "IX_TasksGroup_AppUserId",
                table: "TasksGroup");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "TasksGroup");
        }
    }
}
