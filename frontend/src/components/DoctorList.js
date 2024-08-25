import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        axios.get('/api/doctors/')
            .then(response => setDoctors(response.data))
            .catch(error => console.error('Error fetching doctors', error));
    }, []);

    return (
        <div>
            <h2>Doctors</h2>
            <ul>
                {doctors.map(doctor => (
                    <li key={doctor.id}>{doctor.user.username} - {doctor.specialty}</li>
                ))}
            </ul>
        </div>
    );
};

export default DoctorList;
