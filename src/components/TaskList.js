import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { Table, Pagination, Form, Button } from 'react-bootstrap';
import { PencilSquare, Trash } from 'react-bootstrap-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [tasksPerPage] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const authToken = localStorage.getItem('authToken');
  const navigate = useNavigate();

  const handleDelete = async (id) => {
    try {
      // Send delete request to API
      await axios.delete(`http://localhost:8000/api/tasks/${id}/`, {
        headers: {
          Authorization: `Token ${authToken}`
        }
      });
      toast.success('Task deleted successfully!');
      // Optionally, you can refresh the task list after deletion
      // Refetch tasks or update the state to remove the deleted task
      fetchTasks(currentPage);
      navigate('/tasks');
    } catch (error) {
      // Handle error
      // Show error toast
      toast.error('An error occurred when task delete!');
    }
  };

  const fetchTasks = async (page, search = '') => {
    try {
      const response = await axios.get(`http://localhost:8000/api/tasks/?page=${page}&search=${search}`, {
        headers: {
          Authorization: `Token ${authToken}`
        }
      });
      setTasks(response.data.results);
      setTotalPages(Math.ceil(response.data.count / tasksPerPage));
      setCurrentPage(page);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (authToken) {
      fetchTasks(currentPage);
    }
  }, [authToken, currentPage,]);

  const isOverdue = (dueDate) => {
    const currentDate = new Date();
    const taskDueDate = new Date(dueDate);
    return currentDate > taskDueDate;
  };

  const paginate = (pageNumber) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      fetchTasks(pageNumber, searchTerm);
    }
  };

  const handleSearch = () => {
    fetchTasks(1, searchTerm);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4 mt-3">
        <h2 className="text-2xl font-semibold">Task List</h2>

      </div>
      <div className="d-flex align-items-center justify-content-between">
      <div className="d-flex align-items-center mt-4">
        <Form className="mb-0 me-2">
          <Form.Group className="mb-0" controlId="searchTerm">
            <Form.Control
              type="text"
              placeholder="Search tasks"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Form.Group>
        </Form>
        <Button variant="primary" onClick={handleSearch} className="me-2">
          Search
        </Button>
      </div>
      <Link to="/tasks/create" className="btn btn-dark bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        Create Task
      </Link>
    </div>
    <br></br>

      {Array.isArray(tasks) && tasks.length > 0 ? (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Status</th>
                <th>Due Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => (
                <tr key={task.id}>
                  <td>{task.id}</td>
                  <td>{task.title}</td>
                  <td>{task.description}</td>
                  <td>
                    {task.status === 'COMPLETED' && isOverdue(task.due_date) ? (
                      <span className="text-dark">COMPLETED</span>
                    ) : (
                      isOverdue(task.due_date) ? (
                        <span className="text-dark">OVERDUE</span>
                      ) : (
                        task.status
                      )
                    )}
                  </td>
                  <td>{task.due_date}</td>
                  <td>
                    <Link to={`/tasks/edit/${task.id}`} className={`btn btn-outline-primary me-2 bg-blue-700 hover:bg-blue-700 text-dark font-bold py-2 px-4 rounded`}>
                      <PencilSquare className="me-1" />
                      Edit
                    </Link>
                    <Link
                      to={`/tasks/delete/${task.id}`}
                      className={`btn btn-outline-primary me-2 bg-blue-700 hover:bg-blue-700 text-dark font-bold py-2 px-4 rounded`}
                      onClick={() => handleDelete(task.id)}
                    >
                      <Trash className="me-1" />
                      Delete
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            {Array.from({ length: totalPages }).map((_, index) => (
              <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        </>
      ) : (
        <p>No tasks found.</p>
      )}
      <ToastContainer />
    </div>
  );
}

export default TaskList;
