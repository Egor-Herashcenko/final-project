import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaInstagram, FaFacebook } from 'react-icons/fa';

function Contact() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="p-4 shadow-lg">
            <Card.Body>
              <h1 className="text-center mb-4">Contact Us</h1>
              <p className="text-center">We are here to assist you with any questions or concerns. Reach out to us through the following channels:</p>
              <hr />
              <Row className="text-center">
                <Col md={6} className="mb-4">
                  <FaPhone size={30} className="mb-2" />
                  <h5>Phone</h5>
                  <p>(+380) 323-3232</p>
                  <p>(+380) 654-7654</p>
                </Col>
                <Col md={6} className="mb-4">
                  <FaEnvelope size={30} className="mb-2" />
                  <h5>Email</h5>
                  <p>info@yourclinic.com</p>
                </Col>
              </Row>
              <hr />
              <div className="text-center">
                <h5>Follow Us</h5>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-3">
                  <FaInstagram size={30} />
                </a>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-3">
                  <FaFacebook size={30} />
                </a>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
