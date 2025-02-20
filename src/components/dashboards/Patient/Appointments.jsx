import React, { useState, useEffect } from 'react';
import { getAllDoctors, getAppointmentsForPatient } from '../../../api';
import { Button, Table } from 'react-bootstrap';
import RescheduleAppointment from './RescheduleAppointment';
import CancelAppointment from './CancelAppointment';
import BookAppointment from './BookAppointment';
import './appointment.css';

const Appointments = () => {
    const [appointment, setAppointment] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [currentAppointment, setCurrentAppointment] = useState(null);
    const [showRescheduleModal, setShowRescheduleModal] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [view, setView] = useState('appointments'); // Track the current view
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Fetch patient appointments
    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await getAppointmentsForPatient();
                setAppointment(response);
            } catch (error) {
                console.error('Error fetching appointments:', error);
            }
        };
        fetchAppointments();
    }, []);

    // Fetch all doctors
    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const doctorData = await getAllDoctors();
                setDoctors(doctorData);
            } catch (error) {
                console.error('Failed to fetch doctors');
            }
        };
        fetchDoctors();
    }, []);

    const getDoctorName = (doctorId) => {
        const doctor = doctors.find((doc) => doc.doctorId === doctorId);
        return doctor ? `${doctor.user.firstName} ${doctor.user.lastName}` : 'Doctor information not available';
    };

    const handleReschedule = (appointment) => {
        setCurrentAppointment(appointment);
        setShowRescheduleModal(true);
    };

    const handleCancelAppointment = (appointment) => {
        setCurrentAppointment(appointment);
        setShowCancelModal(true);
    };

    const handleRescheduleSuccess = (updatedAppointment) => {
        setSuccessMessage(`Your appointment Initially scheduled on ${(updatedAppointment.appointmentDate)} is successfully rescheduled!`);
        setShowSuccess(true);
        updateAppointments(updatedAppointment);
        setTimeout(() => {
            setShowSuccess(false);
        }, 3000);
    };

    const handleCancelSuccess = (appointmentId) => {
        setSuccessMessage(`Your appointment booked on ${(currentAppointment.appointmentDate)} is successfully canceled!`);
        setShowSuccess(true);
        removeAppointment(appointmentId);
        setTimeout(() => {
            setShowSuccess(false);
        }, 5000);
    };

    const updateAppointments = (updatedAppointment) => {
        setAppointment(appointment.map((app) =>
            app.appointmentId === updatedAppointment.appointmentId ? updatedAppointment : app
        ));
    };

    const removeAppointment = (appointmentId) => {
        setAppointment(appointment.filter(app => app.appointmentId !== appointmentId));
    };

    return (
        <div>
            {/* Success Message */}
            {showSuccess && (
                <h5 className="success-message">
                    {successMessage}
                </h5>
            )}

            {/* Top buttons for navigation */}
            <center>
                <div className="mb-3">
                    <Button 
                        style={{'backgroundColor':'blue'}}
                        onClick={() => setView('bookAppointment')} 
                        className="btn-custom mx-2">
                        Book Appointment
                    </Button>
                    <Button 
                        style={{'backgroundColor':'red'}} 
                        onClick={() => setView('appointments')} 
                        className="btn-custom mx-2">
                        My Appointments
                    </Button>
                    <Button 
                        style={{'backgroundColor':'navy'}}
                        onClick={() => setView('prescriptions')} 
                        className="btn-custom mx-2">
                        My Prescriptions
                    </Button>
                </div>
            </center>


            {/* Conditional rendering based on selected view */}
            {view === 'appointments' && (
                <div>
                    <h2>Your Appointments</h2>
                    <br/>
                    {appointment.length > 0 ? (
                        <Table>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Booked on</th>
                                    <th>Reason</th>
                                    <th>Doctor Name</th>
                                    <th>Appointment Date</th>
                                    <th colSpan={2} style={{ textAlign: 'center' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {appointment.map((appointment) => (
                                    <tr key={appointment.appointmentId}>
                                        <td>{appointment.appointmentId}</td>
                                        <td>{appointment.bookedDate || new Date().toLocaleString()}</td>
                                        <td>{appointment.description}</td>
                                        <td>{appointment.doctor ? getDoctorName(appointment.doctor.doctorId) : 'Doctor information not available'}</td>
                                        <td>{appointment.appointmentDate}</td>
                                        <td>
                                            <Button variant="warning" size="sm" onClick={() => handleReschedule(appointment)}>
                                                Reschedule
                                            </Button>
                                        </td>
                                        <td>
                                            <Button variant="danger" size="sm" onClick={() => handleCancelAppointment(appointment)}>
                                                Cancel
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    ) : (
                        <p>No appointments found.</p>
                    )}

                    {/* Reschedule and Cancel modals */}
                    {showRescheduleModal && currentAppointment && (
                        <RescheduleAppointment
                            appointment={currentAppointment}
                            doctors={doctors}
                            onClose={() => setShowRescheduleModal(false)}
                            onReschedule={handleRescheduleSuccess}
                        />
                    )}
                    {showCancelModal && currentAppointment && (
                        <CancelAppointment
                            appointment={currentAppointment}
                            onClose={() => setShowCancelModal(false)}
                            onCancel={handleCancelSuccess}
                        />
                    )}
                </div>
            )}

            {view === 'bookAppointment' && (
                <BookAppointment
                    doctors={doctors}
                />
            )}

            {view === 'prescriptions' && (
                <div>
                    <h2>Your Prescriptions</h2>
                    <p>No prescriptions available.</p>
                </div>
            )}
        </div>
    );
};

export default Appointments;
