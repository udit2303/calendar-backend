
# Event Reminder Backend

This is the backend API for managing event reminders. It allows users to log in, register, and manage events. The API provides functionalities to get all events, filter events by month and year, and add, update, or delete events.

## Prerequisites

- Node.js (version 14 or higher)
- PostgreSQL
- Sequelize ORM for database interaction

## Installation

1. Clone the repository:

   git clone https://github.com/your-repo/event-reminder-backend.git
   cd event-reminder-backend

2. Install dependencies:

   npm install

3. Set up your environment variables by creating a `.env` file:

   touch .env

   Add the following variables to your `.env` file:

   ```
   DATABASE_URL=your_database_url
   EMAIL_USER=your_email
   EMAIL_PASS=your_email_password
   JWT_SECRET=your_jwt_secret_key
   ```

4. Run the application:

   npm start

5. Your API should now be running on `http://localhost:3000`.

## API Routes

### **Authentication**

#### `POST /api/auth/login`
- Logs in a user and returns a JWT token.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```
- **Response**:
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

#### `POST /api/auth/signup`
- Registers a new user and returns a JWT token.
- **Request Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "your_password"
  }
  ```
- **Response**:
  ```json
  {
    "token": "your_jwt_token"
  }
  ```

### **Event Routes**

#### `GET /api/events/`
- Returns all events for the logged-in user.
- **Authentication**: Bearer token in the `Authorization` header.
- **Response**:
  ```json
  [
    {
      "id": 1,
      "title": "Event Title",
      "date": "2024-11-30",
      "time": "14:00:00",
      "description": "Event Description"
    },
    ...
  ]
  ```

#### `GET /api/events/?month=month&year=year`
- Returns events for a specific month and year.
- **Query Parameters**:
  - `month`: The month (1-12).
  - `year`: The year (e.g., 2024).
- **Authentication**: Bearer token in the `Authorization` header.
- **Response**:
  ```json
  [
    {
      "id": 1,
      "title": "Event Title",
      "date": "2024-11-30",
      "time": "14:00:00",
      "description": "Event Description"
    },
    ...
  ]
  ```

#### `POST /api/events/`
- Adds a new event.
- **Request Body**:
  ```json
  {
    "title": "New Event",
    "date": "2024-12-01",
    "time": "10:00:00",
    "description": "Event description."
  }
  ```
- **Authentication**: Bearer token in the `Authorization` header.
- **Response**:
  ```json
  {
    "id": 1,
    "title": "New Event",
    "date": "2024-12-01",
    "time": "10:00:00",
    "description": "Event description."
  }
  ```

#### `GET /api/events/:id`
- Gets the details of a specific event.
- **URL Parameters**:
  - `id`: The ID of the event to retrieve.
- **Authentication**: Bearer token in the `Authorization` header.
- **Response**:
  ```json
  {
    "id": 1,
    "title": "Event Title",
    "date": "2024-11-30",
    "time": "14:00:00",
    "description": "Event Description"
  }
  ```

#### `PUT /api/events/:id`
- Updates a specific event.
- **URL Parameters**:
  - `id`: The ID of the event to update.
- **Request Body**:
  ```json
  {
    "title": "Updated Event",
    "date": "2024-12-01",
    "time": "12:00:00",
    "description": "Updated event description."
  }
  ```
- **Authentication**: Bearer token in the `Authorization` header.
- **Response**:
  ```json
  {
    "id": 1,
    "title": "Updated Event",
    "date": "2024-12-01",
    "time": "12:00:00",
    "description": "Updated event description."
  }
  ```

#### `DELETE /api/events/:id`
- Deletes a specific event.
- **URL Parameters**:
  - `id`: The ID of the event to delete.
- **Authentication**: Bearer token in the `Authorization` header.
- **Response**:
  ```json
  {
    "message": "Event deleted successfully"
  }
  ```

## Error Handling

The API returns appropriate HTTP status codes and error messages in case of failure:

- `400 Bad Request`: Invalid request data.
- `401 Unauthorized`: Missing or invalid authentication token.
- `404 Not Found`: Resource not found (e.g., event not found).
- `500 Internal Server Error`: General server error.

## Future Improvements
- Add a relation for handling reminders, and load reminders based on that. (will work on after exams)

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
