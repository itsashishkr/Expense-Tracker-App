import { Container, Row, Col, Card } from 'react-bootstrap';

function About() {
  return (
    <Container className="py-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center mb-4">About Expense Tracker</h1>
          <p className="lead text-center">
            Your personal finance companion for better money management.
          </p>
        </Col>
      </Row>

      <Row className="mb-5">
        <Col lg={8} className="mx-auto">
          <p>
            Expense Tracker is a comprehensive financial management tool
            designed to help individuals and businesses track their expenses
            effectively. Our platform provides intuitive tools and insights to
            help you make better financial decisions.
          </p>
        </Col>
      </Row>

      <Row className="g-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Our Mission</Card.Title>
              <Card.Text>
                To empower users with tools and insights for better financial
                management and decision-making.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Features</Card.Title>
              <Card.Text>
                <ul className="list-unstyled">
                  <li>✓ Expense Tracking</li>
                  <li>✓ Category Management</li>
                  <li>✓ Visual Analytics</li>
                  <li>✓ Secure Data Storage</li>
                </ul>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body>
              <Card.Title>Why Choose Us</Card.Title>
              <Card.Text>
                We provide a user-friendly interface combined with powerful
                features to help you take control of your finances.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default About;
