import React from 'react';
import { useNavigate } from 'react-router-dom';

const RoleSelection = () => {
    const navigate = useNavigate();

    const handleRoleSelection = (role) => {
        if (role === 'doctor') {
            navigate('/doctor-dashboard'); // Navigate to Doctor Dashboard
        } else if (role === 'patient') {
            navigate('/patient-dashboard'); // Navigate to Patient Dashboard
        }
    };

    return (
        <div className="role-selection-container">
            <h2>Select Your Role</h2>
            <button onClick={() => handleRoleSelection('doctor')}>Login as Doctor</button>
            <button onClick={() => handleRoleSelection('patient')}>Login as Patient</button>
        </div>
    );
};

export default RoleSelection;