// import React, { useState, useEffect } from 'react';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import CardMedia from '@mui/material/CardMedia';
// import Typography from '@mui/material/Typography';
// import axios from 'axios';

// export default function MyPackage() {
//   const [packages, setPackages] = useState([]);
//   const token =localStorage.getItem('token')

//   useEffect(() => {
//     // Fetch data from the API
//     axios
//       .get('https://localhost:7125/api/Agency',{
//         headers:{
//           Authorization:`Bearer ${token}`
//         }
//       })
//       .then((response) => {
//         setPackages(response.data);
//       })
//       .catch((error) => {
//         console.error('Error fetching data:', error);
//       });
//   }, []);

//   return (
//     <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', justifyContent: 'center' }}>
//       {packages.map((packageData) => (
//         <Card key={packageData.agency_Id} sx={{ maxWidth: 345, backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
//           <CardMedia
//             sx={{ height: 140, backgroundColor: 'rgb(236, 236, 236)', borderRadius: '8px 8px 0 0', transition: 'transform 0.2s ease', '&:hover': { transform: 'scale(0.98)' } }}
//             image={`https://localhost:7125//uploads/images/${packageData.tourImagePath}`}
//             title={packageData.agency_Name}
//           />
//           <CardContent>
//             <Typography gutterBottom variant="h5" component="div">
//               {packageData.agency_Name}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Contact: {packageData.agency_Contact}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Rating: {packageData.agency_Rating}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Number of Days: {packageData.number_Of_Days}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Rate for Day: {packageData.rate_for_day}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Offer for Day: {packageData.offer_For_Day}
//             </Typography>
//             <Typography variant="body2" color="text.secondary">
//               Tour Place: {packageData.tour_place}
//             </Typography>
//           </CardContent>
//         </Card>
//       ))}
//     </div>
//   );
// }

import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import axios from 'axios';

export default function MyPackage() {
  const [packages, setPackages] = useState([]);
  const token = localStorage.getItem('token');
  const name=localStorage.getItem('Name');
  useEffect(() => {
    // Fetch data from the API
    axios
      .get(`https://localhost:7125/api/Agency/GetAgenciesByAgentName/${name}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setPackages(response.data);
      
        console.log(name) 
        console.log(packages);
        const filteredPackages = response.data.filter((packages) =>
          packages.agentRegister.agent_Name === name
        );
        setPackages(filteredPackages);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, [token]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', justifyContent: 'center' }}>
      {packages.map((packageData) => (
        <Card key={packageData.agency_Id} sx={{ maxWidth: 345, backgroundColor: 'white', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)' }}>
          <CardMedia
            sx={{ height: 140, backgroundColor: 'rgb(236, 236, 236)', borderRadius: '8px 8px 0 0', transition: 'transform 0.2s ease', '&:hover': { transform: 'scale(0.98)' } }}
            image={`https://localhost:7125/uploads/images/${packageData.tourImagePath}`}
            title={packageData.agency_Name}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {packageData.agency_Name}
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
    </div>
  );
}
