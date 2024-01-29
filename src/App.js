// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Updated import
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import Signup from './components/Signup';
import Login from './components/Login';
import TaskList from './components/TaskList';
import TaskCreate from './components/TaskCreate';
import TaskEdit from './components/TaskEdit';
import Toast from './components/Toast';

const App = () => {
  // Sample tasks for demonstration


  return (
    <Router>
      <div>
        <Navbar />

        {/* Main content */}
        <div className="container-fluid mt-4">
          <Routes> {/* Use Routes instead of Switch */}
            <Route path="/" element={<HeroSection />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/tasks/create" element={<TaskCreate />} />
            <Route path="/tasks/edit/:id" element={<TaskEdit />} />
          </Routes>
        </div>

        {/* Toast component for displaying messages */}
        <Toast message="Task saved successfully!" type="success" />
      </div>
    </Router>
  );
};

export default App;
