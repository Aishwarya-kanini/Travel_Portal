import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../src/Component/RegistrationForm.css';

const AgentRegistrationForm = () => {
  const navigate = useNavigate();

  const [regFormData, setRegFormData] = useState({
    regFirstName: '',
    regLastName: '',
    regPassword: '',
    regConfirmPassword: '',
    regGender: '',
    regEmailAddress: '',
    regPhoneNumber: '',
    regAddress: '',
    regPostalCode: '',
    regAgreedToTerms: false,
  });

  const regPasswordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

  const [passwordError, setPasswordError] = useState('');

  const handleRegChange = (e) => {
    const { name, value, type, checked } = e.target;
    let updatedValue = type === 'checkbox' ? checked : value;

    if (name === 'regPassword') {
      if (!regPasswordRegex.test(updatedValue)) {
        setPasswordError('Password must be at least 8 characters long and contain at least one letter and one digit.');
      } else {
        setPasswordError('');
      }
    }

    setRegFormData((prevData) => ({
      ...prevData,
      [name]: updatedValue,
    }));
  };

  const handleRegSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      user_Name: regFormData.regEmailAddress,
      user_Password: regFormData.regPassword,
    };

    try {
      const response = await fetch('https://localhost:7125/api/AgentRegisters', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log('Registration successful');
        navigate('/AgentLogin');
      } else {
        console.log('Registration failed');
      }
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };

  return (
    <body className="registration-form-body">
      <div className="reg-wrapper">
        <div className="reg-title">Registration Form</div>
        <form className="reg-form" onSubmit={handleRegSubmit}>
          <div className="reg-inputfield">
            <label>First Name</label>
            <input
              type="text"
              className="reg-input"
              name="regFirstName"
              value={regFormData.regFirstName}
              onChange={handleRegChange}
              required
            />
          </div>
          <div className="reg-inputfield">
            <label>Last Name</label>
            <input
              type="text"
              className="reg-input"
              name="regLastName"
              value={regFormData.regLastName}
              onChange={handleRegChange}
              required
            />
          </div>
          <div className="reg-inputfield">
            <label>Password</label>
            <input
              type="password"
              className="reg-input"
              name="regPassword"
              value={regFormData.regPassword}
              onChange={handleRegChange}
              required
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <div className="reg-inputfield">
            <label>Confirm Password</label>
            <input
              type="password"
              className="reg-input"
              name="regConfirmPassword"
              value={regFormData.regConfirmPassword}
              onChange={handleRegChange}
              required
            />
          </div>
          <div className="reg-inputfield">
            <label>Gender</label>
            <div className="reg-custom-select">
              <select
                name="regGender"
                value={regFormData.regGender}
                onChange={handleRegChange}
                required
              >
                <option value="">Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
          </div>
          <div className="reg-inputfield">
            <label>Email Address</label>
            <input
              type="text"
              className="reg-input"
              name="regEmailAddress"
              value={regFormData.regEmailAddress}
              onChange={handleRegChange}
              required
            />
          </div>
          <div className="reg-inputfield">
            <label>Phone Number</label>
            <input
              type="text"
              className="reg-input"
              name="regPhoneNumber"
              value={regFormData.regPhoneNumber}
              onChange={handleRegChange}
            />
          </div>
          <div className="reg-inputfield">
            <label>Address</label>
            <textarea
              className="reg-textarea"
              name="regAddress"
              value={regFormData.regAddress}
              onChange={handleRegChange}
              required
            ></textarea>
          </div>
          <div className="reg-inputfield">
            <label>Postal Code</label>
            <input
              type="text"
              className="reg-input"
              name="regPostalCode"
              value={regFormData.regPostalCode}
              onChange={handleRegChange}
              required
            />
          </div>
          <div className="reg-inputfield reg-terms">
            <label className="reg-check">
              <input
                type="checkbox"
                name="regAgreedToTerms"
                checked={regFormData.regAgreedToTerms}
                onChange={handleRegChange}
                required
              />
              <span className="reg-checkmark"></span>
            </label>
            <p>Agreed to terms and conditions</p>
          </div>
          <div className="reg-inputfield">
            <input type="submit" value="Register" className="reg-btn" />
          </div>
        </form>
      </div>
    </body>
  );
};

export default AgentRegistrationForm;
