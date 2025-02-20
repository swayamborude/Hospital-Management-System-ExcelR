import React, { useState,useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { rescheduleAppointment } from '../../../api';
import ConfirmationModal from './Confirmation/ConfirmationModal ';

const RescheduleAppointment = ({ appointment, onClose, onReschedule }) => {
    const [appointmentDate, setAppointmentDate] = useState(appointment.appointmentDate || '');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [doctorName, setDoctorName] = useState('');
    const [doctors, setDoctors] = useState([]);

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
        return hour >= 11 && hour < 20;
    };

    const handleConfirmReschedule = () => {
        if (!appointmentDate) {
            alert("Please select a new appointment date.");
            return;
        }

        if (!isValidAppointmentTime(appointmentDate)) {
            alert("Appointments can only be rescheduled between 11 AM and 8 PM.");
            return;
        }

        // Ensure selectedDoctor exists
        const doctor = doctors.find(doc => doc.doctorId === selectedDoctor);
        if (doctor) {
            setDoctorName(`${doctor.user.firstName} ${doctor.user.lastName}`); // Set the doctor name
        }

        setShowConfirmation(true); // Show confirmation modal
    };

    const confirmReschedule = async () => {
        const appointmentDTO = {
            appointmentId: appointment.appointmentId,
            appointmentDate,
        };

        try {
            await rescheduleAppointment(appointmentDTO);
            onReschedule(appointmentDTO);  // Update the parent with new data
            onClose();  // Close the modal
            setShowConfirmation(false); // Close the confirmation modal
        } catch (error) {
            console.error('Error rescheduling appointment:', error);
            alert('Failed to reschedule appointment');
            setShowConfirmation(false);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Reschedule Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <label>Appointment Date:</label>
                    <input
                        type="datetime-local"
                        value={appointmentDate}
                        onChange={(e) => setAppointmentDate(e.target.value)}
                    />
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
                <Button variant="primary" onClick={handleConfirmReschedule}>Reschedule</Button>
            </Modal.Footer>

            {/* Confirmation Modal for Reschedule */}
            <ConfirmationModal 
                show={showConfirmation}
                onHide={() => setShowConfirmation(false)}
                onConfirm={confirmReschedule}
                actionType="Reschedule"
                doctorName={doctorName} // Pass doctorName here
            />
        </Modal>
    );
};

export default RescheduleAppointment;
