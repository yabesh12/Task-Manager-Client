import React, { useState,useEffect } from 'react';
import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';


const CustomNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // For the sake of example, assuming the user is not authenticated initially
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [username, setUsername] = useState('');
  const [authToken, setAuthtoken] = useState('');

  console.log(isAuthenticated);
  
  useEffect(() => {
    // Check the authentication status and fetch the username
    const checkAuthentication = async () => {
      // Check if there is an authToken in the localStorage
      const authToken = localStorage.getItem('authToken');
  
      // If authToken is present, set IsAuthenticated to true
      if (authToken) {
        setIsAuthenticated(true);
  
        try {
          // Replace this with your actual implementation to fetch user details
          const userResponse = await fetch('http://localhost:8000/api/members/me/', {
            headers: {
              Authorization: `Token ${authToken}`
            }
          });
  
          if (userResponse.ok) {
            const user = await userResponse.json();
            setUsername(user.username);
            setAuthtoken(authToken);
          } else {
            // Handle error if fetching user details fails
            setIsAuthenticated(false);
            console.error('Error fetching user details:', userResponse.statusText);
          }
        } catch (error) {
          // Handle unexpected errors
          console.error('Unexpected error fetching user details:', error);
        }
      } else {
        // If authToken is not present, set IsAuthenticated to false
        setIsAuthenticated(false);
      }
    };
  
    checkAuthentication();
  }, [isAuthenticated, navigate]);
  
  

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/members/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Token ${authToken}`,
        },
      });

      if (response.ok) {
        // Logout successful, redirect to home page
        // Redirect without using useHistory
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        navigate('/');
      } else {
        // Handle logout failure
        console.error('Logout failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during logout:', error.message);
    }
  };

  const handleMyTasks = () => {
    // Navigate to "/tasks"
    navigate('/tasks');
  };

  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <Container>
        <Navbar.Brand as={Link} to="/">
          Task Manager
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">{/* Add your Nav items for the left side here if needed */}</Nav>
          <Nav>
            {isAuthenticated ? (
                <NavDropdown title={username} id="collapsible-nav-dropdown">
                  {/* Add authenticated user-specific dropdown content here */}
                  <NavDropdown.Item onClick={handleMyTasks}>My Tasks</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
              <>
              <Link to="/signup" className={`btn btn-outline-primary me-2 ${location.pathname === '/signup' ? 'btn btn-primary' : ''}`}>
                Sign Up
              </Link>
              <Link to="/login" className={`btn btn-outline-primary ${location.pathname === '/login' ? 'btn btn-primary' : ''}`}>
                Login
              </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
