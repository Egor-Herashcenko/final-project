import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import MedicalRecords from './MedicalRecords';
import DoctorReviews from './DoctorReviews';
import VideoConsultation from './VideoConsultation';
import ScheduleAppointment from './ScheduleAppointment';
import Register from './Register';
import Login from './Login';
import Logout from './Logout';
import DoctorList from './DoctorList';
import NotAuthorized from './NotAuthorized';

function App() {
  return (
    <Router>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">My Clinic</Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/doctors">View Doctors</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/medical-records">Medical Records</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reviews">Doctor Reviews</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/video-consultation">Video Consultation</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/scheduling">Schedule Appointment</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/logout">Logout</Link>
            </li>
          </ul>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/medical-records" element={<MedicalRecords />} />
        <Route path="/reviews" element={<DoctorReviews />} />
        <Route path="/video-consultation" element={<VideoConsultation />} />
        <Route path="/scheduling" element={<ScheduleAppointment />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/not-authorized" element={<NotAuthorized />} />
      </Routes>
    </Router>
  );
}

export default App;
