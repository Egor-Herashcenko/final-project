import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ScheduleAppointment() {
  const [doctor, setDoctor] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [patientName, setPatientName] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/doctors/')
      .then(response => response.json())
      .then(data => setDoctors(data))
      .catch(err => setError('Error loading doctors.'));

    fetch('http://127.0.0.1:8000/api/appointments/')
      .then(response => response.json())
      .then(data => setAppointments(data))
      .catch(err => setError('Error loading appointments.'));
  }, []);

  const handleAddAppointment = () => {
    fetch('http://127.0.0.1:8000/api/appointments/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        doctor: doctor,
        date: date,
        time: time,
        patient_name: patientName,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error scheduling appointment.');
        }
        return response.json();
      })
      .then(data => {
        setAppointments([...appointments, data]);
        setDoctor('');
        setDate('');
        setTime('');
        setPatientName('');
      })
      .catch(err => setError('Error scheduling appointment.'));
  };

  const getDoctorNameById = (doctorId) => {
    const doctor = doctors.find(doc => doc.id === doctorId);
    return doctor ? doctor.user : 'Unknown';
  };

  // Добавьте ссылку на изображение здесь
  const backgroundImageUrl = 'https://img.freepik.com/free-vector/clean-medical-background-vector_53876-175203.jpg';

  // Встраиваем стиль фона непосредственно в компонент
  const containerStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100%',
  };

  return (
    <div style={containerStyle}>
      <div className="container mt-5">
        <h1 className="text-center mb-4">Schedule Appointment</h1>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Appointments</h5>
            <ul className="list-group mb-4">
              {appointments.map((appt, index) => (
                <li key={index} className="list-group-item">
                  <strong>{appt.patient_name}</strong> - {appt.date} {appt.time} <br />
                  <span>Doctor: {getDoctorNameById(appt.doctor)}</span>
                </li>
              ))}
            </ul>

            <h5 className="card-title">Schedule a New Appointment</h5>
            <div className="mb-3">
              <label className="form-label">Select a Doctor</label>
              <select
                className="form-select"
                value={doctor}
                onChange={e => setDoctor(e.target.value)}
              >
                <option value="">Select a Doctor</option>
                {doctors.map((doctor, index) => (
                  <option key={index} value={doctor.id}>
                    {doctor.user} - {doctor.specialty}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Date</label>
              <input
                type="date"
                className="form-control"
                value={date}
                onChange={e => setDate(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Time</label>
              <input
                type="time"
                className="form-control"
                value={time}
                onChange={e => setTime(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Patient Name</label>
              <input
                type="text"
                className="form-control"
                value={patientName}
                placeholder="Enter Patient Name"
                onChange={e => setPatientName(e.target.value)}
              />
            </div>

            <button className="btn btn-primary" onClick={handleAddAppointment}>Schedule</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScheduleAppointment;
