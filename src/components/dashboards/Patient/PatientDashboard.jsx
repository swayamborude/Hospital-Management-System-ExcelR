import './PatientDashboard.css';
import { FaTachometerAlt, FaCalendarAlt, FaClipboardList, FaUser, FaBell, FaMoneyBillWave, FaCog } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import PatientCarousel from './Carousel';
import { useNavigate } from 'react-router-dom';
import { getAuthenticatedPatient } from '../../../api'; // API call to fetch authenticated patient details
import RescheduleAppointment from './RescheduleAppointment';
import Appointments from './Appointments';
import CancelAppointment from './CancelAppointment';
import BookAppointment from './BookAppointment';
const PatientDashboard = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [patient, setPatient] = useState(null);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isEditingProfile, setIsEditingProfile] = useState(false); // New state for editing profile
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const patientData = await getAuthenticatedPatient();
                setPatient(patientData);
            } catch (error) {
                console.error('Failed to fetch patient details:', error);
            }
        };

        fetchPatientDetails();
    }, []);

    const handleSectionChange = (section) => {
        setActiveSection(section);
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    const handleEditProfile = () => {
        setIsEditingProfile(true); // Show the EditProfile component
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        alert("Logged out");
        navigate('/login');
    };

    const renderContent = () => {
        if (isEditingProfile) {
            return <div>Edit Profile</div>; // Replace with actual EditProfile component later
        }
        switch (activeSection) {
            case 'dashboard':
                return <div className="dashboard"><h1>Dashboard</h1></div>;
            case 'appointments':
                return <div className="appointments">
                                <Appointments />  
                        </div>;
            case 'notifications':
                return <div className="notifications"><h1>Notifications</h1></div>;
            case 'paymentInfo':
                return <div className="payment-info"><h1>Payment Info</h1></div>;
            case 'settings':
                return <div className="settings"><h1>Settings</h1></div>;
            default:
                return <PatientCarousel />;
        }
    };

    return (
        <div className="dashboard">
            <div className="background-image"></div>
            <div className="sidebar">
                <div className="logo">
                    <h1 className="text-white">WellNest</h1>
                </div>
                <nav style={{ width: '200px' }}>
                    <ul className="list-unstyled nav-items">
                        <li className="nav-item" onClick={() => handleSectionChange('dashboard')}>
                            <FaTachometerAlt className="icon" />
                            <span className="ms-2">My Dashboard</span>
                        </li>
                        <li className="nav-item" onClick={() => handleSectionChange('appointments')}>
                            <FaClipboardList className="icon" />
                            <span className="ms-2">Appointments</span>
                        </li>
                        <li className="nav-item" onClick={() => handleSectionChange('notifications')}>
                            <FaBell className="icon" />
                            <span className="ms-2">Notifications</span>
                        </li>
                        <li className="nav-item" onClick={() => handleSectionChange('paymentInfo')}>
                            <FaMoneyBillWave className="icon" />
                            <span className="ms-2">Payment Info</span>
                        </li>
                        <li className="nav-item" onClick={() => handleSectionChange('settings')}>
                            <FaCog className="icon" />
                            <span className="ms-2">Settings</span>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="main-content">
                <div className='header'>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3>Patient Dashboard</h3>
                        {patient && (
                            <div className="profile-icon" onClick={toggleProfileMenu}>
                                <div className="icon-circle">
                                    <span className="icon-text">{patient.firstName.charAt(0)}{patient.lastName.charAt(0)}</span>
                                </div>
                                <div className="profile-info">
                                    <h5>{patient.firstName} {patient.lastName}</h5>
                                    <p style={{ fontWeight: 'bold' }}>
                                        <span className="status-dot" style={{ backgroundColor: 'green' }}></span>
                                        Patient
                                    </p>
                                </div>
                            </div>
                        )}
                        {showProfileMenu && (
                            <div className="profile-menu">
                                <ul>
                                    <li onClick={handleEditProfile}>Edit Profile</li>
                                    <li onClick={handleLogout} style={{ color: 'red' }}>Logout</li>
                                </ul>
                            </div>
                        )}
                    </div>
                </div>

                <div className='body-section'>
                    <div className="carousel-section">
                        {renderContent()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PatientDashboard;
