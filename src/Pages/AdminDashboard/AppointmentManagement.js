import React, { useState, useEffect } from 'react';
import { supabase } from '../../Supabase';
import { FaCheckCircle, FaTimesCircle, FaClock, FaCalendarDay } from 'react-icons/fa';
import './AppointmentManagement.css';

function AppointmentManagement({ user }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedAppointment, setSelectedAppointment] = useState(null);

  useEffect(() => {
    fetchAppointments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchAppointments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select('*')
        .eq('doctor_email', user.email)
        .order('id', { ascending: false });

      if (error) throw error;
      setAppointments(data || []);
      
    
      if (data && data.length > 0) {
        setSelectedAppointment(data[0]);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update({ status: newStatus })
        .eq('id', id);

      if (error) throw error;
      
  
      setAppointments(appointments.map(app => 
        app.id === id ? { ...app, status: newStatus } : app
      ));
      
      if (selectedAppointment && selectedAppointment.id === id) {
        setSelectedAppointment({ ...selectedAppointment, status: newStatus });
      }
    } catch (error) {
      alert('Error updating status. Ensure the status column exists in Supabase. ' + error.message);
    }
  };

  const getStatusBadge = (status) => {
    const currentStatus = status || 'Pending';
    let className = 'status-badge ';
    if (currentStatus === 'Accepted') className += 'status-accepted';
    else if (currentStatus === 'Cancelled') className += 'status-cancelled';
    else if (currentStatus === 'Rescheduled') className += 'status-rescheduled';
    else className += 'status-pending';

    return <span className={className}>{currentStatus}</span>;
  };
  
  if (loading) return <div className="appointments-loading">Loading appointments...</div>;

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h2><FaCalendarDay className="header-icon" /> Appointments Management</h2>
        <p>Review patient bookings, accept, reschedule, or cancel them.</p>
      </div>

      <div className="appointments-layout">
        {/* Left Side: List */}
        <div className="appointments-list-container">
          <h3 className="list-title">My Appointments</h3>
          <div className="appointments-list">
            {appointments.length === 0 ? (
              <div className="no-appointments">No appointments found.</div>
            ) : (
              appointments.map(app => (
                <div 
                  key={app.id} 
                  className={`appointment-card ${selectedAppointment?.id === app.id ? 'selected' : ''}`}
                  onClick={() => setSelectedAppointment(app)}
                >
                  <div className="app-card-header">
                    <h4>{app.first_name} {app.last_name}</h4>
                    {getStatusBadge(app.status)}
                  </div>
                  <div className="app-card-body">
                    <p><strong>Date:</strong> {app.appointment_date} at {app.appointment_time}</p>
                    <p><strong>Service:</strong> {app.service}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Side: Details Panel */}
        <div className="appointment-details-container">
          {selectedAppointment ? (
            <div className="appointment-details-panel">
              <div className="details-header">
                <h3>Patient Details</h3>
                {getStatusBadge(selectedAppointment.status)}
              </div>
              
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Patient Name</span>
                  <span className="detail-value">{selectedAppointment.patient_name || `${selectedAppointment.first_name} ${selectedAppointment.last_name}`}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Contact</span>
                  <span className="detail-value">{selectedAppointment.phone_number}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email</span>
                  <span className="detail-value">{selectedAppointment.email_address}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Scheduled For</span>
                  <span className="detail-value">{selectedAppointment.appointment_date} - {selectedAppointment.appointment_time}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Location / Clinic</span>
                  <span className="detail-value">{selectedAppointment.clinic_name}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Type</span>
                  <span className="detail-value">{selectedAppointment.appointment_type}</span>
                </div>
              </div>
              
              <div className="detail-section-full">
                <h4>Symptoms & Reason for Visit</h4>
                <div className="symptoms-box">
                  <p><strong>Symptoms:</strong> {selectedAppointment.symptoms || 'None provided'}</p>
                  <p><strong>Reason:</strong> {selectedAppointment.reason_for_visit || 'None provided'}</p>
                  <p><strong>Extra Service:</strong> {selectedAppointment.additional_service || 'None'}</p>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  className={`btn-action btn-accept ${selectedAppointment.status === 'Accepted' ? 'active' : ''}`}
                  onClick={() => updateStatus(selectedAppointment.id, 'Accepted')}
                >
                  <FaCheckCircle /> Accept
                </button>
                <button 
                  className={`btn-action btn-reschedule ${selectedAppointment.status === 'Rescheduled' ? 'active' : ''}`}
                  onClick={() => updateStatus(selectedAppointment.id, 'Rescheduled')}
                >
                  <FaClock /> Reschedule
                </button>
                <button 
                  className={`btn-action btn-cancel ${selectedAppointment.status === 'Cancelled' ? 'active' : ''}`}
                  onClick={() => updateStatus(selectedAppointment.id, 'Cancelled')}
                >
                  <FaTimesCircle /> Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="no-selection-placeholder">
              <FaCalendarDay className="placeholder-icon" />
              <p>Select an appointment from the list to view details and manage status.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AppointmentManagement;
