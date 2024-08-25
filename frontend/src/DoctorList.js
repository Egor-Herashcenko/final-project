//import React, { useEffect, useState } from 'react';
//import 'bootstrap/dist/css/bootstrap.min.css';
//
//const DoctorList = () => {
//    const [doctors, setDoctors] = useState([]);
//
//    useEffect(() => {
//        fetch('http://127.0.0.1:8000/api/doctors/')
//            .then(response => response.json())
//            .then(data => setDoctors(data))
//            .catch(error => console.error('Error fetching doctors:', error));
//    }, []);
//
//    return (
//        <div className="container mt-5">
//            <h2 className="text-center mb-4">Available Doctors</h2>
//            <div className="row">
//                {doctors.map(doctor => (
//                    <div key={doctor.user} className="col-md-4 mb-3">
//                        <div className="card shadow-sm">
//                            <div className="card-body">
//                                <h5 className="card-title">{doctor.user}</h5>
//                                <p className="card-text"><strong>Specialty:</strong> {doctor.specialty}</p>
//                            </div>
//                        </div>
//                    </div>
//                ))}
//            </div>
//        </div>
//    );
//};
//
//export default DoctorList;




import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch('http://127.0.0.1:8000/api/doctors/')
            .then(response => response.json())
            .then(data => setDoctors(data))
            .catch(error => console.error('Error fetching doctors:', error));
    }, []);

    return (
        <div style={{
            background: 'url("https://www.example.com/medical-background.jpg") no-repeat center center fixed',
            backgroundSize: 'cover',
            minHeight: '100vh',
            padding: '20px',
            color: '#fff'
        }}>
            <div className="container" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '10px' }}>
                <h2 className="text-center mb-4">Available Doctors</h2>
                <div className="row">
                    {doctors.map(doctor => (
                        <div key={doctor.user} className="col-md-4 mb-3">
                            <div className="card" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)' }}>
                                <div className="card-body">
                                    <h5 className="card-title">{doctor.user}</h5>
                                    <p className="card-text">
                                        <strong>Specialty:</strong> {doctor.specialty}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DoctorList;

