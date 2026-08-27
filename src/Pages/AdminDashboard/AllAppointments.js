import React, { useState, useEffect } from 'react';
import { supabase } from '../../Supabase';

function AllAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchDate, setSearchDate] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data, error } = await supabase
          .from('appointments')
          .select('*')
          .order('appointment_date', { ascending: false });

        if (error) throw error;
        setAppointments(data || []);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const filteredAppointments = appointments.filter(app => {
    let dateMatch = true;
    let textMatch = true;

    if (searchDate) {
      const appDate = new Date(app.appointment_date);
      const filterDate = new Date(searchDate);
      if (!isNaN(appDate.getTime()) && !isNaN(filterDate.getTime())) {
        dateMatch = appDate.getFullYear() === filterDate.getFullYear() &&
                    appDate.getMonth() === filterDate.getMonth() &&
                    appDate.getDate() === filterDate.getDate();
      }
    }

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const patientName = `${app.first_name || ''} ${app.last_name || ''}`.toLowerCase();
      const docEmail = (app.doctor_email || '').toLowerCase();
      const service = (app.service || '').toLowerCase();
      const status = (app.status || '').toLowerCase();
      
      textMatch = patientName.includes(term) || 
                  docEmail.includes(term) || 
                  service.includes(term) || 
                  status.includes(term);
    }

    return dateMatch && textMatch;
  });

  if (loading) return <div>Loading appointments...</div>;

  return (
    <div>
      <div className="admin-page-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <h2>All Appointments</h2>
          
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <label style={{ fontWeight: 'bold', color: '#555', fontSize: '14px' }}>Search:</label>
            <input 
              type="text" 
              placeholder="Search patient, email, service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '5px', width: '250px' }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <label style={{ fontWeight: 'bold', color: '#555', fontSize: '14px' }}>Date:</label>
            <input 
              type="date" 
              value={searchDate}
              onChange={(e) => setSearchDate(e.target.value)}
              style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '5px' }}
            />
          </div>

          {(searchDate || searchTerm) && (
            <button 
              onClick={() => { setSearchDate(''); setSearchTerm(''); }}
              style={{ padding: '8px 12px', background: '#f8d7da', color: '#721c24', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor Email</th>
              <th>Date & Time</th>
              <th>Service</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.length === 0 ? (
              <tr><td colSpan="5" style={{textAlign: 'center'}}>No appointments found for this date.</td></tr>
            ) : (
              filteredAppointments.map(app => (
                <tr key={app.id}>
                  <td>{app.first_name} {app.last_name}</td>
                  <td>{app.doctor_email}</td>
                  <td>{app.appointment_date} at {app.appointment_time}</td>
                  <td>{app.service}</td>
                  <td>
                    <span className={`admin-badge ${app.status === 'Accepted' ? 'badge-active' : app.status === 'Cancelled' ? 'badge-inactive' : 'badge-pending'}`}>
                      {app.status || 'Pending'}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AllAppointments;
