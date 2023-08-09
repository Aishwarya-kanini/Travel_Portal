using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Big_Bang3_Assessment.Controllers;
using Big_Bang3_Assessment.Data;
using Big_Bang3_Assessment.Model;
using Moq;

namespace AgencyTesting
{
    public class AgencyControllerTests
    {
        // Helper method to create a mock TourismDbContext
        private static TourismDbContext CreateMockContext(List<Agency> agencies)
        {
            var mockContext = new Mock<TourismDbContext>();

            var agenciesDbSetMock = MockDbSet(agencies);
            mockContext.Setup(c => c.agencies).Returns(agenciesDbSetMock.Object);

            return mockContext.Object;
        }

        // Helper method to create a mock DbSet
        private static Mock<DbSet<T>> MockDbSet<T>(List<T> data) where T : class
        {
            var queryable = data.AsQueryable();
            var mockSet = new Mock<DbSet<T>>();
            mockSet.As<IQueryable<T>>().Setup(m => m.Provider).Returns(queryable.Provider);
            mockSet.As<IQueryable<T>>().Setup(m => m.Expression).Returns(queryable.Expression);
            mockSet.As<IQueryable<T>>().Setup(m => m.ElementType).Returns(queryable.ElementType);
            mockSet.As<IQueryable<T>>().Setup(m => m.GetEnumerator()).Returns(() => queryable.GetEnumerator());
            return mockSet;
        }

        // Test the GetAgencies method
        [Fact]
        public async Task GetAgencies_ReturnsOkResultWithListOfAgencies()
        {
            // Arrange
            var agencies = new List<Agency> { new Agency { Agency_Id = 1, Agency_Name = "Agency 1" } };
            var mockContext = CreateMockContext(agencies);
            var controller = new AgencyController(mockContext, null);

            // Act
            var result = await controller.GetAgencies();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var agenciesResult = Assert.IsType<List<Agency>>(okResult.Value);
            Assert.Single(agenciesResult);
        }

        // Test the GetAgency method with an existing ID
        [Fact]
        public async Task GetAgency_WithExistingId_ReturnsOkResultWithAgency()
        {
            // Arrange
            var agencies = new List<Agency> { new Agency { Agency_Id = 1, Agency_Name = "Agency 1" } };
            var mockContext = CreateMockContext(agencies);
            var controller = new AgencyController(mockContext, null);

            // Act
            var result = await controller.GetAgency(1);

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result.Result);
            var agencyResult = Assert.IsType<Agency>(okResult.Value);
            Assert.Equal(1, agencyResult.Agency_Id);
        }

        // Test the GetAgency method with a non-existing ID
        [Fact]
        public async Task GetAgency_WithNonExistingId_ReturnsNotFoundResult()
        {
            // Arrange
            var agencies = new List<Agency> { new Agency { Agency_Id = 1, Agency_Name = "Agency 1" } };
            var mockContext = CreateMockContext(agencies);
            var controller = new AgencyController(mockContext, null);

            // Act
            var result = await controller.GetAgency(2);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        // Add more test methods for other controller actions...
    }
}
