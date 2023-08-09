import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Button, Modal } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHotel, faListAlt, faPhotoVideo, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import blog2 from '../../src/images/blog2.jpg';
import blog3 from '../../src/images/blog3.jpg';
import footer from '../../src/images/footer.jpg';
import video from '../../src/images/tourism.mp4';
import UserGalleryView from './UserGalleryView';

const UserView = () => {
  const [bgImageIndex, setBgImageIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  const backgroundImages = [
    `url(${blog2})`,
    `url(${footer})`,
    `url(${blog3})`,
    // Add more image paths here
  ];

  const handleChangeBackground = () => {
    setBgImageIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
  };

  useEffect(() => {
    const interval = setInterval(handleChangeBackground, 2000);
    return () => clearInterval(interval);
  }, []);

  const navigate = useNavigate();

  const handleNavbarOptionClick = (destination) => {
    setIsModalOpen(true);
    setTimeout(() => {
      setIsModalOpen(false);

      navigate(destination);
    }, 2000);
  };

  const handlePlayVideo = () => {
    setIsVideoOpen(true);
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
  };

  const handleGalleryOpen = () => {
    setIsGalleryOpen(true);
  };

  const handleGalleryClose = () => {
    setIsGalleryOpen(false);
  };

  const handleLogout = () => {
    navigate('/UserLogin');
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      <div>
        <AppBar position="static" style={{ background: 'orange' }}>
          <Toolbar>
            <Button color="inherit" onClick={() => handleNavbarOptionClick('/booking')}>
              <FontAwesomeIcon icon={faSearch} /> Search
            </Button>
            <Button color="inherit" onClick={() => handleNavbarOptionClick('/viewhotels')}>
              <FontAwesomeIcon icon={faHotel} /> View Hotels
            </Button>
            <Button color="inherit" onClick={() => handleNavbarOptionClick('/Contact')}>
              <FontAwesomeIcon icon={faListAlt} /> Feedback
            </Button>
            <Button color="inherit" onClick={handleGalleryOpen}>
              <FontAwesomeIcon icon={faPhotoVideo} /> View Gallery
            </Button>
            <br></br>
            <a href="#" onClick={handleLogout} style={{ color: 'inherit', textDecoration: 'none' }}>
              Logout
            </a>
          </Toolbar>
        </AppBar>

        <Modal open={isModalOpen}>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Typography variant="h4">Loading...</Typography>
          </div>
        </Modal>

        <Modal open={isVideoOpen} onClose={handleCloseVideo}>
          <video autoPlay controls style={{ width: '100%', height: '100%', outline: 'none' }}>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Modal>
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        <video autoPlay controls style={{ width: '100%', outline: 'none' }}>
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      <footer className="footer-area" style={{ backgroundImage: `url(${footer})`, backgroundSize: 'cover', backgroundRepeat: 'no-repeat', position: 'absolute', bottom: 0, left: 0, width: '100%' }}>
      </footer>

      <Modal open={isGalleryOpen} onClose={handleGalleryClose}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <UserGalleryView />
        </div>
      </Modal>
    </div>
  );
};

export default UserView;

