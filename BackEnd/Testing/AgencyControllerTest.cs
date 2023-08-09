using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Hosting;
using Moq;
using Big_Bang3_Assessment.Controllers;
using Big_Bang3_Assessment.Data;
using Big_Bang3_Assessment.Model;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Assert = Microsoft.VisualStudio.TestTools.UnitTesting.Assert;

namespace Big_Bang3_Assessment.Test
{
    [TestClass]
    public class AgencyControllerTest
    {
        private TourismDbContext GetTestDbContext(string dbName)
        {
            var dbContextOptions = new DbContextOptionsBuilder<TourismDbContext>()
                .UseInMemoryDatabase(databaseName: dbName)
                .Options;
            return new TourismDbContext(dbContextOptions);
        }

        [TestMethod]
        public async Task GetAgencies_ShouldReturnAllAgencies()
        {
            // Arrange
            using (var dbContext = GetTestDbContext("GetAgencies_ShouldReturnAllAgencies"))
            {
                // Create the test data and set up the controller
                dbContext.agencies.Add(new Agency { Agency_Id = 1, Agency_Name = "Test Agency 1" });
                dbContext.agencies.Add(new Agency { Agency_Id = 2, Agency_Name = "Test Agency 2" });
                dbContext.SaveChanges();

                var hostingEnvironmentMock = new Mock<IWebHostEnvironment>();
                hostingEnvironmentMock.Setup(env => env.WebRootPath).Returns("/test/wwwroot");

                var controller = new AgencyController(dbContext, hostingEnvironmentMock.Object);

                // Act
                var result = await controller.GetAgencies();

                // Assert
                Assert.AreEqual(2, result.Value.Count());
            }
        }

    }
}
