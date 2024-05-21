using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddingContributorsv2 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Emails",
                table: "Contributors",
                newName: "Email");

            migrationBuilder.AddColumn<int>(
                name: "AppUserId",
                table: "Contributors",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Contributors_AppUserId",
                table: "Contributors",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contributors_AspNetUsers_AppUserId",
                table: "Contributors",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contributors_AspNetUsers_AppUserId",
                table: "Contributors");

            migrationBuilder.DropIndex(
                name: "IX_Contributors_AppUserId",
                table: "Contributors");

            migrationBuilder.DropColumn(
                name: "AppUserId",
                table: "Contributors");

            migrationBuilder.RenameColumn(
                name: "Email",
                table: "Contributors",
                newName: "Emails");
        }
    }
}
