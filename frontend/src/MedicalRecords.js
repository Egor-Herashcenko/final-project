import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const MedicalRecords = () => {
    const [isDoctor, setIsDoctor] = useState(null);
    const [formData, setFormData] = useState({
        patient_name: '',
        date_of_birth: '',
        complaints: '',
        prescribed_medications: '',
        current_condition: ''
    });
    const [medicalRecords, setMedicalRecords] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const checkDoctorRole = async () => {
            const token = localStorage.getItem('access_token');

            if (!token) {
                navigate('/login');
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:8000/api/is-doctor/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setIsDoctor(data.is_doctor);
                } else {
                    console.error('Error checking role:', response.statusText);
                    navigate('/not-authorized');
                }
            } catch (error) {
                console.error('Request error:', error);
            }
        };

        const fetchMedicalRecords = async () => {
            const token = localStorage.getItem('access_token');

            try {
                const response = await fetch('http://127.0.0.1:8000/api/medical-records/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setMedicalRecords(data);
                } else {
                    console.error('Error fetching records:', response.statusText);
                }
            } catch (error) {
                console.error('Request error:', error);
            }
        };

        checkDoctorRole();
        fetchMedicalRecords();
    }, [navigate]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('access_token');

        try {
            const response = await fetch('http://127.0.0.1:8000/api/medical-records/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Medical record saved successfully!');
                const newRecordResponse = await response.json();
                setMedicalRecords((prevRecords) => [...prevRecords, newRecordResponse]);

                setFormData({
                    patient_name: '',
                    date_of_birth: '',
                    complaints: '',
                    prescribed_medications: '',
                    current_condition: ''
                });
            } else {
                console.error('Error saving record:', response.statusText);
            }
        } catch (error) {
            console.error('Request error:', error);
        }
    };

    if (isDoctor === null) {
        return <div className="text-center my-5">Loading...</div>;
    }

    if (!isDoctor) {
        return <div className="alert alert-danger text-center">You are not authorized to access this page.</div>;
    }

    return (
        <div className="container my-5">
            <h1 className="text-center mb-4">Medical Records</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <div className="mb-3">
                    <label className="form-label">Patient Name:</label>
                    <input
                        type="text"
                        name="patient_name"
                        value={formData.patient_name}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Date of Birth:</label>
                    <input
                        type="date"
                        name="date_of_birth"
                        value={formData.date_of_birth}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Complaints:</label>
                    <textarea
                        name="complaints"
                        value={formData.complaints}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Prescribed Medications:</label>
                    <textarea
                        name="prescribed_medications"
                        value={formData.prescribed_medications}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Current Condition:</label>
                    <textarea
                        name="current_condition"
                        value={formData.current_condition}
                        onChange={handleChange}
                        className="form-control"
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Save Record</button>
            </form>

            <h2 className="text-center mb-4">Existing Medical Records</h2>
            <ul className="list-group">
                {medicalRecords.map((record) => {
                    const isDefaultDateOfBirth = record.date_of_birth === '2024-08-23';
                    const shouldShowDateOfBirth = record.date_of_birth && !isDefaultDateOfBirth;

                    return (
                        <li key={record.id} className="list-group-item mb-3">
                            {record.patient_name && <p><strong>Patient Name:</strong> {record.patient_name}</p>}
                            {shouldShowDateOfBirth && <p><strong>Date of Birth:</strong> {record.date_of_birth}</p>}
                            {record.complaints && <p><strong>Complaints:</strong> {record.complaints}</p>}
                            {record.prescribed_medications && <p><strong>Prescribed Medications:</strong> {record.prescribed_medications}</p>}
                            {record.current_condition && <p><strong>Current Condition:</strong> {record.current_condition}</p>}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default MedicalRecords;
