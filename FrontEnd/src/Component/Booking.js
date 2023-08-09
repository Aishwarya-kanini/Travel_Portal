
import React, { useState,useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import AdbIcon from '@mui/icons-material/Adb';
import PriceDownIcon from '@mui/icons-material/ArrowDropDown';
import PriceUpIcon from '@mui/icons-material/ArrowDropUp';
import axios from 'axios';

const pages = ['Search'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
const token = localStorage.getItem('token');

function Booking() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [showSearchBoxes, setShowSearchBoxes] = useState(false);
  const [packages, setPackages] = useState([]);
  const [ratingSearch, setRatingSearch] = useState('');
  const [priceSearch, setPriceSearch] = useState('');
  const [noResultsModalOpen, setNoResultsModalOpen] = useState(false);
  useEffect(() => {
    if (packages.length === 0) {
      setNoResultsModalOpen(true);
    } else {
      setNoResultsModalOpen(false);
    }
  }, [packages]);
  

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleToggleSearchBoxes = () => {
    setShowSearchBoxes(!showSearchBoxes);
  };

  const handleRatingSearch = async () => {
    try {
      const response = await axios.get(`https://localhost:7125/api/Agency/filterByRating/${ratingSearch}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPackages(response.data);
    } catch (error) {
      console.error('Error while searching by rating:', error);
    }
  };

  const handlePriceSearch = async () => {
    try {
      const response = await axios.get(`https://localhost:7125/api/Agency/filterByRatePerDay/${priceSearch}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPackages(response.data);
    } catch (error) {
      console.error('Error while searching by price:', error);
    }
  };

  const handleSortByPriceHighToLow = () => {
    const sortedPackages = [...packages].sort((a, b) => b.rate_for_day - a.rate_for_day);
    setPackages(sortedPackages);
  };

  const handleSortByPriceLowToHigh = () => {
    const sortedPackages = [...packages].sort((a, b) => a.rate_for_day - b.rate_for_day);
    setPackages(sortedPackages);
  };

  return (
    <div>
         <AppBar position="static" sx={{ backgroundColor: 'orange' }}>
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component={RouterLink}
            to="/"
            sx={{
              flexGrow: 1,
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
            }}
          >
            {/* Your App Logo or Title */}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              placeholder="Search by Rating"
              variant="outlined"
              size="small"
              value={ratingSearch}
              onChange={(e) => {
                setRatingSearch(e.target.value);
                handleRatingSearch();
              }}
              sx={{ mr: 2, backgroundColor: 'white' }}
            />
            <TextField
              placeholder="Search by Price"
              variant="outlined"
              size="small"
              value={priceSearch}
              onChange={(e) => {
                setPriceSearch(e.target.value);
                handlePriceSearch();
              }}
              sx={{ mr: 2, backgroundColor: 'white' }}
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="User Avatar" src="/static/images/avatar.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          backgroundImage: `url(${require('../../src/images/b.jpg')})`,
          backgroundSize: 'cover',
          minHeight: 'calc(100vh - 54px)', 
          paddingTop: '64px', // 
        }}
      >
        <IconButton onClick={handleSortByPriceHighToLow} sx={{ p: 0 }}>
          <PriceDownIcon />
        </IconButton>
        <IconButton onClick={handleSortByPriceLowToHigh} sx={{ p: 0 }}>
          <PriceUpIcon />
        </IconButton>
        <Container maxWidth="xl">
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              gap: '16px',
              mt: 2,
            }}
          >
            {packages.map((packageData) => (
              <Card
                key={packageData.agency_Id}
                sx={{
                  width: 'calc(33.33% - 16px)',
                  backgroundColor: 'white',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                  transition: 'transform 0.2s ease',
                  '&:hover': { transform: 'scale(1.02)' },
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <CardMedia
                  sx={{
                    height: 140,
                    backgroundColor: 'rgb(236, 236, 236)',
                    borderRadius: '8px 8px 0 0',
                  }}
                  image={`https://localhost:7125/uploads/images/${packageData.tourImagePath}`}
                  title={packageData.agency_Name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="div">
                    <a href={`/BookingForm/${packageData.agency_Id}`}>Click here to book</a>
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Contact: {packageData.agency_Contact}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rating: {packageData.agency_Rating}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Number of Days: {packageData.number_Of_Days}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Rate for Day: {packageData.rate_for_day}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Offer for Day: {packageData.offer_For_Day}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tour Place: {packageData.tour_place}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>
    </div>
  );
}

export default Booking;
