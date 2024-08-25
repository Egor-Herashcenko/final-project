import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function DoctorReviews() {
  const [doctors, setDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [patientName, setPatientName] = useState('');
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/doctors/')
      .then(response => response.json())
      .then(data => setDoctors(data))
      .catch(err => setError('Error loading doctors.'));
  }, []);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/reviews/')
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(err => setError('Error loading reviews.'));
  }, []);

  const handleSubmitReview = () => {
    if (!selectedDoctor || !patientName || !review || rating === 0) {
      setError('Please select a doctor, enter your name, write a review, and select a rating.');
      return;
    }

    fetch('http://127.0.0.1:8000/api/reviews/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        doctor: selectedDoctor,
        patient_name: patientName,
        review: review,
        rating: rating
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Error submitting review.');
        }
        return response.json();
      })
      .then(data => {
        setReviews([...reviews, data]);
        setPatientName('');
        setReview('');
        setRating(0);
      })
      .catch(err => setError('Error submitting review.'));
  };

  return (
    <div style={{
      background: 'url("https://www.example.com/medical-background.jpg") no-repeat center center fixed',
      backgroundSize: 'cover',
      minHeight: '100vh',
      padding: '20px',
      color: '#fff'
    }}>
      <div className="container" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', padding: '20px', borderRadius: '10px' }}>
        <h1 className="text-center mb-4">Doctor Reviews</h1>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="card mb-4">
          <div className="card-body">
            <h5 className="card-title">Leave a Review</h5>
            <div className="mb-3">
              <label className="form-label">Select a Doctor</label>
              <select
                className="form-select"
                value={selectedDoctor}
                onChange={e => setSelectedDoctor(e.target.value)}
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
              <label className="form-label">Your Name</label>
              <input
                type="text"
                className="form-control"
                value={patientName}
                placeholder="Enter your name"
                onChange={e => setPatientName(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Review</label>
              <textarea
                className="form-control"
                value={review}
                placeholder="Write your review..."
                onChange={e => setReview(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Rating</label>
              <select
                className="form-select"
                value={rating}
                onChange={e => setRating(Number(e.target.value))}
              >
                <option value="0">Select a rating</option>
                {[1, 2, 3, 4, 5].map((num) => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>

            <button className="btn btn-primary" onClick={handleSubmitReview}>Submit Review</button>
          </div>
        </div>

        <div>
          <h2 className="mb-4">All Reviews</h2>
          <ul className="list-group">
            {reviews.map((review, index) => (
              <li key={index} className="list-group-item" style={{ borderRadius: '15px', marginBottom: '10px', backgroundColor: '#f8f9fa' }}>
                <strong>{review.patient_name}:</strong> {review.review} <br />
                <span>Rating: {review.rating}</span> - <span>Doctor: {review.doctor_name}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default DoctorReviews;
