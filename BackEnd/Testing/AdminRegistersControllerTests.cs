using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Moq;
using Xunit;
using Big_Bang3_Assessment.Controllers;
using Big_Bang3_Assessment.Data;
using Big_Bang3_Assessment.Model;
using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace Big_Bang3_Assessment.Tests
{
    public class AdminRegistersControllerTests
    {
        [Fact]
        public async Task GetAdminRegisters_ReturnsListOfAdminRegisters()
        {
            // Arrange
            var options = new DbContextOptionsBuilder<TourismDbContext>()
                .UseInMemoryDatabase(databaseName: "TestDatabase")
                .Options;

            using (var context = new TourismDbContext(options))
            {
                context.adminRegisters.AddRange(new List<AdminRegister>
        {
            new AdminRegister { Admin_Id = 1, Admin_Name = "Admin" },
        });
                context.SaveChanges();

                var controller = new AdminRegistersController(context);

                // Act
                var result = await controller.GetadminRegisters();

                // Assert
                var actionResult = Assert.IsType<ActionResult<IEnumerable<AdminRegister>>>(result);
                var value = Assert.IsAssignableFrom<IEnumerable<AdminRegister>>(actionResult.Value);
                Assert.Single(value); // Check that the result contains a single item
            }
        }

        [Fact]
        public async Task GetAdminRegister_ReturnsAdminRegister()
        {
            // Arrange
            var adminRegister = new AdminRegister { Admin_Id = 1, Admin_Name = "Admin " };

            var mockContext = new Mock<TourismDbContext>();
            mockContext.Setup(c => c.adminRegisters.FindAsync(1)).ReturnsAsync(adminRegister);

            var controller = new AdminRegistersController(mockContext.Object);

            // Act
            var result = await controller.GetAdminRegister(1);

            // Assert
            var actionResult = Assert.IsType<ActionResult<AdminRegister>>(result);
            var value = Assert.IsAssignableFrom<AdminRegister>(actionResult.Value);
            Assert.Equal("Admin", value.Admin_Name);
        }

        // Similar tests for other methods...


    }
}