import React from 'react';
import './EditProfile.css';

const EditProfile = ({ user, onSave }) => {
    return (
        <div className="edit-profile-container mt-5">
            <h2>Edit Profile</h2>
            <div className="form-container">
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" id="firstName" defaultValue={user.firstName} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" id="lastName" defaultValue={user.lastName} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="gender">Gender:</label>
                        <input type="text" id="gender" defaultValue={user.gender} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="dateOfBirth">Date of Birth:</label>
                        <input type="text" id="dateOfBirth" defaultValue={user.dateOfBirth} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="aadharNumber">Aadhar Number:</label>
                        <input type="text" id="aadharNumber" defaultValue={user.aadharNumber} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input type="text" id="address" defaultValue={user.address} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input type="text" id="city" defaultValue={user.city} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State:</label>
                        <input type="text" id="state" defaultValue={user.state} />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="mobileNumber">Mobile Number:</label>
                        <input type="text" id="mobileNumber" defaultValue={user.mobileNumber} readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="text" id="email" defaultValue={user.email} readOnly />
                    </div>
                </div>
                <button className="save-button" onClick={onSave}>Save</button>
            </div>
        </div>
    );
};

export default EditProfile;
