import React, { useState, useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    const checkAuthentication = async () => {
      const storedAuthToken = localStorage.getItem('authToken');
      if (storedAuthToken) {
        setIsAuthenticated(true);

        try {
          const userResponse = await fetch('http://localhost:8000/api/members/me/', {
            headers: {
              Authorization: `Token ${storedAuthToken}`
            }
          });

          if (userResponse.ok) {
            const user = await userResponse.json();
            setUsername(user.username);
            setAuthToken(storedAuthToken);
          } else {
            setIsAuthenticated(false);
            console.error('Error fetching user details:', userResponse.statusText);
          }
        } catch (error) {
          console.error('Unexpected error fetching user details:', error);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/members/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${authToken}`
        },
      });

      if (response.ok) {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        setAuthToken('');
        toast.success('Logout successful!');
        navigate('/');
      } else {
        console.error('Logout failed:', response.statusText);
        toast.error('Logout failed!');
      }
    } catch (error) {
      console.error('Error during logout:', error.message);
      toast.error('Error during logout!');
    }
  };

  const handleMyTasks = () => {
    navigate('/tasks');
  };

  return (
    <>
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand as={Link} to="/">
            Task Manager
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto"></Nav>
            <Nav>
              {isAuthenticated ? (
                <NavDropdown title={username} id="collapsible-nav-dropdown">
                  <NavDropdown.Item onClick={handleMyTasks}>My Tasks</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  <Link
                    to="/signup"
                    className={`btn btn-outline-primary me-2 ${location.pathname === '/signup' ? 'active' : ''}`}
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className={`btn btn-outline-primary ${location.pathname === '/login' ? 'active' : ''}`}
                  >
                    Login
                  </Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <ToastContainer position="bottom-right" autoClose={5000} />
    </>
  );
};

export default CustomNavbar;
