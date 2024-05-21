using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddingGroupTasks : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TasksGroupId",
                table: "Contributors",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TasksGroup",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PhotoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsClosed = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TasksGroup", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ToDoListContributors",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    GroupId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ToDoListContributors", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Contributors_TasksGroupId",
                table: "Contributors",
                column: "TasksGroupId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contributors_TasksGroup_TasksGroupId",
                table: "Contributors",
                column: "TasksGroupId",
                principalTable: "TasksGroup",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contributors_TasksGroup_TasksGroupId",
                table: "Contributors");

            migrationBuilder.DropTable(
                name: "TasksGroup");

            migrationBuilder.DropTable(
                name: "ToDoListContributors");

            migrationBuilder.DropIndex(
                name: "IX_Contributors_TasksGroupId",
                table: "Contributors");

            migrationBuilder.DropColumn(
                name: "TasksGroupId",
                table: "Contributors");
        }
    }
}
