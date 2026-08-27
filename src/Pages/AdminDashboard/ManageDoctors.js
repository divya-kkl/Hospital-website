import React, { useState, useEffect } from 'react';
import { supabase, supabaseAdminAuth } from '../../Supabase';
import { FaEdit, FaTrash, FaPlus, FaEye, FaEnvelope, FaGraduationCap, FaStethoscope, FaBriefcase, FaIdCard, FaMapMarkerAlt, FaMoneyBillWave } from 'react-icons/fa';

function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState('add');
  const [currentDoctor, setCurrentDoctor] = useState({
    id: null,
    name: '',
    email: '',
    specialization: '',
    qualification: '',
    experience: '',
    registration_details: '',
    image: '',
    location: '',
    fee: '',
    password: ''
  });
  const [imageFile, setImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 5;

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('doctor_users')
        .select('*')
        .order('id', { ascending: false });

      if (error) throw error;
      setDoctors(data || []);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenAddModal = () => {
    setModalMode('add');
    setCurrentDoctor({
      id: null,
      name: '',
      email: '',
      specialization: '',
      qualification: '',
      experience: '',
      registration_details: '',
      image: '',
      location: '',
      fee: '',
      password: ''
    });
    setShowModal(true);
  };

  const handleOpenViewModal = (doctor) => {
    setModalMode('view');
    setCurrentDoctor({
      id: doctor.id,
      name: doctor.name || doctor.full_name || '',
      email: doctor.email,
      specialization: doctor.specialization || '',
      qualification: doctor.qualification || '',
      experience: doctor.experience || '',
      registration_details: doctor.registration_details || '',
      image: doctor.image || '',
      location: doctor.location || '',
      fee: doctor.fee || ''
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (doctor) => {
    setModalMode('edit');
    setCurrentDoctor({
      id: doctor.id,
      name: doctor.name || doctor.full_name || '',
      email: doctor.email,
      specialization: doctor.specialization || '',
      qualification: doctor.qualification || '',
      experience: doctor.experience || '',
      registration_details: doctor.registration_details || '',
      image: doctor.image || '',
      location: doctor.location || '',
      fee: doctor.fee || ''
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setCurrentDoctor({
      id: null,
      name: '',
      email: '',
      specialization: '',
      qualification: '',
      experience: '',
      registration_details: '',
      image: '',
      location: '',
      fee: '',
      password: ''
    });
    setImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let uploadedImageUrl = currentDoctor.image;
      if (imageFile) {
        const fileExt = imageFile.name.split('.').pop();
        const fileName = `${Date.now()}_${Math.random().toString(36).substring(7)}.${fileExt}`;

        const { error: uploadError } = await supabase.storage
          .from('doctor-profiles')
          .upload(fileName, imageFile);

        if (uploadError) {
          throw new Error('Error uploading image: ' + uploadError.message);
        }

        const { data: publicUrlData } = supabase.storage
          .from('doctor-profiles')
          .getPublicUrl(fileName);

        uploadedImageUrl = publicUrlData.publicUrl;
      }

      if (modalMode === 'add') {
        const { error: authError } = await supabaseAdminAuth.auth.signUp({
          email: currentDoctor.email,
          password: currentDoctor.password,
          options: {
            data: {
              full_name: currentDoctor.name,
              role: 'doctor'
            }
          }
        });

        if (authError) throw authError;


        const { error: dbError } = await supabase
          .from('doctor_users')
          .insert([{
            name: currentDoctor.name,
            email: currentDoctor.email,
            specialization: currentDoctor.specialization,
            qualification: currentDoctor.qualification,
            experience: currentDoctor.experience,
            registration_details: currentDoctor.registration_details,
            image: uploadedImageUrl,
            location: currentDoctor.location,
            fee: currentDoctor.fee,
            role: 'doctor'
          }]);

        if (dbError) throw dbError;
        alert("Doctor account created successfully!");
        handleCloseModal();
        fetchDoctors();
        return;
      } else if (modalMode === 'edit') {
        const { error } = await supabase
          .from('doctor_users')
          .update({
            name: currentDoctor.name,
            specialization: currentDoctor.specialization,
            qualification: currentDoctor.qualification,
            experience: currentDoctor.experience,
            registration_details: currentDoctor.registration_details,
            image: uploadedImageUrl,
            location: currentDoctor.location,
            fee: currentDoctor.fee
          })
          .eq('id', currentDoctor.id);

        if (error) throw error;
      }

      handleCloseModal();
      fetchDoctors();
    } catch (error) {
      alert("Error saving doctor: " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete Dr. ${name}?`)) {
      try {
        const { error } = await supabase
          .from('doctor_users')
          .delete()
          .eq('id', id);

        if (error) throw error;

        // Refresh list
        fetchDoctors();
      } catch (error) {
        alert("Error deleting doctor: " + error.message);
      }
    }
  };


  const filteredDoctors = doctors.filter(doc =>
    (doc.name || doc.full_name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (doc.specialization || '').toLowerCase().includes(searchTerm.toLowerCase())
  )
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filteredDoctors.slice(indexOfFirstDoctor, indexOfLastDoctor);
  const totalPages = Math.ceil(filteredDoctors.length / doctorsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Reset to page 1 when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  if (loading) return <div>Loading doctors...</div>;

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Manage Doctors</h2>
        </div>
        <button className="admin-btn-primary" onClick={handleOpenAddModal}>
          <FaPlus /> Add New Doctor
        </button>
      </div>

      <div className="admin-search-container" style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px' }}>
        <input
          type="text"
          placeholder="Search doctors..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="admin-search-input"
          style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd', width: '300px' }}
        />
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Specialization</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentDoctors.length === 0 ? (
              <tr><td colSpan="6" style={{ textAlign: 'center' }}>No doctors found.</td></tr>
            ) : (
              currentDoctors.map((doc, index) => (
                <tr key={doc.id}>
                  <td>{indexOfFirstDoctor + index + 1}</td>
                  <td>{doc.name || doc.full_name || 'N/A'}</td>
                  <td>{doc.email}</td>
                  <td>{doc.specialization || 'General'}</td>
                  <td>
                    <span className="admin-badge badge-active">Active</span>
                  </td>
                  <td>
                    <div className="admin-action-buttons">
                      <button className="admin-btn-icon view" onClick={() => handleOpenViewModal(doc)} title="View Details">
                        <FaEye />
                      </button>
                      <button className="admin-btn-icon edit" onClick={() => handleOpenEditModal(doc)} title="Edit">
                        <FaEdit />
                      </button>
                      <button className="admin-btn-icon delete" onClick={() => handleDelete(doc.id, doc.name || doc.full_name)} title="Delete">
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination-container" style={{ display: 'flex', justifyContent: 'center', marginTop: '20px', gap: '10px' }}>
          <button
            disabled={currentPage === 1}
            onClick={() => paginate(currentPage - 1)}
            style={{ padding: '8px 12px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff' }}
          >
            Prev
          </button>
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              style={{ padding: '8px 12px', backgroundColor: currentPage === i + 1 ? '#007bff' : '#fff', color: currentPage === i + 1 ? '#fff' : '#333', cursor: 'pointer', border: '1px solid #ddd', borderRadius: '4px' }}
            >
              {i + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            onClick={() => paginate(currentPage + 1)}
            style={{ padding: '8px 12px', cursor: currentPage === totalPages ? 'not-allowed' : 'pointer', border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff' }}
          >
            Next
          </button>
        </div>
      )}

      {/* CRUD Modal */}
      {showModal && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <div className="admin-modal-header">
              <h3>{modalMode === 'add' ? 'Add New Doctor' : modalMode === 'edit' ? 'Edit Doctor' : 'Doctor Details'}</h3>
              <button className="admin-modal-close" onClick={handleCloseModal}>&times;</button>
            </div>

            {modalMode === 'view' ? (
              <div>
                <div className="admin-modal-body admin-view-modal-body" style={{ maxHeight: '65vh', overflowY: 'auto', padding: '0' }}>
                  <div className="admin-view-header-section">
                    <div className="admin-view-avatar">
                      {currentDoctor.image ? (
                        <img src={currentDoctor.image} alt={currentDoctor.name} onError={(e) => { e.target.onerror = null; e.target.src = "https://cdn-icons-png.flaticon.com/512/3774/3774299.png"; }} />
                      ) : (
                        <img src="https://cdn-icons-png.flaticon.com/512/3774/3774299.png" alt="Default Avatar" />
                      )}
                    </div>
                    <div className="admin-view-title">
                      <h2>{currentDoctor.name}</h2>
                      <span className="admin-view-spec">{currentDoctor.specialization || 'General Doctor'}</span>
                    </div>
                  </div>

                  <div className="admin-view-grid">
                    <div className="admin-view-item">
                      <div className="view-icon-wrapper"><FaEnvelope /></div>
                      <div className="view-item-content">
                        <small>Email Address</small>
                        <p>{currentDoctor.email}</p>
                      </div>
                    </div>

                    <div className="admin-view-item">
                      <div className="view-icon-wrapper"><FaGraduationCap /></div>
                      <div className="view-item-content">
                        <small>Qualification</small>
                        <p>{currentDoctor.qualification || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="admin-view-item">
                      <div className="view-icon-wrapper"><FaStethoscope /></div>
                      <div className="view-item-content">
                        <small>Specialization</small>
                        <p>{currentDoctor.specialization || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="admin-view-item">
                      <div className="view-icon-wrapper"><FaBriefcase /></div>
                      <div className="view-item-content">
                        <small>Experience</small>
                        <p>{currentDoctor.experience ? `${currentDoctor.experience} Years` : 'N/A'}</p>
                      </div>
                    </div>

                    <div className="admin-view-item">
                      <div className="view-icon-wrapper"><FaIdCard /></div>
                      <div className="view-item-content">
                        <small>Registration Details</small>
                        <p>{currentDoctor.registration_details || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="admin-view-item">
                      <div className="view-icon-wrapper"><FaMapMarkerAlt /></div>
                      <div className="view-item-content">
                        <small>Location</small>
                        <p>{currentDoctor.location || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="admin-view-item">
                      <div className="view-icon-wrapper"><FaMoneyBillWave /></div>
                      <div className="view-item-content">
                        <small>Consultation Fee</small>
                        <p className="view-fee-text">{currentDoctor.fee ? `${currentDoctor.fee}` : 'N/A'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="admin-modal-footer">
                  <button type="button" className="admin-btn-secondary" onClick={handleCloseModal}>Close</button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="admin-modal-body" style={{ maxHeight: '60vh', overflowY: 'auto' }}>
                  <div className="admin-form-group">
                    <label>Full Name</label>
                    <input
                      type="text"
                      required
                      value={currentDoctor.name}
                      onChange={(e) => setCurrentDoctor({ ...currentDoctor, name: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      required
                      disabled={modalMode === 'edit'} // Don't let them edit email to avoid auth mismatches
                      value={currentDoctor.email}
                      onChange={(e) => setCurrentDoctor({ ...currentDoctor, email: e.target.value })}
                    />
                  </div>
                  {modalMode === 'add' && (
                    <div className="admin-form-group">
                      <label>Password (for Doctor Login)</label>
                      <input
                        type="password"
                        required
                        placeholder="Set a password for the doctor"
                        value={currentDoctor.password}
                        onChange={(e) => setCurrentDoctor({ ...currentDoctor, password: e.target.value })}
                      />
                    </div>
                  )}
                  <div className="admin-form-group">
                    <label>Qualification</label>
                    <input
                      type="text"
                      placeholder="e.g. MBBS, MD"
                      value={currentDoctor.qualification}
                      onChange={(e) => setCurrentDoctor({ ...currentDoctor, qualification: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Specialization</label>
                    <input
                      type="text"
                      placeholder="e.g. Cardiologist"
                      value={currentDoctor.specialization}
                      onChange={(e) => setCurrentDoctor({ ...currentDoctor, specialization: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Experience (Years)</label>
                    <input
                      type="text"
                      placeholder="e.g. 10"
                      value={currentDoctor.experience}
                      onChange={(e) => setCurrentDoctor({ ...currentDoctor, experience: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Registration Details</label>
                    <input
                      type="text"
                      placeholder="e.g. 123456"
                      value={currentDoctor.registration_details}
                      onChange={(e) => setCurrentDoctor({ ...currentDoctor, registration_details: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Profile Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        if (e.target.files && e.target.files[0]) {
                          setImageFile(e.target.files[0]);
                          setCurrentDoctor({ ...currentDoctor, image: URL.createObjectURL(e.target.files[0]) });
                        }
                      }}
                    />
                    {currentDoctor.image && (
                      <div style={{ marginTop: '10px' }}>
                        <img src={currentDoctor.image} alt="Preview" style={{ width: '80px', height: '80px', borderRadius: '8px', objectFit: 'cover' }} />
                      </div>
                    )}
                  </div>
                  <div className="admin-form-group">
                    <label>Location</label>
                    <input
                      type="text"
                      placeholder="e.g. Ogden, IA"
                      value={currentDoctor.location}
                      onChange={(e) => setCurrentDoctor({ ...currentDoctor, location: e.target.value })}
                    />
                  </div>
                  <div className="admin-form-group">
                    <label>Consultation Fee</label>
                    <input
                      type="text"
                      placeholder="e.g. $350"
                      value={currentDoctor.fee}
                      onChange={(e) => setCurrentDoctor({ ...currentDoctor, fee: e.target.value })}
                    />
                  </div>
                </div>
                <div className="admin-modal-footer">
                  <button type="button" className="admin-btn-secondary" onClick={handleCloseModal}>Cancel</button>
                  <button type="submit" className="admin-btn-primary" disabled={isSubmitting}>
                    {isSubmitting ? 'Saving...' : 'Save Doctor'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageDoctors;
