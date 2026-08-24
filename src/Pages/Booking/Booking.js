import React, { useState, useEffect } from 'react';
import './Booking.css';
import { FaStar, FaCheckCircle, FaChevronLeft, FaChevronRight, FaHospital, FaVideo, FaPhoneAlt, FaCommentDots, FaHome, FaCreditCard, FaPaypal, FaStripe, FaEnvelope, FaEyeSlash, FaCalendarAlt, FaChevronDown } from "react-icons/fa";
import { MdOutlineLocationOn } from "react-icons/md";
import docImage from "../../assets/doc.png";
import { supabase } from '../../Supabase';
import { useNavigate } from 'react-router-dom';

const Booking = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);

  const steps = [
    "Specialty",
    "Appointment Type",
    "Date & Time",
    "Basic Information",
    "Payment",
    "Confirmation"
  ];

  const [selectedService, setSelectedService] = useState('Echocardiograms-1');
  const [selectedSpeciality, setSelectedSpeciality] = useState('');
  const [appointmentType, setAppointmentType] = useState('clinic');
  const [selectedClinic, setSelectedClinic] = useState('AllCare');
  const [selectedDate, setSelectedDate] = useState(new Date().getDate());
  const [selectedTime, setSelectedTime] = useState('09:00 AM');
  const [isSpecialityDropdownOpen, setIsSpecialityDropdownOpen] = useState(false);

  const [services, setServices] = useState([]);
  const [clinics, setClinics] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [timeSlots, setTimeSlots] = useState([]);
  const [availableDates, setAvailableDates] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [availableMonths, setAvailableMonths] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState('creditCard');
  const [selectedPatientName, setSelectedPatientName] = useState('');
  
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [reasonForVisit, setReasonForVisit] = useState('');


  const [cardHolderName, setCardHolderName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expireDate, setExpireDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [paypalEmail, setPaypalEmail] = useState('');
  const [paypalPassword, setPaypalPassword] = useState('');
  

  const handleConfirmAndPay = async () => {
    try {
      
      const { data: appointmentData, error: appointmentError } = await supabase
        .from('appointments')
        .insert([{
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
          email_address: emailAddress,
          patient_name: selectedPatientName,
          symptoms: symptoms,
          reason_for_visit: reasonForVisit,
          service: selectedSpeciality,
          additional_service: services.find(s => s.id === selectedService)?.name,
          appointment_date: `${selectedDate} Oct 2025`,
          appointment_time: selectedTime,
          appointment_type: appointmentTypes.find(a => a.id === appointmentType)?.name,
          clinic_name: clinics.find(c => c.id === selectedClinic)?.name
        }])
        .select();

      if (appointmentError) {
        console.error('Error saving appointment:', appointmentError);
        alert('Failed to save appointment. Please disable RLS in Supabase or check console.');
        return;
      }

      
      const bookingId = appointmentData?.[0]?.id || null;
      const { error: paymentError } = await supabase
        .from('payments')
        .insert([{
          booking_id: bookingId,
          payment_method: paymentMethod,
          card_holder_name: cardHolderName,
          card_number: cardNumber,
          expire_date: expireDate,
          cvv: cvv,
          email_address: paypalEmail,
          password: paypalPassword,
          total_amount: calculateTotal()
        }]);

      if (paymentError) {
        console.error('Error saving payment:', paymentError);
      }

      setCurrentStep(6);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: servicesData, error: servicesError } = await supabase
        .from('services')
        .select('*');
      if (servicesData) setServices(servicesData);
      else console.error(servicesError);


      const { data: clinicsData, error: clinicsError } = await supabase
        .from('clinics')
        .select('*');
      if (clinicsData) setClinics(clinicsData);
      else console.error(clinicsError);


      const { data: specialitiesData, error: specialitiesError } = await supabase
        .from('specialities')
        .select('*');
      if (specialitiesData) setSpecialities(specialitiesData);
      else console.error(specialitiesError);

      const { data: timeSlotsData, error: timeSlotsError } = await supabase
        .from('time_slots')
        .select('*');
      if (timeSlotsData) setTimeSlots(timeSlotsData);
      else console.error(timeSlotsError);


      const { data: datesData, error: datesError } = await supabase
        .from('available_dates')
        .select('*')
        .order('date_val', { ascending: true });
      if (datesData) setAvailableDates(datesData);
      else console.error(datesError);

      const { data: yearsData, error: yearsError } = await supabase
        .from('available_years')
        .select('*')
        .order('year_val', { ascending: true });
      if (yearsData) setAvailableYears(yearsData);
      else console.error(yearsError);

      const { data: monthsData, error: monthsError } = await supabase
        .from('available_months')
        .select('*')
        .order('id', { ascending: true });
      if (monthsData) setAvailableMonths(monthsData);
      else console.error(monthsError);
    };

    fetchData();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep]);


  const appointmentTypes = [
    { id: 'clinic', name: 'Clinic', icon: <FaHospital /> },
    { id: 'video', name: 'Video Call', icon: <FaVideo /> },
    { id: 'audio', name: 'Audio Call', icon: <FaPhoneAlt /> },
    { id: 'chat', name: 'Chat', icon: <FaCommentDots /> },
    { id: 'home', name: 'Home Visit', icon: <FaHome /> }
  ];

  const calculateTotal = () => {
    const service = services.find(s => s.id === selectedService);
    let price = 0;
    if (service && service.price) {
      price = parseFloat(service.price.replace(/[^0-9.-]+/g, '')) || 0;
    }
    const total = price + 20 + 18 - 15;
    return `$${total.toFixed(2)}`;
  };

  return (
    <div className="booking-page-container">
      <div className="stepper-wrapper">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isActive = stepNumber === currentStep;
          const isCompleted = stepNumber < currentStep;

          return (
            <div key={index} className="step-item">
              <div className="step-content">
                <div
                  className={`step-circle ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                >
                  {stepNumber}
                </div>
                <div className={`step-text ${isActive || isCompleted ? 'active-text' : ''}`}>
                  {step}
                </div>
              </div>
              {index < steps.length - 1 && (
                <div className={`step-line ${isCompleted ? 'completed-line' : ''}`}></div>
              )}
            </div>
          );
        })}
      </div>

      <div className="specialty-section-container">

        <div className="doctor-profile-card">
          <div className="doc-info-top">
            <div className="doc-image-box">
              <img src={docImage} alt="Dr. Michael Brown" />
            </div>
            <div className="doc-details">
              <div className="doc-name-rating">
                <h3>Dr. Michael Brown</h3>
                <span className="rating-badge"><FaStar className="star-icon" /> 5.0</span>
              </div>
              <p className="doc-speciality">Psychologist</p>
              <p className="doc-location">
                <MdOutlineLocationOn className="loc-icon" />
                5th Street - 1011 W 5th St, Suite 120, Austin, TX 78703
              </p>
            </div>
          </div>

          {currentStep >= 3 && (
            <>
              <div className="booking-summary-divider"></div>
              <div className="booking-summary-section">
                <h5>Booking Info</h5>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="label">Service</span>
                    <span className="value">{services.find(s => s.id === selectedService)?.name || 'Select a service'}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Clinic</span>
                    <span className="value">{clinics.find(c => c.id === selectedClinic)?.name || 'Select a clinic'}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Date & Time</span>
                    <span className="value">{`${selectedTime || ''}, ${selectedDate || ''}`}</span>
                  </div>
                  <div className="summary-item">
                    <span className="label">Appointment Type</span>
                    <span className="value">{appointmentTypes.find(a => a.id === appointmentType)?.name || 'Select type'}</span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

       
        {currentStep === 1 && (
          <div className="step-container">
            <div className="services-card">
              <div className="dropdown-section">
                <label>Select Speciality</label>
                <div className={`custom-select ${isSpecialityDropdownOpen ? 'open' : ''}`}>
                  <div 
                    className="custom-select-header speciality-dropdown"
                    onClick={() => setIsSpecialityDropdownOpen(!isSpecialityDropdownOpen)}
                  >
                    <span className={selectedSpeciality ? 'selected-text' : 'placeholder-text'}>
                      {selectedSpeciality || 'Select Speciality'}
                    </span>
                    <FaChevronDown className="select-icon" />
                  </div>
                  {isSpecialityDropdownOpen && (
                    <div className="custom-select-list">
                      <div 
                        className={`custom-select-item ${!selectedSpeciality ? 'active' : ''}`}
                        onClick={() => {
                          setSelectedSpeciality('');
                          setIsSpecialityDropdownOpen(false);
                        }}
                      >
                        Select Speciality
                      </div>
                      {specialities.map((spec) => (
                        <div 
                          key={spec.id} 
                          className={`custom-select-item ${selectedSpeciality === spec.name ? 'active' : ''}`}
                          onClick={() => {
                            setSelectedSpeciality(spec.name);
                            setIsSpecialityDropdownOpen(false);
                          }}
                        >
                          {spec.name}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="services-section">
                <h4>Services</h4>
                <div className="services-grid">
                  {services.map((service) => (
                    <div
                      key={service.id}
                      className={`service-item ${selectedService === service.id ? 'selected' : ''}`}
                      onClick={() => setSelectedService(service.id)}
                    >
                      <div className="service-info">
                        <p className="service-name">{service.name}</p>
                        <p className="service-price">{service.price}</p>
                      </div>
                      {selectedService === service.id && (
                        <div className="check-icon"><FaCheckCircle /></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="action-bar-card">
              <button className="btn-back" onClick={() => navigate('/')}>
                <FaChevronLeft className="btn-icon" /> Back
              </button>
              <button className="btn-next" onClick={() => setCurrentStep(2)}>
                Select Appointment Type <FaChevronRight className="btn-icon-right" />
              </button>
            </div>
          </div>
        )}

      
        {currentStep === 2 && (
          <div className="step-container">
            <div className="services-card">
              <div className="appointment-types-section">
                <h4>Select Appointment Type</h4>
                <div className="appointment-types-grid">
                  {appointmentTypes.map((type) => (
                    <div
                      key={type.id}
                      className={`app-type-card ${appointmentType === type.id ? 'selected' : ''}`}
                      onClick={() => setAppointmentType(type.id)}
                    >
                      <div className="app-type-icon">{type.icon}</div>
                      <p>{type.name}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="clinics-section">
                <h4>Select Clinics</h4>
                <div className="clinics-list">
                  {clinics.map((clinic) => (
                    <div
                      key={clinic.id}
                      className={`clinic-card ${selectedClinic === clinic.id ? 'selected' : ''}`}
                      onClick={() => setSelectedClinic(clinic.id)}
                    >
                      <div className="clinic-logo" style={{ backgroundColor: clinic.logoColor }}></div>
                      <div className="clinic-details">
                        <p className="clinic-name">{clinic.name}</p>
                        <p className="clinic-address">
                          {clinic.address} <span className="clinic-dot">•</span> {clinic.distance}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="action-bar-card">
              <button className="btn-back" onClick={() => setCurrentStep(1)}>
                <FaChevronLeft className="btn-icon" /> Back
              </button>
              <button className="btn-next" onClick={() => setCurrentStep(3)}>
                Select Date & Time <FaChevronRight className="btn-icon-right" />
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="step-container">
            <div className="date-time-card">
              <div className="calendar-section">
                <div className="calendar-header">
                  <div className="cal-selects">
                    <select>
                      {availableYears.map(y => (
                        <option key={y.id} value={y.year_val}>{y.year_val}</option>
                      ))}
                    </select>
                    <select>
                      {availableMonths.map(m => (
                        <option key={m.id} value={m.month_name}>{m.month_name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="view-toggles">
                    <button className="active">Month</button>
                    <button>Year</button>
                  </div>
                </div>
                <div className="calendar-grid">
                  {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                    <div key={day} className="cal-day-name">{day}</div>
                  ))}
                  {[28, 29, 30, 31].map(date => (
                    <div key={`prev-${date}`} className="cal-date disabled">{date}</div>
                  ))}
                  {availableDates.map(d => (
                    <div
                      key={d.id}
                      className={`cal-date ${selectedDate === d.date_val ? 'active' : ''}`}
                      onClick={() => setSelectedDate(d.date_val)}
                    >
                      {d.date_val}
                    </div>
                  ))}
                </div>
              </div>

              <div className="time-slots-section">
                <div className="time-group">
                  <h4>Morning</h4>
                  <div className="slots-grid">
                    {timeSlots.filter(slot => slot.period === 'Morning').map(slot => (
                      <div
                        key={slot.id}
                        className={`time-slot ${selectedTime === slot.time ? 'active' : ''}`}
                        onClick={() => setSelectedTime(slot.time)}
                      >
                        {slot.time}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="time-group">
                  <h4>Afternoon</h4>
                  <div className="slots-grid">
                    {timeSlots.filter(slot => slot.period === 'Afternoon').map(slot => (
                      <div
                        key={slot.id}
                        className={`time-slot ${selectedTime === slot.time ? 'active' : ''}`}
                        onClick={() => setSelectedTime(slot.time)}
                      >
                        {slot.time}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="time-group">
                  <h4>Evening</h4>
                  <div className="slots-grid">
                    {timeSlots.filter(slot => slot.period === 'Evening').map(slot => (
                      <div
                        key={slot.id}
                        className={`time-slot ${selectedTime === slot.time ? 'active' : ''}`}
                        onClick={() => setSelectedTime(slot.time)}
                      >
                        {slot.time}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="action-bar-card">
              <button className="btn-back" onClick={() => setCurrentStep(2)}>
                <FaChevronLeft className="btn-icon" /> Back
              </button>
              <button className="btn-next" onClick={() => setCurrentStep(4)}>
                Add Basic Information <FaChevronRight className="btn-icon-right" />
              </button>
            </div>
          </div>
        )}

        
        {currentStep === 4 && (
          <div className="step-container">
            <div className="basic-info-card">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input type="text" className="form-input" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input type="text" className="form-input" value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Phone Number</label>
                  <input type="text" className="form-input" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
                </div>
              </div>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Email Address</label>
                  <input type="email" className="form-input" value={emailAddress} onChange={(e) => setEmailAddress(e.target.value)} />
                </div>
                <div className="form-group">
                  <label>Patient Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter Patient Name" 
                    value={selectedPatientName}
                    onChange={(e) => setSelectedPatientName(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label>Symptoms</label>
                  <input type="text" className="form-input" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} />
                </div>
              </div>

              <div className="form-row full-width">
                <div className="form-group">
                  <label>Attachment</label>
                  <input type="file" className="form-input file-input" />
                </div>
              </div>

              <div className="form-row full-width">
                <div className="form-group">
                  <label>Reason for Visit</label>
                  <textarea className="form-textarea" rows="4" value={reasonForVisit} onChange={(e) => setReasonForVisit(e.target.value)}></textarea>
                </div>
              </div>
            </div>

            <div className="action-bar-card">
              <button className="btn-back" onClick={() => setCurrentStep(3)}>
                <FaChevronLeft className="btn-icon" /> Back
              </button>
              <button className="btn-next" onClick={() => setCurrentStep(5)}>
                Select Payment <FaChevronRight className="btn-icon-right" />
              </button>
            </div>
          </div>
        )}

       
        {currentStep === 5 && (
          <div className="step-container">
            <div className="payment-layout">
            
              <div className="payment-gateway-card">
                <h4 className="payment-title">Payment Gateway</h4>
                <div className="payment-methods">
                  <button 
                    className={`method-btn ${paymentMethod === 'creditCard' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('creditCard')}
                  >
                    <FaCreditCard className="method-icon credit-card" /> Credit Card
                  </button>
                  <button 
                    className={`method-btn ${paymentMethod === 'paypal' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('paypal')}
                  >
                    <FaPaypal className="method-icon paypal" /> Paypal
                  </button>
                  <button 
                    className={`method-btn ${paymentMethod === 'stripe' ? 'active' : ''}`}
                    onClick={() => setPaymentMethod('stripe')}
                  >
                    <FaStripe className="method-icon stripe" /> Stripe
                  </button>
                </div>
                
                <div className="payment-form">
                  {paymentMethod === 'creditCard' && (
                    <div className="payment-form">
                      <div className="form-group">
                        <label>Name on Card</label>
                        <input type="text" className="form-input" placeholder="Name on Card" value={cardHolderName} onChange={(e) => setCardHolderName(e.target.value)} />
                      </div>
                      <div className="form-group">
                        <label>Card Number</label>
                        <input type="text" className="form-input" placeholder="**** **** **** ****" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
                      </div>
                      <div className="form-row">
                        <div className="form-group">
                          <label>Expire Date</label>
                          <input type="text" className="form-input" placeholder="MM/YY" value={expireDate} onChange={(e) => setExpireDate(e.target.value)} />
                        </div>
                        <div className="form-group">
                          <label>CVV</label>
                          <input type="text" className="form-input" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  )}

                  {(paymentMethod === 'paypal' || paymentMethod === 'stripe') && (
                    <div className="payment-form">
                      <div className="form-group">
                        <label>Email Address</label>
                        <div className="input-with-icon">
                          <FaEnvelope className="input-icon" />
                          <input type="email" className="form-input" placeholder="Email Address" value={paypalEmail} onChange={(e) => setPaypalEmail(e.target.value)} />
                        </div>
                      </div>
                      <div className="form-group">
                        <label>Password</label>
                        <div className="input-with-icon">
                          <FaEyeSlash className="input-icon" />
                          <input type="password" className="form-input" placeholder="Password" value={paypalPassword} onChange={(e) => setPaypalPassword(e.target.value)} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column: Order Summary */}
              <div className="payment-summary-card">
                <h4 className="payment-title">Booking Info</h4>
                <div className="summary-info-block">
                  <p className="summary-label">Date & Time</p>
                  <p className="summary-value">{`${selectedTime || ''}, ${selectedDate || ''}`}</p>
                </div>
                <div className="summary-info-block">
                  <p className="summary-label">Appointment type</p>
                  <p className="summary-value">
                    {appointmentTypes.find(a => a.id === appointmentType)?.name} ({clinics.find(c => c.id === selectedClinic)?.name})
                  </p>
                </div>
                
                <div className="summary-divider"></div>

                <h4 className="payment-title">Payment Info</h4>
                <div className="payment-row">
                  <span>{services.find(s => s.id === selectedService)?.name || 'Service'}</span>
                  <span>{services.find(s => s.id === selectedService)?.price || '$0'}</span>
                </div>
                <div className="payment-row">
                  <span>Booking Fees</span>
                  <span>$20</span>
                </div>
                <div className="payment-row">
                  <span>Tax</span>
                  <span>$18</span>
                </div>
                <div className="payment-row discount">
                  <span>Discount</span>
                  <span>-$15</span>
                </div>
                
                <div className="payment-total">
                  <span>Total</span>
                  <span>{calculateTotal()}</span>
                </div>
              </div>
            </div>

            <div className="action-bar-card">
              <button className="btn-back" onClick={() => setCurrentStep(4)}>
                <FaChevronLeft className="btn-icon" /> Back
              </button>
              <button className="btn-next" onClick={handleConfirmAndPay}>
                Confirm & Pay <FaChevronRight className="btn-icon-right" />
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Confirmation */}
        {currentStep === 6 && (
          <div className="step-container">
           
            <div className="confirmation-layout">
            
              <div className="confirmation-left">
                <div className="confirm-card">
                  <div className="confirm-header">
                    <FaCheckCircle className="success-icon" />
                    <h2>Booking Confirmed</h2>
                  </div>
                  
                  <div className="confirm-doc-info">
                    <img src={docImage} alt="Dr. Michael Brown" className="confirm-doc-img" />
                    <p>
                      Your Booking has been Confirmed with <strong>Dr. Michael Brown</strong> be on time before <strong>15 Mins</strong> From the appointment Time
                    </p>
                  </div>

                  <div className="confirm-booking-info">
                    <div className="info-header-row">
                      <h4>Booking Info</h4>
                      <button className="btn-reschedule"><FaCalendarAlt /> Reschedule</button>
                    </div>
                    
                    <div className="info-grid">
                      <div className="info-block">
                        <span className="info-label">Service</span>
                        <span className="info-value">{selectedSpeciality || 'Speciality Name'}</span>
                      </div>
                      <div className="info-block">
                        <span className="info-label">Additional Service</span>
                        <span className="info-value">{services.find(s => s.id === selectedService)?.name || '-'}</span>
                      </div>
                      <div className="info-block">
                        <span className="info-label">Date & Time</span>
                        <span className="info-value">{`${selectedTime || ''}, ${selectedDate || ''}`}</span>
                      </div>
                      <div className="info-block">
                        <span className="info-label">Appointment type</span>
                        <span className="info-value">{appointmentTypes.find(a => a.id === appointmentType)?.name}</span>
                      </div>
                      <div className="info-block full-width">
                        <span className="info-label">Clinic Name & Location</span>
                        <span className="info-value">
                          {clinics.find(c => c.id === selectedClinic)?.name} <button type="button" className="link-text" style={{background: 'none', border: 'none', padding: 0, cursor: 'pointer'}}>View Location</button>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="assistance-card">
                  <div className="assist-text">
                    <h4>Need Our Assistance</h4>
                    <p>Call us in case you face any Issue on Booking / Cancellation</p>
                  </div>
                  <button className="btn-call"><FaPhoneAlt /> Call Us</button>
                </div>
              </div>

              {/* Right Column (Hidden for now) */}
              {/* 
              <div className="confirmation-right">
                <div className="qr-card">
                  <span className="qr-label">Booking Number</span>
                  <div className="booking-id">DCRA12565</div>
                  
                  <div className="qr-code-box">
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=DCRA12565" alt="QR Code" />
                  </div>
                  
                  <p className="qr-desc">Scan this QR Code to Download the details of Appointment</p>
                  
                  <button className="btn-add-calendar">Add To Calendar</button>
                  <button className="btn-new-booking" onClick={() => window.location.reload()}>Start New Booking</button>
                </div>
              </div>
              */}
            </div>
             <button className="back-to-bookings-btn" onClick={() => {
              setCurrentStep(1);
              setSelectedSpeciality('');
              setSelectedService('Echocardiograms-1');
            }}>
              <FaChevronLeft className="btn-icon8" /> Back to Bookings
            </button>
          </div>
        )}
      </div>

    </div>
  );
};

export default Booking;
