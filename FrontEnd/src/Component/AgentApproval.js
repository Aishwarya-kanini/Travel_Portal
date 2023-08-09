import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

export default function AgentStatus() {
  const [apiData, setApiData] = useState([]);
  const [isNavigationActive, setNavigationActive] = useState(false);

  useEffect(() => {

    axios.get('https://localhost:7125/api/AgentRegisters')
      .then((response) => {
        setApiData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleToggle = () => {
    setNavigationActive((prevIsNavigationActive) => !prevIsNavigationActive);
  };

  const handleApproveAgent = (agentId) => {
    const updatedApiData = apiData.map((agent) => {
      if (agent.agent_Id === agentId) {
        return { ...agent, status: 'Approved' };
      }
      return agent;
    });

    axios.put(`https://localhost:7125/api/AdminRegisters/UpdateApprovalStatus/${agentId}`, 'Approved', {
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
    })
      .then((response) => {
        console.log('Agent approved successfully:', response.data);
        setApiData(updatedApiData);
      })
      .catch((error) => {
        console.error('Error updating approval status:', error);
      });
  };

  const handleDeclineAgent = (agentId) => {
    const updatedApiData = apiData.map((agent) => {
      if (agent.agent_Id === agentId) {
        return { ...agent, status: 'Declined' };
      }
      return agent;
    });

    axios.put(`https://localhost:7125/api/AdminRegisters/UpdateApprovalStatus/${agentId}`, 'Declined', {
      headers: {
        'Content-Type': 'application/json-patch+json',
      },
    })
      .then((response) => {
        console.log('Agent declined successfully:', response.data);
        setApiData(updatedApiData);
      })
      .catch((error) => {
        console.error('Error updating approval status:', error);
      });
  };

  return (
    <div className={`container-main ${isNavigationActive ? 'active' : ''}`}>
      
      <div className="recent-orders">
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Agent Name</TableCell>
                <TableCell>Agent ID</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Update Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {apiData
                .filter((agent) => agent.status === 'pending')
                .map((agent) => (
                  <TableRow key={agent.agent_Id}>
                    <TableCell>{agent.agent_Name}</TableCell>
                    <TableCell>{agent.agent_Id}</TableCell>
                    <TableCell>{agent.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: '#4CAF50', color: 'white', marginRight: 5 }}
                        onClick={() => handleApproveAgent(agent.agent_Id)}
                      >
                        Approve
                      </Button>
                      <Button
                        variant="contained"
                        style={{ backgroundColor: '#f44336', color: 'white' }}
                        onClick={() => handleDeclineAgent(agent.agent_Id)}
                      >
                        Decline
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
}
