import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '@mui/material/Modal';
import { Box, Button, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material';

import backgroundImage from '../../src/images/t5.jpg'; 

const ChooseLogin = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(true);
    const [selectedValue, setSelectedValue] = useState('');

    const handleRadioChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleLogin = () => {
        if (selectedValue === 'admin') {
            navigate('/AdminLogin');
        } else if (selectedValue === 'agent') {
            navigate('/AgentLogin');
        } else if (selectedValue === 'user') {
            navigate('/UserLogin');
        }
    };

    useEffect(() => {
        if (selectedValue) {
            handleLogin();
        }
    }, [selectedValue]);

    return (
        <div
            style={{
                backgroundImage: `url(${backgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Modal open={modalOpen}>
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        border: '2px ',
                        boxShadow: 24,
                        p: 2,
                        width: '300px', 
                        textAlign: 'center',
                        borderRadius: '10px',
                    }}
                >
                    <Typography variant="h5" component="h2" gutterBottom>
                        Choose Login
                    </Typography>
                    <FormControl component="fieldset">
                        <RadioGroup
                            aria-label="loginType"
                            name="loginType"
                            value={selectedValue}
                            onChange={handleRadioChange}
                        >
                            <FormControlLabel value="admin" control={<Radio />} label="Admin" />
                            <FormControlLabel value="agent" control={<Radio />} label="Agent" />
                            <FormControlLabel value="user" control={<Radio />} label="User" />
                        </RadioGroup>
                    </FormControl>
                    <br></br><br></br>
                    <Button variant="contained" color="success" onClick={handleLogin}>
                        Login<br></br>
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default ChooseLogin;
