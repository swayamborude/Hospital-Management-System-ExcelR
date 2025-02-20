import { useEffect, useState } from 'react';
import { getAppointmentsForDoctor } from '../../../api';
import WritePrescription from './WritePrescription';

const DoctorAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [error, setError] = useState(null);
    const [selectedAppointment, setSelectedAppointment] = useState(null); // Track selected appointment

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await getAppointmentsForDoctor();
                setAppointments(data);
            } catch (error) {
                setError('Failed to load appointments');
                console.error('Error fetching doctor appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    // Handler for the "Write Prescription" button
    const handleWritePrescription = (appointment) => {
        // Set the selected appointment to be passed to the WritePrescription component
        setSelectedAppointment(appointment);
    };

    return (
        <div>
            <h1>Appointments</h1>
            {error && <p>{error}</p>}
            <table className="table">
                <thead>
                    <tr>
                        <th>Patient Name</th>
                        <th>Appointment Date</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <tr key={appointment.appointmentId}>
                                <td>{`${appointment.patient.firstName} ${appointment.patient.lastName}`}</td>
                                <td>{new Date(appointment.appointmentDate).toLocaleString()}</td>
                                <td>{appointment.description}</td>
                                <td>{appointment.status}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleWritePrescription(appointment)}
                                    >
                                        Write Prescription
                                    </button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5">No appointments found</td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Conditionally render WritePrescription component if an appointment is selected */}
            {selectedAppointment && <WritePrescription appointment={selectedAppointment} />}
        </div>
    );
};

export default DoctorAppointments;
