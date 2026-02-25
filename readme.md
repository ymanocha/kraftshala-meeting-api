
#  Meeting Scheduler Backend API

A production-style backend service built with **Node.js, TypeScript, Express, Sequelize ORM, and PostgreSQL** that allows users to schedule meetings while preventing overlapping time slots.



##  Features

- User management (create + fetch users)
- Meeting scheduling
- No overlapping meetings per user (conflict detection)
- List meetings with filters
- Pagination support
- Update & delete meetings
- Centralized error handling
- Request logging
- Rate limiting
- Clean modular architecture



## 🛠️ Tech Stack

- Node.js
- TypeScript
- Express.js
- Sequelize ORM
- PostgreSQL
- dotenv



##  Setup & Installation

### 1. Clone the repository

```bash
git clone https://github.com/ymanocha/kraftshala-meeting-api.git
cd meeting-scheduler-api
```


### 2️. Install dependencies

```bash
npm install
```


### 3️. Environment Setup

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_PORT=5432
DB_NAME=meeting_db
DB_USER=postgres
DB_PASSWORD=your_password
```



### 4️. Database Setup

Ensure PostgreSQL is running and create the database:

```sql
CREATE DATABASE meeting_db;
```



### 5️. Run the application

```bash
npm run dev
```

Server will start at:

```
http://localhost:5000
```



## 🗄️ Database Setup & Migrations

This project uses **Sequelize ORM models** to define the database schema.

Tables are automatically created using model synchronization:

```
sequelize.sync()
```

## 🧠 Architecture & Folder Structure

```
src/
  modules/
    meeting/
      index/        → Controllers (route handlers)
      service/      → Business logic & DB operations
      module/       → Sequelize models
      interface/    → TypeScript interfaces & types
      dto/          → Request/response DTOs

  routes/           → Route registration
  middleware/       → Logger, error handler, rate limiter
  config/           → DB configuration
  utils/            → Helpers/constants
```

- **Routes** — Define API endpoints
- **Controllers** — Handle HTTP requests/responses
- **Services** — Contain business logic
- **Models** — Database schema definitions
- **DTOs & Interfaces** — Type safety and data contracts
- **Middleware** — Logging, rate limiting, error handling
- **Config** — Environment and DB configuration




##  Database Design

### Users Table
- id (Primary Key)
- name
- email (unique)
- createdAt
- updatedAt

### Meetings Table
- id (Primary Key)
- title
- description
- startTime
- endTime
- userId (Foreign Key → Users.id)
- createdAt
- updatedAt



### 🔗 Relationships

* One User → Many Meetings
* Foreign key constraint on `userId`




### ⚙️ Constraints & Indexes

* Email uniqueness constraint
* Foreign key constraint on meetings.userId
* Index on startTime for efficient queries



##  API Documentation

###  User APIs

####  Create User

**POST** `/api/users`

Request:

```json
{
  "name": "test ",
  "email": "test@example.com"
}
```



####  Get User

**GET** `/api/users/:id`



###  Meeting APIs

####  Create Meeting

**POST** `/api/meetings`

Request:

```json
{
  "title": "Project Discussion",
  "description": "Sprint planning",
  "startTime": "2026-02-25T10:00:00Z",
  "endTime": "2026-02-25T11:00:00Z",
  "userId": 1
}
```



####  List Meetings

**GET** `/api/meetings`

Optional query params:

* `userId`
* `startDate`
* `endDate`
* `page`
* `limit`

Example:

```
/api/meetings?userId=1&page=1&limit=5
```



####  Get Meeting

**GET** `/api/meetings/:id`



####  Update Meeting

**PUT** `/api/meetings/:id`



####  Delete Meeting

**DELETE** `/api/meetings/:id`



##  Business Rules

### No Time Conflicts Allowed

A user cannot create or update overlapping meetings.

Conflict condition:

```
existing.start < new.end
AND
existing.end > new.start
```

If conflict exists:

```
400 Bad Request
Time slot already booked
```



##  Pagination

Meeting list API supports pagination using `page` and `limit`.



## 🧩 Middleware

### Logger

Logs request method, URL, and timestamp.



### Error Handler

Centralized error handling middleware to ensure consistent API responses.


### Rate Limiter

Prevents excessive API usage by limiting requests per IP.



##  Assumptions & Trade-offs

* Authentication was not implemented as it was optional
* Users are identified by `userId`
* Meetings belong to a single user
* Time is handled in UTC format
* Sequelize sync used instead of migrations due to assignment time constraints



##  Bonus Features Implemented

* Pagination
* Logging middleware
* Rate limiting
* Centralized error handling
* Clean modular architecture



## Testing Video

A demo video showing key API flows is provided separately.





Backend Developer Intern Assignment — Kraftshala

