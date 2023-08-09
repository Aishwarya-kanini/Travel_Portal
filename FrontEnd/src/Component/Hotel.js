import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia'; 
import Typography from '@mui/material/Typography';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';
import HotelService from './HotelService'; 
import Navbar from "../../src/Component/Navbar";
import Header from "../../src/Component/Header";
import MailList from "../../src/Component/MailList";
import Footer from "../../src/Component/Footer";

export default function Hotel() {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {

    axios
      .get('https://localhost:7134/api/Hotel') 
      .then((response) => {
        console.log(response.data); 
        setHotels(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <Navbar />
      <Header type="list" />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        {/* Add style to center the carousel */}
        <Carousel showThumbs={false} infiniteLoop={true} autoPlay={true}>
          {hotels.map((hotel) => (
            <Card key={hotel.id} sx={{ maxWidth: 1000, backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', height: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center',marginLeft:'120px',marginRight:'20px' }}>
              {hotel.hotelimage ? (
                <CardMedia
                component="img"
                height="300"
                image={hotel.hotelimage ? `https://localhost:7134/uploads/hotels/${hotel.hotelimage}` :''}
                title={hotel.name}
                sx={{ backgroundColor: 'rgb(236, 236, 236)', borderRadius: '8px 8px 0 0', transition: 'transform 0.002s ease', '&:hover': { transform: 'scale(0.98)' } }}
              />
              ) : (
                <div style={{ height: 140, backgroundColor: 'rgb(236, 236, 236)', borderRadius: '8px 8px 0 0' }} />
              )}
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {hotel.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Address: {hotel.address}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  City: {hotel.city}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ratings: {hotel.ratings}
                </Typography>
                {/* Add more content as needed */}
              </CardContent>
            </Card>
          ))}
        </Carousel>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px', backgroundColor: '#f5f5f5', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ flex: 1, marginRight: '16px' }}>
          <h1 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Stay in the heart of City</h1>
          <p style={{ fontSize: '1rem', color: '#666' }}>
            Located a 5-minute walk from St. Florian's Gate in Krakow, Tower
            Street Apartments has accommodations with air conditioning and
            free WiFi. The units come with hardwood floors and feature a
            fully equipped kitchenette with a microwave, a flat-screen TV,
            and a private bathroom with shower and a hairdryer. A fridge is
            also offered, as well as an electric tea pot and a coffee
            machine. Popular points of interest near the apartment include
            Cloth Hall, Main Market Square and Town Hall Tower. The nearest
            airport is John Paul II International Kraków–Balice, 16.1 km
            from Tower Street Apartments, and the property offers a paid
            airport shuttle service.
          </p>
        </div>
        <div style={{ textAlign: 'center', marginLeft: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '16px', backgroundColor: '#fff', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <h1>Perfect for stay!</h1>
          <span style={{ backgroundColor: '#f5f5f5', padding: '16px', marginBottom: '16px' }}>
            Located in the real heart of Krakow, this property has an
            excellent location score of 4.5!
          </span>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>
            <b>5000Rs</b> (5 nights)
          </h2>
          <button style={{ backgroundColor: '#1976D2', color: '#fff', padding: '8px 24px', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s', outline: 'none' }}>Reserve or Book Now!</button>
        </div>
      </div>
      <MailList />
      <Footer />
    </div>
  );
}
