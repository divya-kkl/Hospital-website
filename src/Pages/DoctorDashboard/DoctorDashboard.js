import React, { useState, useEffect } from 'react';
import { supabase } from '../../Supabase';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUserMd, FaSignOutAlt, FaBars, FaCalendarCheck, FaUsers } from 'react-icons/fa';
import DoctorSchedule from './DoctorSchedule';
import AppointmentManagement from './AppointmentManagement';
import PatientsList from './PatientsList';
import './DoctorDashboard.css';
import log from '../../assets/log.png';

function DoctorDashboard() {
  const [activeTab, setActiveTab] = useState('appointments');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/doctor'); 
      } else {
        let isDoctor = session.user.user_metadata?.role === 'doctor';
        
        // Fallback for older doctor accounts without the role metadata
        if (!isDoctor) {
           const { data: doctorData } = await supabase
             .from('doctor_users')
             .select('email')
             .eq('email', session.user.email)
             .single();
             
           if (doctorData) {
             isDoctor = true;
           }
        }

        if (!isDoctor) {
          navigate('/profile'); 
        } else {
          setUser(session.user);
        }
      }
    };
    checkUser();
  }, [navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/doctor');
  };

  return (
    <div className="doctor-dashboard-container">
      {/* Mobile Header */}
      <div className="doctor-mobile-header">
        <img src={log} alt="Logo" className="doctor-logo" />
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="doctor-menu-btn">
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`doctor-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <img src={log} alt="Logo" />
        </div>
        <div className="sidebar-user">
          <p>Welcome,</p>
          <h4>{user?.user_metadata?.full_name || 'Doctor'}</h4>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li 
              className={activeTab === 'dashboard' ? 'active' : ''}
              onClick={() => { setActiveTab('dashboard'); setIsMobileMenuOpen(false); }}
            >
              <FaUserMd className="sidebar-icon" /> Dashboard Overview
            </li>
            <li 
              className={activeTab === 'schedule' ? 'active' : ''}
              onClick={() => { setActiveTab('schedule'); setIsMobileMenuOpen(false); }}
            >
              <FaCalendarAlt className="sidebar-icon" /> Doctor Schedule
            </li>
            <li 
              className={activeTab === 'appointments' ? 'active' : ''}
              onClick={() => { setActiveTab('appointments'); setIsMobileMenuOpen(false); }}
            >
              <FaCalendarCheck className="sidebar-icon" /> Appointments
            </li>
            <li 
              className={activeTab === 'patients' ? 'active' : ''}
              onClick={() => { setActiveTab('patients'); setIsMobileMenuOpen(false); }}
            >
              <FaUsers className="sidebar-icon" /> Patients List
            </li>
          </ul>
        </nav>

        <div className="sidebar-logout">
          <button onClick={handleLogout}>
            <FaSignOutAlt className="sidebar-icon" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="doctor-main-content">
        <div className="doctor-content-wrapper">
            {activeTab === 'dashboard' && (
              <div className="dashboard-placeholder">
                <h2>Doctor Dashboard</h2>
                <p>Welcome to the doctor panel. Select "Doctor Schedule" from the sidebar to set your working hours.</p>
              </div>
            )}
            
            {activeTab === 'schedule' && (
              <DoctorSchedule user={user} />
            )}
            
            {activeTab === 'appointments' && (
              <AppointmentManagement user={user} />
            )}

            {activeTab === 'patients' && (
              <PatientsList user={user} />
            )}
        </div>
      </main>
      
      {isMobileMenuOpen && <div className="doctor-sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}
    </div>
  );
}

export default DoctorDashboard;
