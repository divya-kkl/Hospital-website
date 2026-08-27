import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Topheader from './Componenet/Topheader/Topheader';
import Header from './Componenet/Header/Header';
import Footer from './Componenet/Footer/Footer';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import PatientLogin from './Pages/Login/PatientLogin';
import Booking from './Pages/Booking/Booking';
import Profile from './Pages/Profile/Profile';
import DoctorLogin from './Pages/DoctorLogin/DoctorLogin';

import DoctorDashboard from './Pages/DoctorDashboard/DoctorDashboard';
import Doctors from './Pages/Doctors/Doctors';

import AdminLogin from './Pages/AdminLogin/AdminLogin';
import AdminRegister from './Pages/AdminRegister/AdminRegister';
import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';

function AppContent() {
  const location = useLocation();
  const hiddenRoutes = ['/doctor-dashboard', '/register', '/patient-login', '/doctor-login', '/admin-dashboard', '/admin-login', '/admin-register'];
  const showHeaderFooter = !hiddenRoutes.includes(location.pathname);
  const showFooter = showHeaderFooter && location.pathname !== '/booking-page';

  return (
    <div className="App">
      {showHeaderFooter && <Topheader />}
      {showHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/patient-login" element={<PatientLogin />} />
        <Route path="/booking-page" element={<Booking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/doctor-login" element={<DoctorLogin />} />
        <Route path="/doctor" element={<Navigate to="/doctor-login" replace />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
        <Route path="/doctors" element={<Doctors />} />
        
        {/* Admin Routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>

      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
