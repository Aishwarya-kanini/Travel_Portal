import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TravelWebsite from '../src/Component/Travel';
import ChooseLogin from '../src/Component/ChooseLogin';
import Home from '../src/Component/Home';
import Hotel from '../src/Component/Hotel';
import List from '../src/Component/List';
import LoginForm from './Component/UserLoginForm';
import AdminDashboard from '../src/Component/AdminDashboard';
import AgentDashboard from '../src/Component/AgentDashboard';
import AddPackage from './Component/AddPackage';
import PhotoGalleryCard from '../src/Component/PhotoGalleryCard';
import AddPhoto from './Component/AddPhoto';
import Feedback from './Component/Feedbacks';
import UserView from './Component/UserView';
import PackageCard from '../src/Component/PackageCard';
import MyPackage from './Component/MyPackage';
import UserGalleryView from './Component/UserGalleryView';
import AgentApproval from './Component/AgentApproval';
import Booking from './Component/Booking';
import Contact from './Component/Contactus';
import BookingForm from './Component/BookingForm';
import AdminLoginForm from './Component/AdminLoginForm';
import AgentLoginForm from './Component/AgentLoginForm';
import UserLoginForm from './Component/UserLoginForm';
import NotFound from './Component/NotFound';
import InvoiceGenerator from './Component/Invoice';
import AdminDashboardProtected from './Component/ProtectedAdminDashboard/AdminDashboardProtected';
import AgentDashboardProtected from '../src/Component/ProtectedAgentDashboard/AgentDashboardProtected';
import LogoutAdmin from './Component/LogoutAdmin';
import LogoutUser from './Component/LogoutUser';
import LogoutAgent from './Component/LogoutAgent';
import AgentRegistrationForm from './Component/AgentRegistrationForm';
import UserRegistrationForm from './Component/UserRegistrationForm';
import UserViewProtected from './Component/ProtectedUserView/UserViewProtected';
function App() {
  const token = localStorage.getItem("token");
  return (
    <Router>
      <div className="app">
        <Routes> 
          <Route path="/" element={<TravelWebsite />} />
          <Route path="/chooselog" element={<ChooseLogin />} />
          <Route path="/home" element={<Home/>}/>
          <Route path="/hotels" element={<List/>}/>
          <Route path="/viewhotels" element={<Hotel/>}/>
          <Route path="/AdminLogin" element={<AdminLoginForm/>}/>
          <Route path="/AgentLogin" element={<AgentLoginForm/>}/>
          <Route path="/UserLogin" element={<UserLoginForm/>}/>
          <Route path='/AdminDashboard' element={<AdminDashboardProtected token={token}><AdminDashboard/></AdminDashboardProtected >}/>
          <Route path='/AgentDashboard' element={<AgentDashboardProtected token={token}><AgentDashboard/></AgentDashboardProtected>}/>
          <Route path="/AddPackage" element={<AddPackage/>}/>
          <Route path="/PackageCard" element={<PackageCard/>}/>
          <Route path="/PhotoGallery" element={<PhotoGalleryCard/>}/>
          <Route path="/AddPhoto" element={<AddPhoto/>}/>
          <Route path='/Feedback' element={<Feedback/>}/>
          <Route path='/UserView' element={<UserViewProtected token={token}><UserView/></UserViewProtected>}/>
          {/* <Route path='/UserView' element={<UserView/>}/> */}
          <Route path="/MyPackage" element={<MyPackage/>}/>
          <Route path='/usergalleryview' element ={<UserGalleryView/>}/>
          <Route path='/approval' element ={<AgentApproval/>}/>
          <Route path='/Booking' element ={<Booking/>}/>
          <Route path='/Contact' element ={<Contact/>}/>  
          <Route path='/BookingForm/:id' element ={<BookingForm/>}/>  
          <Route path='/Invoice' element ={<InvoiceGenerator/>}/> 
          <Route path='/LogoutAdmin' element ={<LogoutAdmin/>}/> 
          <Route path='/LogoutUser' element ={<LogoutUser/>}/> 
          <Route path='/LogoutAgent' element ={<LogoutAgent/>}/> 
          <Route path='/AgentReg' element ={<AgentRegistrationForm/>}/> 
          <Route path='/UserReg' element ={<UserRegistrationForm/>}/> 
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
