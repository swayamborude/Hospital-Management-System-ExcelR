import { useState, useEffect } from 'react';
import { getAppointmentsForDoctor, submitPrescription } from '../../../api';

const WritePrescription = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedAppointment, setSelectedAppointment] = useState(null);
    const [medicines, setMedicines] = useState([{ name: '', type: '', instructions: '' }]);
    const [diagnoses, setDiagnoses] = useState([{ diagnosis: '', instructions: '' }]);
    const [notes, setNotes] = useState('');
    const prescriptionDate = new Date().toLocaleDateString();

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const data = await getAppointmentsForDoctor();
                setAppointments(data);
            } catch (error) {
                console.error('Error fetching doctor appointments:', error);
            }
        };

        fetchAppointments();
    }, []);

    const handleAddMedicine = () => {
        setMedicines([...medicines, { name: '', type: '', instructions: '' }]);
    };

    const handleRemoveMedicine = (index) => {
        setMedicines(medicines.filter((_, i) => i !== index));
    };

    const handleAddDiagnosis = () => {
        setDiagnoses([...diagnoses, { diagnosis: '', instructions: '' }]);
    };

    const handleRemoveDiagnosis = (index) => {
        setDiagnoses(diagnoses.filter((_, i) => i !== index));
    };

    const handleSubmitPrescription = async () => {
        if (!selectedAppointment) {
            alert('Please select an appointment before submitting a prescription.');
            return;
        }

        const prescriptionDTO = {
            medicines,
            diagnoses,
            notes,
            prescriptionDate,
        };

        try {
            await submitPrescription(selectedAppointment.appointmentId, prescriptionDTO);
            alert('Prescription submitted successfully!');
            setMedicines([{ name: '', type: '', instructions: '' }]);
            setDiagnoses([{ diagnosis: '', instructions: '' }]);
            setNotes('');
            setSelectedAppointment(null);
        } catch (error) {
            console.error('Error submitting prescription:', error);
            alert('Failed to submit the prescription. Please try again.');
        }
    };

    const sectionStyle = {
        border: '1px solid #ccc',
        borderRadius: '8px',
        padding: '15px',
        marginBottom: '20px',
        backgroundColor: '#fff',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    };

    const inputStyle = {
        padding: '10px',
        border: '1px solid #ccc',
        borderRadius: '4px',
        width: '100%',
        marginBottom: '10px',
    };

    const addButtonStyle = {
        padding: '5px 10px',
        fontSize: '0.8rem',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
    };

    const removeButtonStyle = {
        padding: '5px 10px',
        fontSize: '0.8rem',
        borderRadius: '4px',
        cursor: 'pointer',
        backgroundColor: '#dc3545',
        color: '#fff',
        border: 'none',
    };

    return (
        <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto', fontFamily: 'Arial, sans-serif' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px', color: '#333' }}>Write Prescription</h2>

            {/* Select Appointment */}
            <section style={sectionStyle}>
                <h4>Select Appointment</h4>
                <select
                    onChange={(e) => {
                        const appointmentId = parseInt(e.target.value, 10);
                        const appointment = appointments.find(appt => appt.appointmentId === appointmentId);
                        setSelectedAppointment(appointment || null);
                    }}
                    style={inputStyle}
                >
                    <option value="">-- Select an Appointment --</option>
                    {appointments.map(appointment => (
                        <option key={appointment.appointmentId} value={appointment.appointmentId}>
                            {`${appointment.patient.firstName} ${appointment.patient.lastName} - ${new Date(appointment.appointmentDate).toLocaleDateString()}`}
                        </option>
                    ))}
                </select>
            </section>

            {/* Patient and Prescription Details */}
            {selectedAppointment && (
                <section style={sectionStyle}>
                    <h4>Patient Details</h4>
                    <p><strong>Patient Name:</strong> {`${selectedAppointment.patient.firstName} ${selectedAppointment.patient.lastName}`}</p>
                    <p><strong>Problem:</strong> {selectedAppointment.description}</p>
                    <p><strong>Appointment Date:</strong> {new Date(selectedAppointment.appointmentDate).toLocaleDateString()}</p>
                    <p><strong>Prescription Date:</strong> {prescriptionDate}</p>
                </section>
            )}

            {/* Medicines */}
            <section style={sectionStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h4>Medicines</h4>
                    <button type="button" onClick={handleAddMedicine} style={addButtonStyle}>
                        Add Medicine
                    </button>
                </div>
                {medicines.map((medicine, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                            type="text"
                            placeholder="Name"
                            value={medicine.name}
                            onChange={(e) => {
                                const updated = [...medicines];
                                updated[index].name = e.target.value;
                                setMedicines(updated);
                            }}
                            style={inputStyle}
                        />
                        <input
                            type="text"
                            placeholder="Type"
                            value={medicine.type}
                            onChange={(e) => {
                                const updated = [...medicines];
                                updated[index].type = e.target.value;
                                setMedicines(updated);
                            }}
                            style={inputStyle}
                        />
                        <textarea
                            placeholder="Instructions"
                            value={medicine.instructions}
                            onChange={(e) => {
                                const updated = [...medicines];
                                updated[index].instructions = e.target.value;
                                setMedicines(updated);
                            }}
                            style={inputStyle}
                        />
                        <button type="button" onClick={() => handleRemoveMedicine(index)} style={removeButtonStyle}>
                            Remove
                        </button>
                    </div>
                ))}
            </section>

            {/* Diagnoses */}
            <section style={sectionStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <h4>Diagnoses</h4>
                    <button type="button" onClick={handleAddDiagnosis} style={addButtonStyle}>
                        Add Diagnosis
                    </button>
                </div>
                {diagnoses.map((diagnosis, index) => (
                    <div key={index} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                        <input
                            type="text"
                            placeholder="Diagnosis"
                            value={diagnosis.diagnosis}
                            onChange={(e) => {
                                const updated = [...diagnoses];
                                updated[index].diagnosis = e.target.value;
                                setDiagnoses(updated);
                            }}
                            style={inputStyle}
                        />
                        <textarea
                            placeholder="Instructions"
                            value={diagnosis.instructions}
                            onChange={(e) => {
                                const updated = [...diagnoses];
                                updated[index].instructions = e.target.value;
                                setDiagnoses(updated);
                            }}
                            style={inputStyle}
                        />
                        <button type="button" onClick={() => handleRemoveDiagnosis(index)} style={removeButtonStyle}>
                            Remove
                        </button>
                    </div>
                ))}
            </section>

            {/* Notes */}
            <section style={sectionStyle}>
                <h4>Notes</h4>
                <textarea
                    placeholder="Additional Notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    style={{ ...inputStyle, height: '100px' }}
                />
            </section>

            {/* Submit Button */}
            <button type="button" onClick={handleSubmitPrescription} style={addButtonStyle}>
                Submit Prescription
            </button>
        </div>
    );
};

export default WritePrescription;
