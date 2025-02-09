import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Alert,
  Image,
} from 'react-bootstrap';
import { useState } from 'react';

import contact from '../assets/images/contact.jpg';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <div className="text-center">
            <Image
              src={contact}
              alt="Contact Us"
              fluid
              className="mb-4"
              style={{ maxWidth: '500px' }}
            />
          </div>
          <h1 className="text-center mb-4">Contact Us</h1>
          <p className="text-center mb-5">
            Have questions? We&apos;d love to hear from you. Send us a message and
            we&apos;ll respond as soon as possible.
          </p>

          {submitted && (
            <Alert variant="success" className="mb-4">
              Thank you for your message! We&apos;ll get back to you soon.
            </Alert>
          )}

          <div className="bg-white p-4 rounded shadow">
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Message</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </Form.Group>

              <Button type="submit" className="w-100">
                Send Message
              </Button>
            </Form>
          </div>

          <div className="mt-5">
            <h3 className="h5 mb-3">Other Ways to Reach Us</h3>
            <p className="mb-1">
              <strong>Email:</strong> support@expensetracker.com
            </p>
            <p className="mb-1">
              <strong>Phone:</strong> (555) 123-4567
            </p>
            <p>
              <strong>Hours:</strong> Monday - Friday, 9:00 AM - 5:00 PM EST
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Contact;
