import React, { useState, useEffect } from 'react';
import { supabase } from '../../Supabase';
import './DoctorSchedule.css';

function DoctorSchedule({ user }) {
  const [workingDays, setWorkingDays] = useState([]);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [breakTime, setBreakTime] = useState('');
  const [leaveDays, setLeaveDays] = useState('');
  const [disabledSlots, setDisabledSlots] = useState('');
  const [status, setStatus] = useState('Available');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  useEffect(() => {
    if (user) {
      fetchSchedule();
    }
  }, [user]);

  const fetchSchedule = async () => {
    try {
      const { data, error } = await supabase
        .from('admin_schedules')
        .select('*')
        .eq('email', user.email)
        .single();

      if (data) {
        setWorkingDays(data.working_days ? data.working_days.split(',') : []);
        setStartTime(data.start_time || '');
        setEndTime(data.end_time || '');
        setBreakTime(data.break_time || '');
        setLeaveDays(data.leave_days || '');
        setDisabledSlots(data.disabled_slots || '');
        setStatus(data.status || 'Available');
      }
    } catch (error) {
      console.log('No existing schedule found or error fetching.');
    }
  };

  const handleDayToggle = (day) => {
    if (workingDays.includes(day)) {
      setWorkingDays(workingDays.filter(d => d !== day));
    } else {
      setWorkingDays([...workingDays, day]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const scheduleData = {
        email: user.email,
        working_days: workingDays.join(','),
        start_time: startTime,
        end_time: endTime,
        break_time: breakTime,
        leave_days: leaveDays,
        disabled_slots: disabledSlots,
        status: status
      };

      const { data: existingData } = await supabase
        .from('admin_schedules')
        .select('id')
        .eq('email', user.email)
        .single();

      let error;
      if (existingData) {
        const res = await supabase
          .from('admin_schedules')
          .update(scheduleData)
          .eq('email', user.email);
        error = res.error;
      } else {
        const res = await supabase
          .from('admin_schedules')
          .insert([scheduleData]);
        error = res.error;
      }

      if (error) throw error;
      setMessage('Schedule saved successfully!');
    } catch (err) {
      setMessage('Error saving schedule: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="doctor-schedule-container">
      <h2>My Schedule Settings</h2>
      <p className="schedule-subtitle">Set your working hours, break times, and leave days.</p>

      {message && (
        <div className={`schedule-message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="schedule-form">
        
        <div className="form-group">
          <label>Doctor Availability</label>
          <select 
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc', width: '100%', marginBottom: '15px' }}
          >
            <option value="Available">Available (Active)</option>
            <option value="Unavailable">Unavailable (Disabled)</option>
          </select>
        </div>
        
        <div className="form-group">
          <label>Working Days</label>
          <div className="days-checkboxes">
            {daysOfWeek.map(day => (
              <label key={day} className="day-checkbox-label">
                <input 
                  type="checkbox" 
                  checked={workingDays.includes(day)}
                  onChange={() => handleDayToggle(day)}
                />
                <span className="checkbox-text">{day}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group half">
            <label>Start Time</label>
            <input 
              type="time" 
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required 
            />
          </div>
          <div className="form-group half">
            <label>End Time</label>
            <input 
              type="time" 
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required 
            />
          </div>
        </div>

        <div className="form-group">
          <label>Break Time</label>
          <input 
            type="text" 
            placeholder="e.g., 1:00 PM - 2:00 PM" 
            value={breakTime}
            onChange={(e) => setBreakTime(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Leave Days (Dates)</label>
          <input 
            type="text" 
            placeholder="e.g., 2026-08-25, 2026-08-26" 
            value={leaveDays}
            onChange={(e) => setLeaveDays(e.target.value)}
          />
          <small className="help-text">Enter specific dates you will be unavailable, separated by commas.</small>
        </div>

        <div className="form-group">
          <label>Disabled Time Slots</label>
          <input 
            type="text" 
            placeholder="e.g., 09:00 AM, 02:30 PM" 
            value={disabledSlots}
            onChange={(e) => setDisabledSlots(e.target.value)}
          />
          <small className="help-text">Enter specific times you want to disable, separated by commas.</small>
        </div>

        <button type="submit" className="save-schedule-btn" disabled={loading}>
          {loading ? 'Saving...' : 'Save Schedule'}
        </button>
      </form>
    </div>
  );
}

export default DoctorSchedule;
