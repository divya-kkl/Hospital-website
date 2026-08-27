import React, { useState, useEffect } from 'react';
import { supabase } from '../../Supabase';

function PatientsList({ user }) {
  const getTodayString = () => {
    const today = new Date();
    return today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');
  };

  const [allAppointments, setAllAppointments] = useState([]);
  const [selectedDate, setSelectedDate] = useState(getTodayString());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user) return;
      
      try {
        setLoading(true);
        // Fetch appointments for this doctor
        const { data, error } = await supabase
          .from('appointments')
          .select('*')
          .eq('doctor_email', user.email)
          .order('appointment_date', { ascending: true });

        if (error) throw error;
        setAllAppointments(data || []);
      } catch (error) {
        console.error('Error fetching patients:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, [user]);

  const filteredPatients = allAppointments.filter(app => {
    if (!selectedDate) return true;
    
    const appDate = new Date(app.appointment_date);
    const filterDate = new Date(selectedDate);
    
    if (isNaN(appDate.getTime()) || isNaN(filterDate.getTime())) return false;
    
    return appDate.getFullYear() === filterDate.getFullYear() &&
           appDate.getMonth() === filterDate.getMonth() &&
           appDate.getDate() === filterDate.getDate();
  });

  const displayDateText = selectedDate 
    ? new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
    : 'All Dates';

  if (loading) return <div>Loading patients...</div>;

  return (
    <div className="patients-list-container" style={{ padding: '20px', background: '#fff', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
      <div style={{ marginBottom: '20px', borderBottom: '1px solid #eee', paddingBottom: '15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div>
          <h2 style={{ margin: '0 0 5px 0', color: '#2c3e50' }}>Patients List</h2>
          <p style={{ margin: 0, color: '#7f8c8d' }}>
            Date: <strong>{displayDateText}</strong>
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <label style={{ fontWeight: 'bold', color: '#555', fontSize: '14px' }}>Select Date:</label>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            style={{ padding: '8px 12px', border: '1px solid #ddd', borderRadius: '5px' }}
          />
          {selectedDate && (
            <button 
              onClick={() => setSelectedDate('')}
              style={{ padding: '8px 12px', background: '#f8d7da', color: '#721c24', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {filteredPatients.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', background: '#f8f9fa', borderRadius: '8px' }}>
          <h3 style={{ color: '#95a5a6', margin: 0 }}>No appointments scheduled for {selectedDate ? 'this date' : 'any date'}.</h3>
        </div>
      ) : (
        <div className="admin-table-container">
          <table className="admin-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f1f2f6', textAlign: 'left' }}>
                <th style={{ padding: '12px' }}>Patient Name</th>
                <th style={{ padding: '12px' }}>Email</th>
                <th style={{ padding: '12px' }}>Time</th>
                <th style={{ padding: '12px' }}>Service</th>
                <th style={{ padding: '12px' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredPatients.map(patient => (
                <tr key={patient.id} style={{ borderBottom: '1px solid #f1f2f6' }}>
                  <td style={{ padding: '12px', fontWeight: '500', color: '#333' }}>{patient.first_name} {patient.last_name}</td>
                  <td style={{ padding: '12px', color: '#555' }}>{patient.patient_email}</td>
                  <td style={{ padding: '12px', color: '#555' }}>{patient.appointment_time}</td>
                  <td style={{ padding: '12px', color: '#555' }}>{patient.service || 'N/A'}</td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ 
                      padding: '5px 10px', 
                      borderRadius: '20px', 
                      fontSize: '12px', 
                      fontWeight: 'bold',
                      background: patient.status?.toLowerCase() === 'accepted' ? '#d4edda' : 
                                  patient.status?.toLowerCase() === 'cancelled' ? '#f8d7da' : '#fff3cd',
                      color: patient.status?.toLowerCase() === 'accepted' ? '#155724' : 
                             patient.status?.toLowerCase() === 'cancelled' ? '#721c24' : '#856404'
                    }}>
                      {patient.status || 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default PatientsList;
