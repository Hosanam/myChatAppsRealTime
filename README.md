This is a full-stack real-time chat application built as a technical assessment for the.  It demonstrates core competencies in backend, frontend,

## **Real-Time Chat Application**

  This project is a real-time chat application built with NestJS and Socket.IO for the backend, Prisma ORM for database management, PostgreSQL as the main database, and Redis to manage socket sessions and user states. The frontend is built using React, but it is not included here.

---

### Features

Real-time messaging in multiple chat rooms using WebSockets (Socket.IO).

User authentication per room with unique usernames.

Persistent storage of users and chat messages using PostgreSQL.

Prisma ORM integration for type-safe database operations.

Redis integration for better socket session management.

Chat history retrieval when a user joins.

Separate handling of sender and receiver messages with styled UI (green for sender, aligned to the right).

---

### Tech Stack

Backend: NestJS, Socket.IO, Prisma ORM.

Database: PostgreSQL.

Cache & Session: Redis.

Frontend: React (not included in this repo).

Language: TypeScript.

---

## Getting Started

Node.js (version 18 or above recommended).

PostgreSQL (Make sure the database is created and running).

Redis (should be running on the default port 6379).

npm or yarn package manager.

---

***Environment Variables***

Create a **.env** file in your project root with the following example:

DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_HOST=localhost
DATABASE_PORT=5433
DATABASE_NAME=chattdb
DATABASE_URL=postgresql://postgres:your_password@localhost:5433/chattdb?schema=public

REDIS_URL=redis://localhost:6379

PORT=3001
NODE_ENV=development
Make sure your PostgreSQL database and Redis server are running and accessible with these settings.

---

---

##### *Installation & Running

Install dependencies:*

**npm install**
**Generate the Prisma client and apply migrations:**

npx prisma generate
npx prisma migrate dev --name init
Start the NestJS backend server:

##### npm run dev:all

The backend will run at **http://localhost:3001** or your specified PORT.

### *Project Structure*

**src/chat.gateway.ts:** WebSocket gateway handling real-time events (join, sendMessage).

***src/chat.service.ts:** Service handling database operations with Prisma (save user, save message, fetch messages).*

***src/users.ts:** In-memory user state management (used with Redis for session control).*

***prisma/schema.prisma:** Prisma schema defining User and Message models.*

***.env:** Environment configuration for database and Redis connections.*

---

### **How it works**

Users join a specific chat room with a unique username enforced for each room.

When joining, the server saves or updates user information in PostgreSQL.

Chat messages sent are saved in the database with user references.

Message history is fetched when a user joins and sent to them.

Redis can be used to maintain user sessions and improve socket management.

The frontend receives messages in real-time and displays them with distinct styles for sent and received messages.

---

#### Screen Shot sample

[prisma](./Screen_Shot_2025-06-22_2.04.54_PM.png)

[Login](./Screen_Shot_2025-06-22_at_2.07.08_PM.png)

[chat ](./Screen_Shot_2025-06-22_at_2.12.34_PM.png)

[chat left](./Screen_Shot_2025-06-22_at_2.11.46_PM.png) 


## This Hosana Memire 0917411678 hosanamame44@gmail.com
