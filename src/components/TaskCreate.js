import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';


function TaskCreate() {
  const authToken = localStorage.getItem('authToken');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [statusChoices, setStatusChoices] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    if (!authToken) {
      // Redirect to the login page
      window.href('/login');
    }
    // Fetch status choices from API
    axios.get('http://localhost:8000/api/status-choices/', {
      headers: {
        Authorization: `Token ${authToken}`
      }
    })
      .then(response => {
        setStatusChoices(response.data);
      })
      .catch(error => console.error(error));
  }, [authToken]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send task creation request to API
      await axios.post(
        'http://localhost:8000/api/tasks/',
        {
          title,
          description,
          due_date: dueDate,
          ...(selectedStatus && { status: selectedStatus }),
        },
        {
          headers: {
            Authorization: `Token ${authToken}`
          }
        }
      );

      // Redirect to task list page after successful creation
      navigate('/tasks'); 

    } catch (error) {
      console.error(error);
      // Handle error (e.g., display an error message to the user)
    }
  };

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold pt-5">Create Task</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="dueDate">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="status">
          <Form.Label>Status</Form.Label>
          <Form.Control
            as="select"
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
          {Array.isArray(statusChoices.choices) && statusChoices.choices.length > 0 ? (
            [
              <option key="" value="">Select Status</option>,
              ...statusChoices.choices.map((status) => (
                <option key={status.value} value={status.value}>
                  {status.display_name}
                </option>
              ))
            ]
          ) : (
            <option key="" value="" disabled>No Status Available</option>
          )}



          </Form.Control>
        </Form.Group>

        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default TaskCreate;
