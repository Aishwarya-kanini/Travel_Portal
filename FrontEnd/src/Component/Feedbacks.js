import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from '@mui/material/Slider';
import Typography from '@mui/material/Typography';

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Fetch feedbacks from the API
    axios
      .get('https://localhost:7125/api/FeedBacks') // Replace this with the actual API endpoint
      .then((response) => {
        setFeedbacks(response.data);
      })
      .catch((error) => {
        console.error('Error fetching feedbacks:', error);
      });
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom>
        Feedback Slider
      </Typography>
      <Slider
        aria-label="Feedback Slider"
        defaultValue={0}
        step={1}
        marks
        min={0}
        max={5}
        valueLabelDisplay="auto"
      />
      {feedbacks.map((feedback) => (
        <div key={feedback.FeedBack_id}>
          {/* Display the feedback details here */}
          <p>Feedback Area: {feedback.FeedBack_area}</p>
          <p>Rating: {feedback.FeedBack_rating}</p>
          {/* Display user and agency details if needed */}
          {/* <p>User: {feedback.user.name}</p>
          <p>Agency: {feedback.agency.name}</p> */}
        </div>
      ))}
    </div>
  );
};

export default Feedback;
