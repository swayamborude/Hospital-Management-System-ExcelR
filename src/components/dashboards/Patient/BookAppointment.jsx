import React, { useState, useEffect } from 'react';
import { getAllDoctors, bookAppointment } from '../../../api';
import { Button, Modal, Card } from 'react-bootstrap';
import { FaCalendarAlt, FaPencilAlt } from 'react-icons/fa'; // Import FontAwesome icons
import ConfirmationModal from './Confirmation/ConfirmationModal ';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // Import FontAwesomeIcon component
import { faUserMd } from '@fortawesome/free-solid-svg-icons'; // Import doctor icon from FontAwesome
const BookAppointment = () => {
    const [doctors, setDoctors] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);
    const [appointmentDate, setAppointmentDate] = useState('');
    const [description, setDescription] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const headingStyle = {
        fontSize: '2rem', // Medium size
        fontWeight: '500', // Medium weight
        textAlign: 'center',
        marginBottom: '40px',
        textTransform: 'capitalize', // More elegant appearance
        letterSpacing: '1px',
        fontFamily: "'Poppins', sans-serif", // Elegant font choice
        lineHeight: '1.3',
        background: 'linear-gradient(90deg, rgba(89, 138, 255, 1) 0%, rgba(103, 162, 255, 1) 100%)', // Blue gradient
        WebkitBackgroundClip: 'text', // Text background clip for gradient
        color: 'transparent', // Transparent text color to show gradient
        animation: 'textAnimation 2s ease-out infinite', // Animation for text
      };
      
      const animationStyles = `
      @keyframes textAnimation {
        0% {
          opacity: 0;
          transform: translateY(-30px);
        }
        50% {
          opacity: 1;
          transform: translateY(0);
        }
        100% {
          opacity: 0;
          transform: translateY(30px);
        }
      }
      `;
      const modalStyles = {
        maxWidth: '450px', 
        margin: '0 auto', 
        padding: '20px',
        borderRadius: '10px',
        backgroundColor: '#ffffff', 
      };
      
      const headerStyles = {
        fontSize: '1.5rem', 
        fontWeight: '600', 
        color: '#333', 
        borderBottom: '2px solid #e0e0e0', 
        paddingBottom: '15px',
      };
      
      const labelStyles = {
        fontSize: '1rem',
        fontWeight: '500',
        marginBottom: '8px',
        display: 'flex',
        alignItems: 'center',
        color: '#555', 
      };
      
      const iconStyles = {
        marginRight: '8px', 
        color: '#007bff', 
      };
      
      const inputStyles = {
        width: '100%',
        padding: '12px',
        fontSize: '1rem',
        borderRadius: '8px',
        border: '1px solid #ccc',
        marginBottom: '15px',
        boxSizing: 'border-box',
      };
      
      const textareaStyles = {
        width: '100%',
        padding: '12px',
        fontSize: '1rem',
        borderRadius: '8px',
        border: '1px solid #ccc',
        height: '120px', 
        resize: 'none', 
        marginBottom: '15px',
        boxSizing: 'border-box',
      };
      
      const footerButtonStyles = {
        padding: '12px 24px',
        fontSize: '1rem',
        borderRadius: '30px',
        marginRight: '10px',
      };
      
      const modalButtonStyles = {
        padding: '12px 24px',
        fontSize: '1rem',
        borderRadius: '30px',
        backgroundColor: '#007bff', 
        border: 'none',
        color: '#fff',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: '#0056b3', 
        },
      };
      
      const closeButtonStyles = {
        padding: '12px 24px',
        fontSize: '1rem',
        borderRadius: '30px',
        backgroundColor: '#6c757d',
        border: 'none',
        color: '#fff',
        transition: 'background-color 0.3s ease',
        '&:hover': {
          backgroundColor: '#495057', 
        },
      };
      


    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const doctorData = await getAllDoctors();
                setDoctors(doctorData);
            } catch (error) {
                console.error("Failed to fetch doctors");
            }
        };
        fetchDoctors();
    }, []);

    const isValidAppointmentTime = (appointmentDate) => {
        const appointmentTime = new Date(appointmentDate);
        const hour = appointmentTime.getHours();
        return hour >= 11 && hour < 20; // Time must be between 11 AM and 8 PM
    };

    const handleBookAppointment = async () => {
        if (!selectedDoctor || !appointmentDate) {
            alert("Please select a doctor and date.");
            return;
        }

        if (!isValidAppointmentTime(appointmentDate)) {
            alert("Appointments can only be scheduled between 11 AM and 8 PM.");
            return;
        }

        // Ensure selectedDoctor exists
        const doctor = doctors.find(doc => doc.doctorId === selectedDoctor);
        if (doctor) {
            setDoctorName(`Dr.${doctor.user.firstName} ${doctor.user.lastName}`); // Set the doctor name
        }

        setSuccessMessage(`Your appointment with Dr. ${doctor.user.firstName} ${doctor.user.lastName} is Successful.!`);
        setShowSuccess(true);
        setTimeout(() => {
            setShowSuccess(false);
        }, 5000);

        setShowConfirmation(true); // Show confirmation modal
    };

    const confirmBooking = async () => {
        const appointmentDTO = {
            doctorId: selectedDoctor,
            appointmentDate,
            description,
        };

        try {
            await bookAppointment(appointmentDTO);
            setShowModal(false);
            setShowConfirmation(false);
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('Failed to book appointment. Please try again later.');
            setShowConfirmation(false);
        }
    };

    return (
        <div>
            {showSuccess && (
                <h5 className="success-message">
                    {successMessage}
                </h5>
            )}
            <br/>
            {/* Inject the animation styles in a style tag */}
        <style>{animationStyles}</style>

        {/* Styled heading with animation */}
        <p style={headingStyle}>Book Your Appointment With Our Top Notch Doctors</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>
                {doctors.map((doctor) => (
                  <Card key={doctor.doctorId} style={{ width: '18rem', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', backgroundColor: 'navy' }}>
                    <Card.Body style={{ textAlign: 'center', padding: '20px' }}>
                      <FontAwesomeIcon 
                        icon={faUserMd} 
                        size="5x" 
                        style={{ color: '#ff66b2', marginBottom: '15px', fontWeight: 'bold' }} // Pink color and bold icon
                      />
                      <Card.Title style={{ fontSize: '1.25rem', fontWeight: 'bold', color: 'white' }}>
                        Dr. {doctor.user.firstName} {doctor.user.lastName}
                      </Card.Title>
                      <Card.Text style={{ color: 'white', fontSize: '1rem', marginBottom: '15px' }}>
                        <strong>{doctor.degree}</strong> ({doctor.qualification})
                      </Card.Text>
                      <Button 
                        variant="primary" 
                        onClick={() => {
                          setSelectedDoctor(doctor.doctorId);
                          setDoctorName(`${doctor.user.firstName} ${doctor.user.lastName}`);
                          setShowModal(true);
                        }} 
                        style={{
                          padding: '10px 20px', 
                          fontSize: '1rem', 
                          borderRadius: '20px', 
                          transition: 'background-color 0.3s ease'
                        }}
                        className="btn-hover-effect"
                      >
                        Book Appointment
                      </Button>
                    </Card.Body>
                  </Card>
                ))}
            </div>

            {/* Booking Appointment Modal */}
            <Modal show={showModal} onHide={() => setShowModal(false)} style={modalStyles}>
            <Modal.Header closeButton style={headerStyles}>
              <Modal.Title>Book Appointment with Dr. {doctorName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div>
                <label style={labelStyles}>
                  <FaCalendarAlt style={iconStyles} />
                  Appointment Date:
                </label>
                <input
                  type="datetime-local"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  style={inputStyles}
                />
              </div>
              <div>
                <label style={labelStyles}>
                  <FaPencilAlt style={iconStyles} />
                  Description:
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={textareaStyles}
                />
              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)} style={closeButtonStyles}>
                Close
              </Button>
              <Button variant="primary" onClick={handleBookAppointment} style={modalButtonStyles}>
                Confirm Appointment
              </Button>
            </Modal.Footer>

                {/* Confirmation Modal for Booking */}
                <ConfirmationModal 
                    show={showConfirmation}
                    onHide={() => setShowConfirmation(false)}
                    onConfirm={confirmBooking}
                    actionType="confirm"
                    doctorName={doctorName} // Pass doctorName here
                />
            </Modal>
        </div>
    );
};

export default BookAppointment;
