import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../../src/Component/AdminDashboard.css';
import AddPackage from '../../src/Component/AddPackage';
import PackageCard from '../../src/Component/PackageCard';
import MyPackage from '../../src/Component/MyPackage'; 

const AgentDashboard = () => {
  const [showAddPackages, setShowAddPackages] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showModifyPackages, setShowModifyPackages] = useState(false);

  const handleAddPackagesClick = () => {
    setShowAddPackages(true);
    setShowModifyPackages(false);
  };

  const handleAddPackageSubmit = () => {
    setShowSuccessMessage(true);
  };

  const handleModifyPackagesClick = () => {
    setShowModifyPackages(true);
    setShowAddPackages(false);
  };

  return (
    <>
      <input type="checkbox" id="menu-toggle" />
      <div className="sidebar">
        <div className="side-header">
          <i className="fas fa-user"></i>
          <h3>A<span>GENT</span></h3>
        </div>

        <div className="side-content">
          {/* Sidebar Content */}
          {/* ... */}
          <div className="side-menu">
            <ul>
              <li>
                <a href="" className="active">
                  <span className="fas fa-user-alt"></span>
                  <small>Profile</small>
                </a>
              </li>
              <li>
                <br></br>
                <a href="" >
                  <span className="fas fa-clipboard-list"></span>
                  <small color='=white'>My Packages</small>
                </a>
              </li>
              <li>
                <br></br>
                <a href="#" onClick={handleAddPackagesClick} >
                  <span className="fas fa-shopping-cart"></span>
                  <small>New Packages</small>
                </a>
              </li>
              <li>
                <br></br>
                <a href="#" onClick={handleModifyPackagesClick} className={showModifyPackages ? 'active' : ''}>
                  <span className="fas fa-tasks"></span>
                  <small>Modify Packages</small>
                </a>
              </li>
              <br></br>
              <li>
                <br/>
                <a href="/LogoutAgent" className='active'>
                  <span className="fas fa-clipboard-list"></span>
                  <small>Logout</small>
                </a>
              </li>
              <br/>
            </ul>
          </div>
        </div>
      </div>
      <div className="main-content">
        {showAddPackages ? (
          <AddPackage onAddPackageSubmit={handleAddPackageSubmit} />
        ) : showModifyPackages ? (
          <PackageCard />
        ) : (
          <MyPackage />
        )}
      </div>
    </>
  );
};

export default AgentDashboard;

