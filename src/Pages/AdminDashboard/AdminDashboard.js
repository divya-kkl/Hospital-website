import React, { useState, useEffect } from 'react';
import { supabase } from '../../Supabase';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUserMd, FaSignOutAlt, FaBars, FaCalendarCheck } from 'react-icons/fa';
import DoctorSchedule from './DoctorSchedule';
import AppointmentManagement from './AppointmentManagement';
import './AdminDashboard.css';
import log from '../../assets/log.png';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('appointments');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin'); 
      } else {
        let isAdmin = session.user.user_metadata?.role === 'admin';
        
        // Fallback for older admin accounts without the role metadata
        if (!isAdmin) {
           const { data: adminData } = await supabase
             .from('admin_users')
             .select('email')
             .eq('email', session.user.email)
             .single();
             
           if (adminData) {
             isAdmin = true;
           }
        }

        if (!isAdmin) {
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
    navigate('/admin');
  };

  return (
    <div className="admin-dashboard-container">
      {/* Mobile Header */}
      <div className="admin-mobile-header">
        <img src={log} alt="Logo" className="admin-logo" />
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="admin-menu-btn">
          <FaBars />
        </button>
      </div>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
          <img src={log} alt="Logo" />
        </div>
        <div className="sidebar-user">
          <p>Welcome,</p>
          <h4>{user?.user_metadata?.full_name || 'Admin'}</h4>
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
          </ul>
        </nav>

        <div className="sidebar-logout">
          <button onClick={handleLogout}>
            <FaSignOutAlt className="sidebar-icon" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main-content">
        <div className="admin-content-wrapper">
            {activeTab === 'dashboard' && (
              <div className="dashboard-placeholder">
                <h2>Admin Dashboard</h2>
                <p>Welcome to the admin panel. Select "Doctor Schedule" from the sidebar to set your working hours.</p>
              </div>
            )}
            
            {activeTab === 'schedule' && (
              <DoctorSchedule user={user} />
            )}
            
            {activeTab === 'appointments' && (
              <AppointmentManagement user={user} />
            )}
        </div>
      </main>
      
      {isMobileMenuOpen && <div className="admin-sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}
    </div>
  );
}

export default AdminDashboard;
