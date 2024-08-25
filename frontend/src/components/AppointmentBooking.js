import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AppointmentBooking = () => {
    const [doctors, setDoctors] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [date, setDate] = useState('');
    const [reason, setReason] = useState('');

    useEffect(() => {
        axios.get('/api/doctors/')
            .then(response => setDoctors(response.data))
            .catch(error => console.error('Error fetching doctors', error));
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/appointments/', { doctor: selectedDoctor, date, reason })
            .then(response => alert('Appointment booked!'))
            .catch(error => console.error('Error booking appointment', error));
    };

    return (
        <div>
            <h2>Book an Appointment</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Select Doctor:
                    <select value={selectedDoctor} onChange={e => setSelectedDoctor(e.target.value)}>
                        {doctors.map(doctor => (
                            <option key={doctor.id} value={doctor.id}>{doctor.user.username}</option>
                        ))}
                    </select>
                </label>
                <label>
                    Date and Time:
                    <input type="datetime-local" value={date} onChange={e => setDate(e.target.value)} />
                </label>
                <label>
                    Reason:
                    <textarea value={reason} onChange={e => setReason(e.target.value)} />
                </label>
                <button type="submit">Book Appointment</button>
            </form>
        </div>
    );
};

export default AppointmentBooking;
