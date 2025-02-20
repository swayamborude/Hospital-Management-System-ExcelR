import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { cancelAppointment, getAllDoctors } from '../../../api';
import ConfirmationModal from './Confirmation/ConfirmationModal ';

const CancelAppointment = ({ appointment, onClose, onCancel }) => {
    const [doctors, setDoctors] = useState([]);
    const [showConfirmation, setShowConfirmation] = useState(false);

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

    const getDoctorName = (doctorId) => {
        const doctor = doctors.find((doc) => doc.doctorId === doctorId);
        return doctor ? `${doctor.user.firstName} ${doctor.user.lastName}` : 'Doctor information not available';
    };

    const handleConfirmCancel = () => {
        setShowConfirmation(true); // Show confirmation modal
    };

    const confirmCancel = async () => {
        try {
            await cancelAppointment({ appointmentId: appointment.appointmentId });
            onCancel(appointment.appointmentId);  // Update the parent component to remove the appointment
            onClose();  // Close the modal
            setShowConfirmation(false); // Close the confirmation modal
        } catch (error) {
            console.error('Error canceling appointment:', error);
            alert('Failed to cancel appointment');
            setShowConfirmation(false);
        }
    };

    return (
        <Modal show={true} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Cancel Appointment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to cancel the appointment with Dr. {getDoctorName(appointment.doctor.doctorId)}?
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onClose}>Close</Button>
                <Button variant="danger" onClick={handleConfirmCancel}>Cancel Appointment</Button>
            </Modal.Footer>

            {/* Confirmation Modal for Cancel */}
            <ConfirmationModal 
                show={showConfirmation}
                onHide={() => setShowConfirmation(false)}
                onConfirm={confirmCancel}
                actionType="Cancel"
            />
        </Modal>
    );
};

export default CancelAppointment;
