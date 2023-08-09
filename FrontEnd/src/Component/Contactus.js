import React, { useState } from 'react';
import emailjs from 'emailjs-com';
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  Paper,
  Modal,
} from '@mui/material';

import backgroundImage from '../../src/images/tquote.jpg'; 

export default function Contact() {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const sendEmail = async (e) => {
    e.preventDefault();

    const name = e.target.elements.name.value;
    const email = e.target.elements.email.value;
    const message = e.target.elements.message.value;

    if (!name || !email || !message) {
      alert('Please fill in all the fields before sending the message');
      return;
    }

    try {
      const emailParams = {
        service_id: 'service_gsrrhql',
        template_id: 'template_6hxw8r1',
        user_id: 'aUoOjnwv9KiKw6FZp',
        template_params: {
          to_email: 'aishwarya3017@gmail.com',
          from_name: name,
          from_email: email,
          message: message,
        },
      };

      await emailjs.send(
        emailParams.service_id,
        emailParams.template_id,
        emailParams.template_params,
        emailParams.user_id
      );

      setIsEmailSent(true);
      handleModalOpen();
    } catch (error) {
      console.error('Error sending email', error);
      alert('Error sending email. Please try again later.');
    }
  };

  const containerStyle = {
    background: `url(${backgroundImage}) no-repeat center center fixed`,
    backgroundSize: 'cover',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const formContainerStyle = {
    padding: '2rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Add a semi-transparent white background
    borderRadius: '10px',
    boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
  };

  return (
    <div style={containerStyle}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={formContainerStyle}>
          <form onSubmit={sendEmail}>
            <Typography variant="h4" align="center" gutterBottom>
              Feedback Form
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Name"
                  name="name"
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Your Email"
                  name="email"
                  variant="outlined"
                  type="email"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Your Message"
                  name="message"
                  variant="outlined"
                  multiline
                  rows={4}
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ backgroundColor: 'green', color: 'white', marginTop: '1rem' }} // Change color to green
                  fullWidth
                >
                  Send Message
                </Button>
              </Grid>
            </Grid>
          </form>
          {isEmailSent && (
            <Modal key="modal" open={isModalOpen} onClose={handleModalClose}>
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: 'white',
                  padding: '2rem',
                  borderRadius: '5px',
                  boxShadow: '0px 2px 10px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography variant="body1" align="center" color="green">
                  Your feedback is valuable. Sent to the agency. Thank you!
                </Typography>
              </div>
            </Modal>
          )}
        </Paper>
      </Container>
    </div>
  );
}
