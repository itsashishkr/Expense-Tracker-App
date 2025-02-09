import { Container, Row, Col, Card, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

import expense from '../assets/images/expense.jpg';
import logo from '../assets/images/logo.png';
import security from '../assets/images/security.jpg';
import dashboard from '../assets/images/dashboard.png';

function Home() {
  const { user } = useAuth();

  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <div className="text-center">
            <Image
              src={logo}
              alt="Expense Tracking"
              fluid
              className="mb-4"
              style={{ maxWidth: '400px' }}
            />
          </div>
          <h1 className="text-center mb-4">Welcome to Expense Tracker</h1>
          <p className="text-center lead">
            Take control of your finances with our easy-to-use expense tracking
            solution.
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Img variant="top" src={expense} />
            <Card.Body>
              <Card.Title>Track Expenses</Card.Title>
              <Card.Text>
                Easily log and categorize your daily expenses to understand your
                spending habits.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Img variant="top" src={dashboard} />
            <Card.Body>
              <Card.Title>Visual Analytics</Card.Title>
              <Card.Text>
                View detailed charts and graphs to visualize your spending
                patterns.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Img variant="top" src={security} />
            <Card.Body>
              <Card.Title>Secure & Private</Card.Title>
              <Card.Text>
                Your financial data is encrypted and securely stored in our
                database.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {!user && (
        <div className="text-center mt-5">
          <Link to="/signup" className="btn btn-primary me-3">
            Get Started
          </Link>
          <Link to="/login" className="btn btn-outline-primary">
            Login
          </Link>
        </div>
      )}
    </Container>
  );
}

export default Home;
