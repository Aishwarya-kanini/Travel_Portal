import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import jwt_decode from 'jwt-decode';

function Protected(props) {
  const { Component } = props;
  const navigate = useNavigate();
  
  useEffect(() => {
    let token = localStorage.getItem('jwttoken');
    if (!token) {
      navigate('/');
    } else {
      let decodedToken = decodeToken(token);
      let role = decodedToken.role;
      openComponentByRole(role);
    }
  }, [navigate]);

  const decodeToken = (token) => {
    const decodedToken = jwt_decode(token);
    const role =
      decodedToken[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ];
    return { role };
  };

  const openComponentByRole = (role) => {
    switch (role) {
      case 'Admin':
        navigate('/AdminDashboard');
        break;
      case 'Agent':
        navigate('/AgentDashboard');
        break;
      case 'User':
        navigate('/UserView');
        break;
      default:
        navigate('/Travel');
        break;
    }
  };

  return <div>
    <Component />
  </div>;
}

export default Protected;