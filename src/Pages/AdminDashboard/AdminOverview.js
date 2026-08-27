import React, { useState, useEffect } from 'react';
import { supabase } from '../../Supabase';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = {
  Pending: '#f39c12',
  Accepted: '#2ecc71',
  Cancelled: '#e74c3c',
  Completed: '#3498db'
};

function AdminOverview() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
       
        const { data: doctorsData, error: doctorsError } = await supabase
          .from('doctor_users')
          .select('*');
          
        if (doctorsError) throw doctorsError;

  
        const { data: appointmentsData, error: apptError } = await supabase
          .from('appointments')
          .select('*');
          
        if (apptError) throw apptError;

    
        const processedData = doctorsData.map(doc => {
          const docName = doc.name || doc.full_name || 'Unknown Doctor';
          const docAppointments = appointmentsData.filter(app => app.doctor_email === doc.email);
          
          let pending = 0;
          let accepted = 0;
          let cancelled = 0;
          let completed = 0;

          docAppointments.forEach(app => {
            const status = (app.status || 'Pending').toLowerCase();
            if (status.includes('pending')) pending++;
            else if (status.includes('accept')) accepted++;
            else if (status.includes('cancel')) cancelled++;
            else if (status.includes('complet')) completed++;
            else pending++; 
          });

          const total = pending + accepted + cancelled + completed;

          return {
            name: docName,
            email: doc.email,
            total,
            stats: [
              { name: 'Pending', value: pending },
              { name: 'Accepted', value: accepted },
              { name: 'Cancelled', value: cancelled },
              { name: 'Completed', value: completed }
            ].filter(stat => stat.value > 0) 
          };
        });

        setChartData(processedData);
      } catch (error) {
        console.error("Error fetching overview data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading charts...</div>;

  return (
    <div className="admin-overview">
      <div className="admin-page-header" style={{ marginBottom: '20px' }}>
        <h2>Hospital Admin Dashboard</h2>
       
      </div>

      <div className="charts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '20px' }}>
        {chartData.map((doc, index) => (
          <div key={index} className="chart-card" style={{ background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
            <h3 style={{ textAlign: 'center', marginBottom: '5px', color: '#333' }}>{doc.name}</h3>
            <p style={{ textAlign: 'center', color: '#777', fontSize: '14px', marginBottom: '15px' }}>Total Appointments: {doc.total}</p>
            
            {doc.total === 0 ? (
              <div style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#aaa' }}>
                No appointments yet
              </div>
            ) : (
              <div style={{ height: '250px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={doc.stats}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {doc.stats.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[entry.name] || '#8884d8'} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' }} 
                    />
                    <Legend verticalAlign="bottom" height={36} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AdminOverview;
