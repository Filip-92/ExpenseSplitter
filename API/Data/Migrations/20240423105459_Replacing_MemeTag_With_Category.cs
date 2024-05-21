using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class Replacing_MemeTag_With_Category : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contributors_MemeTag_MemeTagId",
                table: "Contributors");

            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_MemeTag_MemeTagId",
                table: "Expenses");

            migrationBuilder.DropTable(
                name: "Announcement");

            migrationBuilder.DropTable(
                name: "Division");

            migrationBuilder.DropTable(
                name: "MemeTag");

            migrationBuilder.RenameColumn(
                name: "MemeTagId",
                table: "Expenses",
                newName: "CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Expenses_MemeTagId",
                table: "Expenses",
                newName: "IX_Expenses_CategoryId");

            migrationBuilder.RenameColumn(
                name: "MemeTagId",
                table: "Contributors",
                newName: "CategoryId");

            migrationBuilder.RenameIndex(
                name: "IX_Contributors_MemeTagId",
                table: "Contributors",
                newName: "IX_Contributors_CategoryId");

            migrationBuilder.CreateTable(
                name: "Category",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppUserId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Category", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Category_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Category_AppUserId",
                table: "Category",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contributors_Category_CategoryId",
                table: "Contributors",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_Category_CategoryId",
                table: "Expenses",
                column: "CategoryId",
                principalTable: "Category",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Contributors_Category_CategoryId",
                table: "Contributors");

            migrationBuilder.DropForeignKey(
                name: "FK_Expenses_Category_CategoryId",
                table: "Expenses");

            migrationBuilder.DropTable(
                name: "Category");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "Expenses",
                newName: "MemeTagId");

            migrationBuilder.RenameIndex(
                name: "IX_Expenses_CategoryId",
                table: "Expenses",
                newName: "IX_Expenses_MemeTagId");

            migrationBuilder.RenameColumn(
                name: "CategoryId",
                table: "Contributors",
                newName: "MemeTagId");

            migrationBuilder.RenameIndex(
                name: "IX_Contributors_CategoryId",
                table: "Contributors",
                newName: "IX_Contributors_MemeTagId");

            migrationBuilder.CreateTable(
                name: "Announcement",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AppUserId = table.Column<int>(type: "int", nullable: true),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Announcement", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Announcement_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Division",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AppUserId = table.Column<int>(type: "int", nullable: true),
                    IsCloseDivision = table.Column<bool>(type: "bit", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Division", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Division_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "MemeTag",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AppUserId = table.Column<int>(type: "int", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Username = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MemeTag", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MemeTag_AspNetUsers_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Announcement_AppUserId",
                table: "Announcement",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Division_AppUserId",
                table: "Division",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_MemeTag_AppUserId",
                table: "MemeTag",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Contributors_MemeTag_MemeTagId",
                table: "Contributors",
                column: "MemeTagId",
                principalTable: "MemeTag",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Expenses_MemeTag_MemeTagId",
                table: "Expenses",
                column: "MemeTagId",
                principalTable: "MemeTag",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
