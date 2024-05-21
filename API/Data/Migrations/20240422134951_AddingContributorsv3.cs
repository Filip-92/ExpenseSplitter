using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddingContributorsv3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contributors_MemeTag_MemeTagId",
                table: "Contributors");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "Contributors");

            migrationBuilder.AlterColumn<int>(
                name: "MemeTagId",
                table: "Contributors",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Contributors_MemeTag_MemeTagId",
                table: "Contributors",
                column: "MemeTagId",
                principalTable: "MemeTag",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contributors_MemeTag_MemeTagId",
                table: "Contributors");

            migrationBuilder.AlterColumn<int>(
                name: "MemeTagId",
                table: "Contributors",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "Contributors",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddForeignKey(
                name: "FK_Contributors_MemeTag_MemeTagId",
                table: "Contributors",
                column: "MemeTagId",
                principalTable: "MemeTag",
                principalColumn: "Id");
        }
    }
}
