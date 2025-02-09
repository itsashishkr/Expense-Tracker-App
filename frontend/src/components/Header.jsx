import { Navbar, Nav, Container, Image } from 'react-bootstrap';
import { Link, useNavigate} from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/images/logo2.png'

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-dark">
      <Container>
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
          <Image
            src={logo}
            alt="Expense Tracker Logo"
            width="130"
            height="50"
            className="d-inline-block align-top me-2"
            style={{ borderRadius: '10%'}}
          />
          Expense Tracker
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto nav_style">
            <Nav.Link
              as={Link}
              to="/"
              className={
                location.pathname === '/'
                  ? 'nav_style_link active'
                  : 'nav_style_link'
              }
            >
              Home
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/about"
              className={
                location.pathname === '/about'
                  ? 'nav_style_link active'
                  : 'nav_style_link'
              }
            >
              About
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/contact"
              className={
                location.pathname === '/contact'
                  ? 'nav_style_link active'
                  : 'nav_style_link'
              }
            >
              Contact
            </Nav.Link>
            {user && (
              <Nav.Link
                as={Link}
                to="/dashboard"
                className={
                  location.pathname === '/dashboard'
                    ? 'nav_style_link active'
                    : 'nav_style_link'
                }
              >
                Dashboard
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {user ? (
              <>
                <span className="nav-link" style={{ color: 'red' }}>
                  Welcome, {user.name}
                </span>
                <Nav.Link onClick={handleLogout} className="btn btn-danger">
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className="btn btn-danger">
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className="btn btn-danger">
                  Sign Up
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default Header;
