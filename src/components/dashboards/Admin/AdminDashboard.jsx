import './AdminDashboard.css';
import {
    FaTachometerAlt, FaUsers, FaFileAlt, FaChartLine, FaCog, FaBell,
    FaMoneyBillWave, FaEnvelope, FaUserMd, FaUser, FaClipboardList
} from 'react-icons/fa';
import { useState, useEffect } from 'react';
import AdminCarousel from './AdminCarousel';
import EditProfile from './EditProfile';
import { getAuthenticatedAdmin } from '../../../api'; // Fetch admin details
import { useNavigate } from 'react-router-dom';
import AllDoctors from './AllDoctors';
import AllPatients from './AllPatients';

const AdminDashboard = () => {
    const [activeSection, setActiveSection] = useState(null);
    const [admin, setAdmin] = useState(null);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [showManageUsersSubmenu, setShowManageUsersSubmenu] = useState(false); // State for Manage Users dropdown
    const [showReportsSubmenu, setShowReportsSubmenu] = useState(false); // State for Reports dropdown
    const navigate = useNavigate();

    useEffect(() => {
        const fetchAdminDetails = async () => {
            try {
                const adminData = await getAuthenticatedAdmin();
                setAdmin(adminData);
            } catch (error) {
                console.error('Failed to fetch admin details:', error);
            }
        };

        fetchAdminDetails();
    }, []);

    const handleSectionChange = (section) => {
        setActiveSection(section);
        setShowManageUsersSubmenu(false);
        setShowReportsSubmenu(false);
    };

    const toggleProfileMenu = () => {
        setShowProfileMenu(!showProfileMenu);
    };

    const handleEditProfile = () => {
        setIsEditingProfile(true);
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        alert("Logged out");
        navigate('/login');
    };

    const toggleManageUsersSubmenu = () => {
        setShowManageUsersSubmenu(!showManageUsersSubmenu);
    };

    const toggleReportsSubmenu = () => {
        setShowReportsSubmenu(!showReportsSubmenu);
    };

    const renderContent = () => {
        if (isEditingProfile) {
            return <EditProfile user={admin} onSave={() => setIsEditingProfile(false)} />;
        }
        switch (activeSection) {
            case 'dashboard':
                return <div className="dashboard"><h1>Admin Dashboard</h1></div>;
            case 'manageDoctors':
                return <AllDoctors></AllDoctors>
            case 'manageUsers':
                return <AllPatients/>
            case 'manageAdmins':
                return <div className="manage-admins"><h1>Manage Admins</h1></div>;
            case 'appointmentsReport':
                return <div className="appointments-report"><h1>Appointments Report</h1></div>;
            case 'prescriptionsReport':
                return <div className="prescriptions-report"><h1>Prescriptions Report</h1></div>;
            case 'analytics':
                return <div className="analytics"><h1>Analytics</h1></div>;
            case 'billing':
                return <div className="billing"><h1>Billing Information</h1></div>;
            case 'messages':
                return <div className="messages"><h1>Messages</h1></div>;
            case 'notifications':
                return <div className="notifications"><h1>Notifications</h1></div>;
            case 'systemSettings':
                return <div className="system-settings"><h1>System Settings</h1></div>;
            default:
                return <AdminCarousel />;
        }
    };

    return (
        <div className="dashboard">
            <div className="background-image"></div>
            <div className="sidebar">
                <div className="logo">
                    <h1 className="text-white">AdminPanel</h1>
                </div>
                <nav style={{ width: '200px' }}>
                    <ul className="list-unstyled nav-items">
                        <li className="nav-item" onClick={() => handleSectionChange('dashboard')}>
                            <FaTachometerAlt className="icon" />
                            <span className="ms-2">Dashboard</span>
                        </li>
                        <li className="nav-item" onClick={toggleManageUsersSubmenu}>
                            <FaUsers className="icon" />
                            <span className="ms-2">Manage Users</span>
                        </li>
                        {/* Dropdown for Manage Users */}
                        {showManageUsersSubmenu && (
                            <ul className="submenu show">
                                <li className="nav-subitem" onClick={() => handleSectionChange('manageDoctors')}>
                                    <FaUserMd className="icon" />
                                    <span className="ms-2">Doctors</span>
                                </li>
                                <li className="nav-subitem" onClick={() => handleSectionChange('manageUsers')}>
                                    <FaUser className="icon" />
                                    <span className="ms-2">Patients</span>
                                </li>
                                <li className="nav-subitem" onClick={() => handleSectionChange('manageAdmins')}>
                                    <FaUser className="icon" />
                                    <span className="ms-2">Admins</span>
                                </li>
                            </ul>
                        )}
                        <li className="nav-item" onClick={toggleReportsSubmenu}>
                            <FaFileAlt className="icon" />
                            <span className="ms-2">Reports</span>
                        </li>
                        {/* Dropdown for Reports */}
                        {showReportsSubmenu && (
                            <ul className="submenu show">
                                <li className="nav-subitem" onClick={() => handleSectionChange('appointmentsReport')}>
                                    {/* <FaClipboardList className="icon" /> */}
                                    <p className="ms-4">Appointments</p>
                                </li>
                                <li className="nav-subitem" onClick={() => handleSectionChange('prescriptionsReport')}>
                                    {/* <FaClipboardList className="icon" /> */}
                                    <p className="ms-4">Prescriptions</p>
                                </li>
                            </ul>
                        )}
                        <li className="nav-item" onClick={() => handleSectionChange('analytics')}>
                            <FaChartLine className="icon" />
                            <span className="ms-2">Analytics</span>
                        </li>
                        <li className="nav-item" onClick={() => handleSectionChange('billing')}>
                            <FaMoneyBillWave className="icon" />
                            <span className="ms-2">Billing</span>
                        </li>
                        <li className="nav-item" onClick={() => handleSectionChange('messages')}>
                            <FaEnvelope className="icon" />
                            <span className="ms-2">Messages</span>
                        </li>
                        <li className="nav-item" onClick={() => handleSectionChange('notifications')}>
                            <FaBell className="icon" />
                            <span className="ms-2">Notifications</span>
                        </li>
                        <li className="nav-item" onClick={() => handleSectionChange('systemSettings')}>
                            <FaCog className="icon" />
                            <span className="ms-2">System Settings</span>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="main-content">
                <div className='header'>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3>Admin Dashboard</h3>
                        {admin && (
                            <div className="profile-icon" onClick={toggleProfileMenu}>
                                <div className="icon-circle">
                                    <span className="icon-text">{admin.firstName.charAt(0)}{admin.lastName.charAt(0)}</span>
                                </div>
                                <div className="profile-info">
                                    <h5>{admin.firstName} {admin.lastName}</h5>
                                    <p style={{ fontWeight: 'bold' }}>
                                        <span className="status-dot" style={{ backgroundColor: 'green' }}></span>
                                        {admin.roles[0].name}
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

export default AdminDashboard;
