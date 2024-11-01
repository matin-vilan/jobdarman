# Next.js Full-Stack Authentication Project

This project uses the Next.js framework in a full-stack setup, implementing both backend and frontend for a complete authentication solution.

## Features

- Register Page: Create a new account
- Login Page: Sign in to an existing account
- Authenticated Users Page: Redirects to the users page upon login, where the users route is accessed

## Token Management

- Access Token: Expires every minute. Automatically refreshed via the refresh API, handled by an Axios interceptor.

- Refresh Token: Expires every two minutes. Upon expiration, the user is redirected to the login page. The Axios interceptor manages the logout operation.

## Getting Started

### Setup

1. Copy `.env.example` to `.env` and configure the environment variables.

2. Install dependencies:

```bash
  npm install
  cd my-project
```

3. Start the project:

- Development: `npm run dev`

- Production: `npm run start`

## Backend

- The backend is integrated within the project and handles data storage in the `db.json` file.

- Backend routes are located in the `app/api` folder.

## Backend API Routes

- `/api/auth/login`

- `/api/auth/register`

- `/api/auth/refresh`

- `/api/users`

## Frontend Routes

- `/users`

- `/login`

- `/register`

## Project Structure

- Authentication and route handling are implemented for both frontend and backend.

- Git Flow: Not implemented. The project contains only a single branch and commit, as specified by the task requirements.

## Notes

All task requirements have been covered, and special emphasis has been placed on the requested functionality.
