import React, { useState, useEffect } from 'react';
import { supabase } from '../../Supabase';
import { useNavigate } from 'react-router-dom';
import { FaUserMd, FaSignOutAlt, FaBars, FaCalendarCheck, FaChartPie } from 'react-icons/fa';
import ManageDoctors from './ManageDoctors';
import AllAppointments from './AllAppointments';
import './AdminDashboard.css';
import log from '../../assets/log.png';

import AdminOverview from './AdminOverview';

function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin-login'); 
      } else {
        const role = session.user.user_metadata?.role;
        
        if (role !== 'admin') {
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
    navigate('/admin-login');
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
        <div className="admin-sidebar-logo">
          <img src={log} alt="Logo" />
        </div>
        <div className="admin-sidebar-user">
          <p>Welcome,</p>
          <h4>{user?.user_metadata?.full_name || 'Super Admin'}</h4>
        </div>
        
        <nav className="admin-sidebar-nav">
          <ul>
            <li 
              className={activeTab === 'overview' ? 'active' : ''}
              onClick={() => { setActiveTab('overview'); setIsMobileMenuOpen(false); }}
            >
              <FaChartPie className="admin-sidebar-icon" /> Dashboard
            </li>
            <li 
              className={activeTab === 'doctors' ? 'active' : ''}
              onClick={() => { setActiveTab('doctors'); setIsMobileMenuOpen(false); }}
            >
              <FaUserMd className="admin-sidebar-icon" /> Manage Doctors
            </li>
            <li 
              className={activeTab === 'appointments' ? 'active' : ''}
              onClick={() => { setActiveTab('appointments'); setIsMobileMenuOpen(false); }}
            >
              <FaCalendarCheck className="admin-sidebar-icon" /> All Appointments
            </li>
          </ul>
        </nav>

        <div className="admin-sidebar-logout">
          <button onClick={handleLogout}>
            <FaSignOutAlt className="admin-sidebar-icon" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="admin-main-content">
        <div className="admin-content-wrapper">
            {activeTab === 'overview' && (
              <AdminOverview />
            )}
            
            {activeTab === 'doctors' && (
              <ManageDoctors />
            )}
            
            {activeTab === 'appointments' && (
              <AllAppointments />
            )}
        </div>
      </main>
      
      {isMobileMenuOpen && <div className="admin-sidebar-overlay" onClick={() => setIsMobileMenuOpen(false)}></div>}
    </div>
  );
}

export default AdminDashboard;
