import React, { useState } from 'react';
import { Box, Button, Typography, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';

function AddPhoto({ onClose }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showSnackbar, setShowSnackbar] = useState(false);

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!selectedImage) {
      console.error('Please select an image.');
      return;
    }

    const formData = new FormData();
    formData.append('imageFile', selectedImage);

    try {
      const response = await axios.post('https://localhost:7111/api/Gallery', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setShowSnackbar(true); 
      } else {
     
        console.error('Failed to upload photo. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setShowSnackbar(false);
  };

  return (
    <Box>
      <Box sx={{ width: '90%' }}>
        <Typography sx={{ fontSize: '20px', fontWeight: '500' }}>Upload Photo</Typography>
        <Box sx={{ marginTop: '2%' }}>
          <input type="file" onChange={handleImageChange} />
        </Box>
      </Box>

      <form onSubmit={handleFormSubmit}>
\
        <Button type="submit" variant="contained" color="primary">
          Upload Photo
        </Button>
      </form>


      <Snackbar open={showSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <MuiAlert onClose={handleCloseSnackbar} severity="success" variant="filled">
          Photo Uploaded Successfully
        </MuiAlert>
      </Snackbar>
    </Box>
  );
}

export default AddPhoto;