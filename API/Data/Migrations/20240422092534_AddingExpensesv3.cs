using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddingExpensesv3 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_MemeTag_MemeTagId",
                table: "Expenses");

            migrationBuilder.DropColumn(
                name: "MemeTagId",
                table: "MemeTag");

            migrationBuilder.AlterColumn<int>(
                name: "MemeTagId",
                table: "Expenses",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_MemeTag_MemeTagId",
                table: "Expenses",
                column: "MemeTagId",
                principalTable: "MemeTag",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_MemeTag_MemeTagId",
                table: "Expenses");

            migrationBuilder.AddColumn<int>(
                name: "MemeTagId",
                table: "MemeTag",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AlterColumn<int>(
                name: "MemeTagId",
                table: "Expenses",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_MemeTag_MemeTagId",
                table: "Expenses",
                column: "MemeTagId",
                principalTable: "MemeTag",
                principalColumn: "Id");
        }
    }
}
