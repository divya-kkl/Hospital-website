import React, { useState, useEffect } from 'react';
import { supabase } from '../../Supabase';
import { useNavigate } from 'react-router-dom';
import './Profile.css';
import { FaCalendarCheck, FaHospital, FaClock, FaStethoscope } from 'react-icons/fa';

function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const navigate = useNavigate();

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    dob: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session && session.user) {


          // If the user is an admin, redirect them to the admin dashboard
          if (session.user.user_metadata?.role === 'admin') {
            navigate('/admin-dashboard');
            return;
          }

          const email = session.user.email;
          
          const { data: profileResult, error: profileError } = await supabase
            .from('register')
            .select('*')
            .eq('email', email)
            .single();

          if (profileError && profileError.code !== 'PGRST116') {
             console.error("Error fetching profile:", profileError);
          }
          
          if (profileResult) {
             setProfileData(profileResult);
             setFormData({
               name: profileResult.name || '',
               email: profileResult.email || '',
               dob: profileResult.dob || '',
               phone: profileResult.phone || '',
               address: profileResult.address || ''
             });
          } else {
             const defaultName = session.user.user_metadata?.full_name || '';
             setProfileData({ name: defaultName, email: email });
             setFormData(prev => ({ ...prev, name: defaultName, email: email }));
          }

          
          const { data: aptData, error: aptError } = await supabase
            .from('appointments')
            .select('*')
            .eq('email_address', email)
            .order('created_at', { ascending: false });

          if (aptError) {
             console.error("Error fetching appointments:", aptError);
          }
          
          if (aptData) {
             setAppointments(aptData);
          }
        }
      } catch (err) {
        console.error("Data fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return <div className="profile-loading">Loading Dashboard...</div>;
  }

  if (!profileData) {
    return <div className="profile-error">Please log in to view your dashboard.</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar">
        <ul className="sidebar-menu">
          <li 
            className={activeTab === 'appointments' ? 'active' : ''} 
            onClick={() => setActiveTab('appointments')}
          >
            Appointments
          </li>
          <li 
            className={activeTab === 'profile' ? 'active' : ''} 
            onClick={() => setActiveTab('profile')}
          >
            Profile
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="dashboard-main">
        {activeTab === 'profile' && (
          <div className="profile-details-section">
            <div className="simple-profile-card">
              <div className="simple-profile-header">
                <h3>{(formData.name || formData.email).toUpperCase()}</h3>
              </div>
              <div className="simple-profile-row">
                <span className="row-label">Name</span>
                <span className="row-value">{formData.name || '-'}</span>
              </div>
              <div className="simple-profile-row">
                <span className="row-label">Email</span>
                <span className="row-value">{formData.email}</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="appointments-section">
            <h2 className="section-title">Appointments</h2>

            <div className="appointments-list">
              {appointments.length === 0 ? (
                <div className="no-appointments">
                  <FaCalendarCheck className="empty-icon" />
                  <h3>No Appointments Found</h3>
                  <p>You haven't booked any appointments yet.</p>
                </div>
              ) : (
                appointments.map((apt) => (
                  <div key={apt.id} className="appointment-card">
                    <div className="apt-status-bar"></div>
                    <div className="apt-content">
                      <div className="apt-header">
                        <h3>{apt.service || 'General Consultation'}</h3>
                        <div style={{ display: 'flex', gap: '10px' }}>
                          <span className="apt-type-badge">{apt.appointment_type || 'Clinic'}</span>
                          <span className={`apt-status-badge ${apt.status || 'pending'}`}>
                             {apt.status || 'pending'}
                          </span>
                        </div>
                      </div>
                      
                      <div className="apt-details-grid">
                        <div className="apt-detail-item">
                          <FaCalendarCheck className="apt-icon" />
                          <div>
                            <span className="apt-label">Date</span>
                            <span className="apt-value">{apt.appointment_date}</span>
                          </div>
                        </div>
                    
                        <div className="apt-detail-item">
                          <FaClock className="apt-icon" />
                          <div>
                            <span className="apt-label">Time</span>
                            <span className="apt-value">{apt.appointment_time}</span>
                          </div>
                        </div>
                        <div className="apt-detail-item">
                          <FaHospital className="apt-icon" />
                          <div>
                            <span className="apt-label">Clinic</span>
                            <span className="apt-value">{apt.clinic_name || 'Not specified'}</span>
                          </div>
                        </div>
                        <div className="apt-detail-item">
                          <FaStethoscope className="apt-icon" />
                          <div>
                            <span className="apt-label">Patient</span>
                            <span className="apt-value">{apt.patient_name || `${apt.first_name || ''} ${apt.last_name || ''}`.trim() || 'Unknown'}</span>
                          </div>
                        </div>
                      </div>
                      
                      {apt.reason_for_visit && (
                         <div className="apt-reason">
                           <span className="apt-label">Reason for Visit:</span>
                           <p>{apt.reason_for_visit}</p>
                         </div>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
