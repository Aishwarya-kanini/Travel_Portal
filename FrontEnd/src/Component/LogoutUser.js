import React, { useEffect } from 'react'
import { useNavigate, Link } from "react-router-dom";


function LogoutAdmin() {
    const navigate = useNavigate()
    useEffect(() => {
        localStorage.clear();
        navigate('/chooselog')},[navigate])

  return (
    <div>Logout</div>
  )
}

export default LogoutAdmin