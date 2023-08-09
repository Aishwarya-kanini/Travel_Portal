using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Big_Bang3_Assessment.Migrations
{
    /// <inheritdoc />
    public partial class init1 : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "AdminRegisterAdmin_Id",
                table: "agentRegisters",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AdminRegisterAdmin_Id",
                table: "agencies",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_agentRegisters_AdminRegisterAdmin_Id",
                table: "agentRegisters",
                column: "AdminRegisterAdmin_Id");

            migrationBuilder.CreateIndex(
                name: "IX_agencies_AdminRegisterAdmin_Id",
                table: "agencies",
                column: "AdminRegisterAdmin_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_agencies_adminRegisters_AdminRegisterAdmin_Id",
                table: "agencies",
                column: "AdminRegisterAdmin_Id",
                principalTable: "adminRegisters",
                principalColumn: "Admin_Id");

            migrationBuilder.AddForeignKey(
                name: "FK_agentRegisters_adminRegisters_AdminRegisterAdmin_Id",
                table: "agentRegisters",
                column: "AdminRegisterAdmin_Id",
                principalTable: "adminRegisters",
                principalColumn: "Admin_Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_agencies_adminRegisters_AdminRegisterAdmin_Id",
                table: "agencies");

            migrationBuilder.DropForeignKey(
                name: "FK_agentRegisters_adminRegisters_AdminRegisterAdmin_Id",
                table: "agentRegisters");

            migrationBuilder.DropIndex(
                name: "IX_agentRegisters_AdminRegisterAdmin_Id",
                table: "agentRegisters");

            migrationBuilder.DropIndex(
                name: "IX_agencies_AdminRegisterAdmin_Id",
                table: "agencies");

            migrationBuilder.DropColumn(
                name: "AdminRegisterAdmin_Id",
                table: "agentRegisters");

            migrationBuilder.DropColumn(
                name: "AdminRegisterAdmin_Id",
                table: "agencies");
        }
    }
}
