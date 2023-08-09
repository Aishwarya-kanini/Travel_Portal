import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import '../../src/Component/AgentLoginForm.css';

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    admin_Name: '',
    admin_Password: '',
  });

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
    navigate('/AdminDashboard');
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://localhost:7125/api/Token/Admin', {
        Admin_Name: formData.admin_Name,
        Admin_Password: formData.admin_Password,
      });

      const token = response.data;

      console.log('Login successful. Token:', token);
      localStorage.setItem('token', token);
      localStorage.setItem('role', 'Admin');

      setUsername(formData.admin_Name);
      setShowWelcomeModal(true);

     
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
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundSize: 'cover', backgroundPosition: 'center', overflow: 'hidden' }}>
        <div style={{ width: '100%', maxWidth: '440px', background: 'rgba(255, 255, 255, 0.8)', borderRadius: '5px', boxShadow: '0px 4px 10px 1px rgba(0, 0, 0, 0.1)' }}>
          <div style={{ height: '90px', background: '#e7a412', borderRadius: '5px 5px 0 0', color: '#fff', fontSize: '30px', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span>Admin Login</span>
          </div>
          <form style={{ padding: '30px 25px 25px 25px' }} onSubmit={handleSubmit}>
            <div style={{ height: '45px', marginBottom: '15px', position: 'relative' }}>
              <i style={{ position: 'absolute', width: '47px', height: '100%', color: '#fff', fontSize: '18px', background: '#e7a412', border: '1px solid #e7a412', borderRadius: '5px 0 0 5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faUser} />
              </i>
              <input
                type="text"
                placeholder="Username"
                name="admin_Name"
                value={formData.admin_Name}
                onChange={handleChange}
                required
                style={{ height: '100%', width: '100%', outline: 'none', paddingLeft: '60px', borderRadius: '5px', border: '1px solid lightgrey', fontSize: '16px', transition: 'all 0.3s ease', backgroundColor: '#fff' }}
              />
            </div>
            <div style={{ height: '45px', marginBottom: '15px', position: 'relative' }}>
              <i style={{ position: 'absolute', width: '47px', height: '100%', color: '#fff', fontSize: '18px', background: '#e7a412', border: '1px solid #e7a412', borderRadius: '5px 0 0 5px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FontAwesomeIcon icon={faLock} />
              </i>
              <input
                type="password"
                placeholder="Password"
                name="admin_Password"
                value={formData.admin_Password}
                onChange={handleChange}
                required
                style={{ height: '100%', width: '100%', outline: 'none', paddingLeft: '60px', borderRadius: '5px', border: '1px solid lightgrey', fontSize: '16px', transition: 'all 0.3s ease', backgroundColor: '#fff' }}
              />
            </div>
            <div style={{ margin: '-8px 0 20px 0' }}>
              <a href="#" style={{ color: '#e7a412', fontSize: '17px', textDecoration: 'none' }}>Forgot password?</a>
            </div>
            <div style={{ height: '45px', marginBottom: '15px', position: 'relative' }} className="log-row log-button">
              <input type="submit" value="Login" style={{ color: '#fff', fontSize: '20px', fontWeight: '500', paddingLeft: '0px', background: '#e7a412', border: '1px solid #e7a412', cursor: 'pointer' }} />
            </div>
            <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '17px' }} className="log-signup-link">
              Not a member? <Link to="/RegistrationForm" style={{ color: '#e7a412', textDecoration: 'none' }}>Create an admin account</Link>
            </div>
          </form>
        </div>
      </div>
      {showWelcomeModal && (
        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'white', padding: '20px', borderRadius: '5px', boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)', zIndex: 9999 }}>
          <h2>Welcome Back, {username}!</h2>
          <button onClick={handleWelcomeModalClose}>Close</button>
        </div>
      )}
    </div>
  );
};

export default AdminLogin;
