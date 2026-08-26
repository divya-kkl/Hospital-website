import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import './App.css';
import Topheader from './Componenet/Topheader/Topheader';
import Header from './Componenet/Header/Header';
import Footer from './Componenet/Footer/Footer';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Booking from './Pages/Booking/Booking';
import Profile from './Pages/Profile/Profile';
import AdminLogin from './Pages/AdminLogin/AdminLogin';
import AdminRegister from './Pages/AdminRegister/AdminRegister';

import AdminDashboard from './Pages/AdminDashboard/AdminDashboard';
import Doctors from './Pages/Doctors/Doctors';

function AppContent() {
  const location = useLocation();
  const hiddenRoutes = ['/admin-dashboard', '/register', '/admin-login', '/admin-register'];
  const showHeaderFooter = !hiddenRoutes.includes(location.pathname);
  const showFooter = showHeaderFooter && location.pathname !== '/booking-page';

  return (
    <div className="App">
      {showHeaderFooter && <Topheader />}
      {showHeaderFooter && <Header />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking-page" element={<Booking />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<Navigate to="/admin-login" replace />} />
        <Route path="/admin-register" element={<AdminRegister />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/doctors" element={<Doctors />} />
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
