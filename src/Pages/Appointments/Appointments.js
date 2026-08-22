import React, { useState, useEffect } from 'react';
import { supabase } from '../../Supabase';
import './Appointments.css';
import { FaCalendarCheck, FaHospital, FaClock, FaStethoscope } from 'react-icons/fa';

function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session && session.user) {
          const email = session.user.email;
          
       
          const { data, error } = await supabase
            .from('appointments')
            .select('*')
            .eq('email_address', email)
            .order('created_at', { ascending: false });

          if (error) {
             console.error("Error fetching appointments:", error);
          }
          
          if (data) {
             setAppointments(data);
          }
        }
      } catch (err) {
        console.error("Appointments fetch error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  if (loading) {
    return <div className="appointments-loading">Loading Appointments...</div>;
  }

  return (
    <div className="appointments-page-container">
      <div className="appointments-header">
        <h2>My Appointments</h2>
        <p>View and manage all your upcoming and past appointments.</p>
      </div>

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
                  <span className="apt-type-badge">{apt.appointment_type || 'Clinic'}</span>
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
  );
}

export default Appointments;
