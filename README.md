# TaskManagerClient - Frontend Overview

TaskManagerClient is the user interface for a React.js-based Task Management System, enabling easy task management with features like creation, editing, deletion, status tracking, and sorting, all linked to the 'TaskManager' backend..


### Setup
1. **React.js Project:** The frontend is set up as a React.js project named "task-manager-client."

### Key Features

1. **Task Management:**


   - View a List of Tasks
   - Add New Task
   - Edit Existing Task
   - Delete Task
   - Mark Tasks as Complete or Incomplete
   - If the task' current date is beyond the due date, Task will be marked as 'OVERDUE'


### Additional Features 

1. **Search Functionality:**
   - Users can search for tasks based on keywords, enhancing task discovery.

2. **Pagination:**
   - Implement pagination for the task list to handle a large number of tasks.

3. **User Roles and Permissions:**
   - Introduce user roles (e.g., admin, regular user) with distinct permissions for enhanced security and access control.
   - 
4. **Signup, Login, Logout:**
    - Implemented Token based authentication system.

## GitHub Repository

- **Repository Name:** [TaskManagerClient](https://github.com/yabesh12/Task-Manager-Client)
- **Clone Repository:**
   ```bash
   git clone https://github.com/yabesh12/Task-Manager-Client.git
   ```

## Getting Started

1. **Clone Repository:**
   ```bash
   git clone https://github.com/yabesh12/Task-Manager-Client.git
   ```

2. **Navigate to Project Directory:**
   ```bash
   cd task-manager-client
   ```

3. **Install Dependencies:**
   ```bash
   npm install
   ```

4. **Start Development Server:**
   ```bash
   npm start
   ```

5. **Open Browser:**
   - Visit [http://localhost:3000](http://localhost:3000) to interact with the TaskManagerClient frontend.

## Usage

- User Signup, Login, Logout (Token based Authentication & Authorization)
- Create, edit, and delete tasks using the provided interface.
- Mark tasks as complete or incomplete.
- Organize tasks based on due date or status.
- Utilize additional features such as search and pagination.
- Admin, default user role privileges
