import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import './App.css';
import Topheader from './Componenet/Topheader/Topheader';
import Header from './Componenet/Header/Header';
import Footer from './Componenet/Footer/Footer';
import Home from './Pages/Home/Home';
import Register from './Pages/Register/Register';
import Booking from './Pages/Booking/Booking';
import Profile from './Pages/Profile/Profile';

function AppContent() {
  const location = useLocation();
  const showFooter = location.pathname !== '/booking-page';

  return (
    <div className="App">
      <Topheader />
      <Header />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/booking-page" element={<Booking />} />
        <Route path="/profile" element={<Profile />} />
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
