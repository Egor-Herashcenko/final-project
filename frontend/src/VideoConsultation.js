import React from 'react';
import { Button, Card } from 'react-bootstrap';

function VideoConsultation() {
  return (
    <div className="container text-center my-5">
      <Card className="shadow-lg p-3 mb-5 bg-white rounded">
        <Card.Body>
          <h1 className="mb-4">Video Consultation</h1>
          <p className="lead">
            Your video consultation is ready to start. Please click the button below to join the call.
          </p>
          <Button variant="primary" size="lg" className="my-4">
            Join Video Call
          </Button>
          <p>
            <small className="text-muted">Make sure your camera and microphone are enabled.</small>
          </p>
        </Card.Body>
      </Card>
    </div>
  );
}

export default VideoConsultation;
