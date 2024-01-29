import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoadingButton from './LoadingButton';


const SignUp = () => {

  // State for form fields
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate username length
    if (password.length < 3) {
      toast.error('Username must be at least 3 characters long.');
      setUsername('');
      setEmail('');
      setPassword('');
      return;
    }

    // Validate password length
    if (password.length < 5) {
      toast.error('Password must be at least 5 characters long.');
      setUsername('');
      setEmail('');
      setPassword('');
      return;
    }

    // Create a data object with the form fields
    const formData = {
      username,
      email,
      password,
    };

    try {
      // Send a POST request to the backend API
      const response = await fetch('http://localhost:8000/api/members/signup/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        toast.success('Signup successful!');
        // Clear the form fields
        setUsername('');
        setEmail('');
        setPassword('');
        // Redirect without using useHistory
        window.location.href = '/login';
      } else {
        toast.error('Username already exists or Try again later.');
        setUsername('');
        setEmail('');
        setPassword('');
        return;
      }
    } catch (error) {
      toast.error('Signup failed. Please check your inputs and try again.');
      setUsername('');
      setEmail('');
      setPassword('');
      return;
    }
  };

  return (
    <section className="vh-100">
      <div className="container py-5 h-100">
        <div className="row d-flex align-items-center justify-content-center h-100">
        <h2 className="text-center">SignUp</h2>
          <div className="col-md-8 col-lg-7 col-xl-6">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
              className="img-fluid"
              alt="Phone"
            />
          </div>
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

              {/* Email Input */}
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                Sign Up
              </Button>
            </Form>
          </div>
        </div>
      </div>
      <ToastContainer position="bottom-right" autoClose={5000} />
    </section>
  );
};

export default SignUp;