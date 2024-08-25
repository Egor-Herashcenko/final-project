import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';

function Home() {
  return (
    <div className="home-container text-center d-flex align-items-center justify-content-center">
      <div className="content">
        <h1 className="display-4 text-white">Welcome to Our Clinic</h1>
        <p className="lead text-white">Your health is our priority. We offer top-notch medical care.</p>
      </div>
    </div>
  );
}

export default Home;
