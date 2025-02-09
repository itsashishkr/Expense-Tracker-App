/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5 login-container">
      <Row className="justify-content-center ">
        <Col md={6}>
          <div className="p-4 rounded shadow box_container">
            <h2 className="text-center mb-4 text-white">Login</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label className="text-white">Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label className="text-white">Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
              </Form.Group>

              <Button type="submit" className="w-100" disabled={loading}>
                {loading ? 'Logging in...' : 'Login'}
              </Button>
            </Form>
            <div className="text-center mt-3 text-white">
              <p>
                Don&apos;t have an account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
