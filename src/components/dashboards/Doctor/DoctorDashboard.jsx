import './DoctorDashboard.css';
import { FaTachometerAlt, FaCalendarAlt, FaClipboardList, FaUser, FaEnvelope, FaBell, FaMoneyBillWave, FaCog } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import DoctorCarousel from './Carousel';
import EditProfile from './EditProfile'; // Import your EditProfile component
import { getAuthenticatedDoctor } from '../../../api';
import { useNavigate } from 'react-router-dom';
import DoctorAppointments from './DoctorAppointments';
import WritePrescription from './WritePrescription';
import ScheduleCalendar from './ScheduleCalendar'; // Import the ScheduleCalendar component

const DoctorDashboard = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [doctor, setDoctor] = useState(null);
    const [appointments, setAppointments] = useState([]); // State to store appointments
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isEditingProfile, setIsEditingProfile] = useState(false); // New state for editing profile
    const navigate = useNavigate();

    useEffect(() => {
        const fetchDoctorDetails = async () => {
            try {
                const doctorData = await getAuthenticatedDoctor();
                setDoctor(doctorData);
                if (doctorData && doctorData.appointments) {
                    setAppointments(doctorData.appointments); // Set appointments from doctor data
                }
            } catch (error) {
                console.error('Failed to fetch doctor details:', error);
            }
        };

        fetchDoctorDetails();
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
            return <EditProfile user={doctor} onSave={() => setIsEditingProfile(false)} />; // Pass user and a save handler
        }
        switch (activeSection) {
            case 'dashboard':
                return <div className="dashboard"><h1>Dashboard</h1></div>;
            case 'calendar':
                return <ScheduleCalendar appointments={appointments} />; // Render the ScheduleCalendar with appointments
            case 'appointments':
                return <DoctorAppointments />;
            case 'patients':
                return <div className="patients"><h1>Patients</h1></div>;
            case 'prescription':
                return <WritePrescription />;
            case 'notifications':
                return <div className="notifications"><h1>Notifications</h1></div>;
            case 'paymentInfo':
                return <div className="payment-info"><h1>Payment Info</h1></div>;
            case 'settings':
                return <div className="settings"><h1>Settings</h1></div>;
            default:
                return <DoctorCarousel />;
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
                        <li className="nav-item" onClick={() => handleSectionChange('calendar')}>
                            <FaCalendarAlt className="icon" />
                            <span className="ms-2">Schedule</span>
                        </li>
                        <li className="nav-item" onClick={() => handleSectionChange('appointments')}>
                            <FaClipboardList className="icon" />
                            <span className="ms-2">Appointments</span>
                        </li>
                        <li className="nav-item" onClick={() => handleSectionChange('patients')}>
                            <FaUser className="icon" />
                            <span className="ms-2">Patients</span>
                        </li>
                        <li className="nav-item" onClick={() => handleSectionChange('prescription')}>
                            <FaEnvelope className="icon" />
                            <span className="ms-2">Prescription</span>
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
                        <h3>Doctor Dashboard</h3>
                        {doctor && (
                            <div className="profile-icon" onClick={toggleProfileMenu}>
                                <div className="icon-circle">
                                    <span className="icon-text">{doctor.firstName.charAt(0)}{doctor.lastName.charAt(0)}</span>
                                </div>
                                <div className="profile-info">
                                    <h5>{doctor.firstName} {doctor.lastName}</h5>
                                    <p style={{ fontWeight: 'bold' }}>
                                        <span className="status-dot" style={{ backgroundColor: 'green' }}></span>
                                        {doctor.roles[0].name}
                                    </p>
                                </div>
                            </div>
                        )}
                        {showProfileMenu && (
                            <div className="profile-menu">
                                <ul>
                                    <li onClick={handleEditProfile}>Edit Profile</li>
                                    <li>Change Password</li>
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

export default DoctorDashboard;
