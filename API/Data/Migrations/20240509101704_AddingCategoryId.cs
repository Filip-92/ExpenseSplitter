using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class AddingCategoryId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Spendings_Category_CategoryId",
                table: "Spendings");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "Spendings",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Spendings_Category_CategoryId",
                table: "Spendings",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Spendings_Category_CategoryId",
                table: "Spendings");

            migrationBuilder.AlterColumn<int>(
                name: "CategoryId",
                table: "Spendings",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "FK_Spendings_Category_CategoryId",
                table: "Spendings",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id");
        }
    }
}
