import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  // State for form fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState();

  // Access the navigate function from the hook
  const navigate = useNavigate();



  useEffect(() => {
    // Check the authentication status and fetch the username
    const checkAuthentication = async () => {
      // Check if there is an authToken in the localStorage
      const authToken = localStorage.getItem('authToken');
  
      // If authToken is present, set IsAuthenticated to true
      if (authToken) {  
          // Replace this with your actual implementation to fetch user details
          const userResponse = await fetch('http://localhost:8000/api/members/me/', {
            headers: {
              Authorization: `Token ${authToken}`
            }
          });
  
          if (userResponse.ok) {
            setIsAuthenticated(true);
            navigate('/tasks');
          }
      }
    };
  
    checkAuthentication();
    setIsAuthenticated(true);
  }, [navigate]);


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAuthenticated(true);

    // Create a data object with the form fields
    const formData = {
      username,
      password,
    };

    try {
      // Send a POST request to the login API
      const response = await fetch('http://localhost:8000/api/members/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        const responseData = await response.json();
        const authToken = responseData.token; // Assuming the server sends the token in the response

        // Store the token in localStorage or sessionStorage
        localStorage.setItem('authToken', authToken);

        console.log('Login successful');
        console.log('isAuthenticate', isAuthenticated);
        // Use useEffect to log the state after it's updated
        // Navigate to the task list page
        navigate('/tasks');
      } else {
        // Assuming the server sends error details in the response JSON
        const errorData = await response.json();
        console.error('Login failed:', errorData);
        toast.error(`Login failed: ${JSON.stringify(errorData.error)}`);
        setUsername('');
        setPassword('');
        return;
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      setUsername('');
      setPassword('');
      return;
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
          
          <h2 className="text-center">Login</h2>
          <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
            <Form onSubmit={handleSubmit}>
              {/* Username input */}
              <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Group>

              {/* Password input */}
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" size="lg" type="submit">
                Login
              </Button>
            </Form>
          </div>
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone"
            />
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} />
    </section>
  );
};

export default Login;
