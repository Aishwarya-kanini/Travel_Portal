import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../../src/Component/AgentLoginForm.css';
import UserView from './UserView';

const UserLogin = () => {
  const [formData, setFormData] = useState({
    user_Name: '',
    user_Password: '',
  });

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showWelcomeModal, setShowWelcomeModal] = useState(false);
  const [username, setUsername] = useState('');

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
    navigate('/UserView'); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7125/api/Token/User', {
        User_Name: formData.user_Name,
        User_Password: formData.user_Password,
      });

      const token = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('role', 'User');
      localStorage.setItem('user_tokenName', formData.user_Name);

      const userResponse = await axios.get('https://localhost:7125/api/Users', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          name: formData.user_Name,
        },
      });

      const userData = userResponse.data;
      console.log('User Data:', userData);

      localStorage.setItem('userId', userData[0].user_Id);

      setUsername(formData.user_Name);
      setShowWelcomeModal(true);
      setIsLoggedIn(true);
      
      
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundImage: `url(${require('../../src/images/t4.jpg')})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
      }}
    >
      {isLoggedIn ? (
        <UserView />
      ) : (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              width: '100%',
              maxWidth: '440px',
              background: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '5px',
              boxShadow: '0px 4px 10px 1px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div
              style={{
                height: '90px',
                background: '#e7a412',
                borderRadius: '5px 5px 0 0',
                color: '#fff',
                fontSize: '30px',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <span>User Login</span>
            </div>

            <form style={{ padding: '30px 25px 25px 25px' }} onSubmit={handleSubmit}>
              <div style={{ height: '45px', marginBottom: '15px', position: 'relative' }}>
                <i
                  style={{
                    position: 'absolute',
                    width: '47px',
                    height: '100%',
                    color: '#fff',
                    fontSize: '18px',
                    background: '#e7a412',
                    border: '1px solid #e7a412',
                    borderRadius: '5px 0 0 5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FontAwesomeIcon icon={faUser} />
                </i>
                <input
                  type="text"
                  placeholder="Username"
                  name="user_Name"
                  value={formData.user_Name}
                  onChange={handleChange}
                  required
                  style={{
                    height: '100%',
                    width: '100%',
                    outline: 'none',
                    paddingLeft: '60px',
                    borderRadius: '5px',
                    border: '1px solid lightgrey',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    backgroundColor: '#fff',
                  }}
                />
              </div>
              <div style={{ height: '45px', marginBottom: '15px', position: 'relative' }}>
                <i
                  style={{
                    position: 'absolute',
                    width: '47px',
                    height: '100%',
                    color: '#fff',
                    fontSize: '18px',
                    background: '#e7a412',
                    border: '1px solid #e7a412',
                    borderRadius: '5px 0 0 5px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <FontAwesomeIcon icon={faLock} />
                </i>
                <input
                  type="password"
                  placeholder="Password"
                  name="user_Password"
                  value={formData.user_Password}
                  onChange={handleChange}
                  required
                  style={{
                    height: '100%',
                    width: '100%',
                    outline: 'none',
                    paddingLeft: '60px',
                    borderRadius: '5px',
                    border: '1px solid lightgrey',
                    fontSize: '16px',
                    transition: 'all 0.3s ease',
                    backgroundColor: '#fff',
                  }}
                />
              </div>
              <div style={{ margin: '-8px 0 20px 0' }}>
                <a href="#" style={{ color: '#e7a412', fontSize: '17px', textDecoration: 'none' }}>
                  Forgot password?
                </a>
              </div>
              <div style={{ height: '45px', marginBottom: '15px', position: 'relative' }} className="log-row log-button">
                <input
                  type="submit"
                  value="Login"
                  style={{
                    color: '#fff',
                    fontSize: '20px',
                    fontWeight: '500',
                    paddingLeft: '0px',
                    background: '#e7a412',
                    border: '1px solid ##e7a412',
                    cursor: 'pointer',
                  }}
                />
              </div>
              <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '17px' }} className="log-signup-link">
                Not a member? <Link to="/UserRegistrationForm" style={{ color: '#e7a412', textDecoration: 'none' }}>Create a user account</Link>
              </div>
            </form>
          </div>
        </div>
      )}

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
            <p>{`Hello ${username}, you have successfully logged in.`}</p>
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

export default UserLogin;
