using Xunit;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Moq;
using Big_Bang3_Assessment.Controllers;
using Big_Bang3_Assessment.Data;
using Big_Bang3_Assessment.Model;

namespace Big_Bang3_Assessment.Tests.Controllers
{
    public class AgentRegistersControllerTests
    {
        private DbContextOptions<TourismDbContext> GetInMemoryDbContextOptions(string dbName)
        {
            return new DbContextOptionsBuilder<TourismDbContext>()
                .UseInMemoryDatabase(databaseName: dbName)
                .Options;
        }

        // Test GetAgentRegisters

        // Test GetAgentRegisters
        [Fact]
        public async Task GetAgentRegisters_ReturnsListOfAgentRegisters()
        {
            // Arrange
            var dbContextOptions = GetInMemoryDbContextOptions("TestDatabase_GetAgentRegisters");
            using (var context = new TourismDbContext(dbContextOptions))
            {
                var agentRegisters = new List<AgentRegister>
        {
            new AgentRegister { Agent_Id = 1, Agent_Name = "Aish" },
            new AgentRegister { Agent_Id = 2, Agent_Name = "Tiya" }
        };
                context.agentRegisters.AddRange(agentRegisters);
                context.SaveChanges();

                var controller = new AgentRegistersController(context);

                // Act
                var result = await controller.GetAgentRegisters();

                // Assert
                var okResult = Assert.IsType<OkObjectResult>(result);
                var returnedValue = Assert.IsAssignableFrom<IEnumerable<AgentRegister>>(okResult.Value);
                Assert.Equal(2, returnedValue.Count());
                // Additional assertions based on your test data
            }
        }

        // Test GetAgentRegister
        [Fact]
        public async Task GetAgentRegister_ReturnsAgentRegisterById()
        {
            // Arrange
            var dbContextOptions = GetInMemoryDbContextOptions("TestDatabase_GetAgentRegister");
            using (var context = new TourismDbContext(dbContextOptions))
            {
                var agentRegisters = new List<AgentRegister>
        {
            new AgentRegister { Agent_Id = 1, Agent_Name = "Aish" },
            new AgentRegister { Agent_Id = 2, Agent_Name = "TiyaS" }
        };
                context.agentRegisters.AddRange(agentRegisters);
                context.SaveChanges();

                var controller = new AgentRegistersController(context);

                // Act
                var result = await controller.GetAgentRegister(1);

                // Assert
                var okResult = Assert.IsType<OkObjectResult>(result);
                var returnedValue = Assert.IsAssignableFrom<AgentRegister>(okResult.Value);
                Assert.Equal("Agent 1", returnedValue.Agent_Name);
                // Additional assertions based on your test data
            }
        }



        // Test DeleteAgentRegister
        [Fact]
        public async Task DeleteAgentRegister_DeletesAgentRegister()
        {
            // Arrange
            var dbContextOptions = GetInMemoryDbContextOptions("TestDatabase_DeleteAgentRegister");
            using (var context = new TourismDbContext(dbContextOptions))
            {
                var agentRegisters = new List<AgentRegister>
                {
                    new AgentRegister { Agent_Id = 1, Agent_Name = "Aish" }
                };
                context.agentRegisters.AddRange(agentRegisters);
                context.SaveChanges();

                var controller = new AgentRegistersController(context);

                // Act
                var result = await controller.DeleteAgentRegister(1);

                // Assert
                var noContentResult = Assert.IsType<NoContentResult>(result);
                Assert.Equal(0, context.agentRegisters.Count());
            }
        }
    }
}
