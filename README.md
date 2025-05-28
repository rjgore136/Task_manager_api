# 📝 Task Manager API

A simple RESTful API built with **Node.js** and **Express.js** for managing tasks (to-do items). This project features CRUD operations, user authentication, and in-memory data storage.

---

## Features

- User **registration** and **login**
- CRUD operations on tasks
- Authentication middleware using **JWT**
- Task ownership check – only the creator can update/delete a task
- Public access to fetch all tasks or a specific task
- In-memory data storage (no database)
- **Pagination support** for the `GET /tasks` endpoint to fetch tasks in pages

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- npm

### Installation

```bash
git clone https://github.com/your-username/task-manager-api.git
cd task-manager-api
npm install
npm run dev
```

### Add .env file

```bash
PORT = 3000
SECRET_KEY = "asdjklmno"
```

## Authentication

- Register a user at POST /register
- Login at POST /login to receive a JWT tokens
- Include the token as a Bearer token in the Authorization header for protected routes:

```bash
Authorization: Bearer <your-token>
```

## API Endpoints

| Method | Endpoint     | Description                  | Auth Required |
| ------ | ------------ | ---------------------------- | ------------- |
| GET    | `/tasks`     | Get all tasks                | ❌            |
| GET    | `/tasks/:id` | Get a task by ID             | ❌            |
| POST   | `/tasks`     | Create a new task            | ✅            |
| PUT    | `/tasks/:id` | Update a task (only creator) | ✅            |
| DELETE | `/tasks/:id` | Delete a task (only creator) | ✅            |
| POST   | `/register`  | Register a new user          | ❌            |
| POST   | `/login`     | Login and get JWT token      | ❌            |

## Folder Structure

```bash
├── controllers/          # Route handlers
├── middlewares/          # Authentication
├── routes/               # API route definitions
├── utils/                # Helper functions and in memory data storage
├── app.js                # Express app setup and middleware configuration
├── app.js                # Stores port number and JWT Secret
├── index.js              # Entry point
├── README.md
└── package.json
```

## Postman Collection

- Download and import the [postman_collection.json](https://raw.githubusercontent.com/rjgore136/Postman-Collections/refs/heads/main/Task_management.postman_collection.json).

## Notes

- This API uses in-memory data storage; data will reset on server restart.

- Only authenticated users can create, update, or delete tasks.

- Only the creator of a task can update or delete it.

- Anyone can fetch all tasks or a specific task without authentication.
