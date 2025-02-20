import React, { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // For navigation

const getAppointmentsForDoctor = async () => {
    const user = JSON.parse(localStorage.getItem('user'));

    if (!user || !user.token) {
        throw new Error('No valid user session found');
    }

    try {
        const response = await axios.get(`http://localhost:9090/api/appointments/doctor`, {
            headers: {
                Authorization: `Bearer ${user.token}`,
            },
        });
        return response.data; // Returns the list of appointments
    } catch (error) {
        console.error('Error fetching doctor appointments:', error);
        throw error;
    }
};

const localizer = momentLocalizer(moment);

const ScheduleCalendar = () => {
    const [events, setEvents] = useState([]);
    const [currentDate, setCurrentDate] = useState(new Date());
    const navigate = useNavigate(); // Hook for navigation

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const appointments = await getAppointmentsForDoctor();
                const mappedEvents = appointments.map((appt) => ({
                    id: appt.id, // Include appointment ID
                    title: `${appt.patient.lastName} - ${appt.description}`,
                    start: new Date(appt.appointmentDate),
                    end: new Date(new Date(appt.appointmentDate).getTime() + 30 * 60 * 1000), // 30-minute duration
                    color: appt.status === 'UPCOMING' ? '#28a745' : '#dc3545',
                }));
                setEvents(mappedEvents);
            } catch (error) {
                console.error('Failed to fetch appointments:', error);
            }
        };
        fetchAppointments();
    }, []);

    const eventStyleGetter = (event) => ({
        style: {
            backgroundColor: event.color,
            color: 'white',
            borderRadius: '5px',
            padding: '5px',
        },
    });

    const handlePrev = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() - 1);
        setCurrentDate(newDate);
    };

    const handleNext = () => {
        const newDate = new Date(currentDate);
        newDate.setMonth(newDate.getMonth() + 1);
        setCurrentDate(newDate);
    };

    const handleEventClick = (event) => {
        // Navigate to DoctorAppointments with the selected appointment ID
        navigate(`/appointments/${event.id}`);
    };

    return (
        <div style={{ display: 'flex', justifyContent: 'center', height: 'calc(100vh - 50px)', padding: '10px' }}>
            <div style={{ width: '90%', maxWidth: '1200px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                    <button
                        onClick={handlePrev}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'navy', // Set icon color to navy blue
                        }}
                    >
                        <FaArrowLeft size={30} />
                    </button>
                    <h2>{moment(currentDate).format('MMMM YYYY')}</h2>
                    <button
                        onClick={handleNext}
                        style={{
                            background: 'transparent',
                            border: 'none',
                            cursor: 'pointer',
                            color: 'navy', // Set icon color to navy blue
                        }}
                    >
                        <FaArrowRight size={30} />
                    </button>
                </div>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: '100%' }}
                    eventPropGetter={eventStyleGetter}
                    views={['month']} // Only show the month view
                    showMultiDayTimes={false}
                    toolbar={false}
                    date={currentDate}
                    onSelectEvent={handleEventClick} // Correct prop for event clicks
                />
            </div>
        </div>
    );
};

export default ScheduleCalendar;
