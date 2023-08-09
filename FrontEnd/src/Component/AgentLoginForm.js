import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import './AgentLoginForm.css';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    agent_Name: '',
    agent_Password: '',
  });

  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [agentName, setAgentName] = useState('');

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleWelcomeModalClose = () => {
    setShowWelcomeModal(false);
    navigate('/AgentDashboard'); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const agentsResponse = await axios.get('https://localhost:7125/api/AgentRegisters');
      const agents = agentsResponse.data;

      const agent = agents.find((a) => a.agent_Name === formData.agent_Name);

      if (agent && agent.agent_Password === formData.agent_Password && agent.status === 'Approved') {
        const response = await axios.post('https://localhost:7125/api/Token/Agent', {
          agent_Name: formData.agent_Name,
          agent_Password: formData.agent_Password,
        });

        const token = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('role', 'Agent');
        localStorage.setItem('Name',formData.agent_Name);
        setAgentName(formData.agent_Name);
        setShowWelcomeModal(true);
        alert('Welcome', formData.agent_Name);
        navigate('/AgentDashboard', { state: { agentId: agent.agent_Id } });
      } else {
        alert('Invalid credentials or agent is not approved.');
      }
    } catch (error) {
      alert('An error occurred while processing your request.');
    }
  };

  return (
    <div className="log-container">
      <div className="log-wrapper">
        <div className="log-title">
          <span>Agent Login</span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="log-row">
            <i className="fas fa-user">
            </i>
            <input
              type="text"
              placeholder="Email or Phone"
              name="agent_Name"
              value={formData.agent_Name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="log-row">
            <i className="fas fa-lock">
            </i>
            <input
              type="password"
              placeholder="Password"
              name="agent_Password"
              value={formData.agent_Password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="log-pass">
            <a href="#">Forgot password?</a>
          </div>
          <div className="log-row log-button">
            <input type="submit" value="Login" />
          </div>
          <div className="log-signup-link">
            Not a member? <Link to="/RegistrationForm">Signup now</Link>
          </div>
        </form>
      </div>

      {showWelcomeModal && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: '#fff',
              padding: '20px',
              borderRadius: '5px',
              textAlign: 'center',
            }}
          >
            <h2 style={{ marginBottom: '10px' }}>Welcome Back!</h2>
            <p>{`Hello ${agentName}, you have successfully logged in.`}</p>
            <button
              onClick={handleWelcomeModalClose}
              style={{
                padding: '5px 10px',
                background: '#16a085',
                color: '#fff',
                border: 'none',
                borderRadius: '3px',
                cursor: 'pointer',
                marginTop: '10px',
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
