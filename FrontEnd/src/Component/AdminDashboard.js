import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserAlt, faEnvelope, faClipboardList } from '@fortawesome/free-solid-svg-icons';
import PhotoGalleryCard from './PhotoGalleryCard';
import AgentApproval from './AgentApproval'; 
import './AdminDashboard.css'; 

const AdminDashboard = () => {
  const [showPhotoGalleryCard, setShowPhotoGalleryCard] = useState(false);
  const [showAgentApprovalPopup, setShowAgentApprovalPopup] = useState(false); 

  const handlePhotoGalleryClick = () => {
    setShowPhotoGalleryCard(true);
    setShowAgentApprovalPopup(false); 
  };

  const handleAgentApprovalClick = () => {
    setShowAgentApprovalPopup(true);
    setShowPhotoGalleryCard(false); 
  };

  const handleBackToDashboard = () => {
    setShowPhotoGalleryCard(false);
    setShowAgentApprovalPopup(false);
  };

  return (
    <>
      <input type="checkbox" id="menu-toggle" />
      <div className="sidebar">
        <div className="side-header">
          <i className="fas fa-user"></i>
          <h3>A<span>DMIN</span></h3>
        </div>
        <div className="side-content">
          <div className="side-menu">
            <ul>
              <li>
                <a href="#" className="active" onClick={handleAgentApprovalClick}>
                  <span className="fas fa-user-alt"></span>
                  <small>Agent Approvals</small>
                </a>
              </li>
              <li>
                <br/>
                <a href="#" className='active' onClick={handlePhotoGalleryClick}>
                  <span className="fas fa-clipboard-list"></span>
                  <small>Access Gallery</small>
                </a>
              </li>
              <br/>
              <li>
                <br/>
                <a href="/LogoutAdmin" className='active'>
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
        {showPhotoGalleryCard || showAgentApprovalPopup ? (
          <div className="popup-container">
            <div className="popup">
              <button className="close-button" onClick={handleBackToDashboard}>
                <span className="fas fa-times"></span>
              </button>
              {showPhotoGalleryCard ? <PhotoGalleryCard /> : null}
              {showAgentApprovalPopup ? <AgentApproval /> : null}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default AdminDashboard;
