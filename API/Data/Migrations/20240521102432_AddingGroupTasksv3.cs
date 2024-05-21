using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddingGroupTasksv3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AppUserId",
                table: "ToDoListContributors",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_ToDoListContributors_AppUserId",
                table: "ToDoListContributors",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ToDoListContributors_AspNetUsers_AppUserId",
                table: "ToDoListContributors",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ToDoListContributors_AspNetUsers_AppUserId",
                table: "ToDoListContributors");

            migrationBuilder.DropIndex(
                name: "IX_ToDoListContributors_AppUserId",
                table: "ToDoListContributors");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "ToDoListContributors");
        }
    }
}
