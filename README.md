<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

# Library Management System API

## 📌 Overview

The **Library Management System API** is a RESTful API built with **NestJS** that allows users to manage books, issue requests, and user authentication using JWT-based authentication.

---

## 🚀 Features

- **User Authentication** (Signup/Login)
- **Book Management** (Create, Update, Fetch Books)
- **Issue & Return Books** (Request, Approve, and Manage Book Issues)
- **Role-Based Access Control** (Admin & Member roles)
- **JWT Authentication & Guards**
- **Swagger API Documentation**

---

## 🛠 Installation & Setup

### 1️⃣ **Clone the Repository**

```sh
git clone https://github.com/ashishgourr/library-management-system.git
cd library-management-system
```

### 2️⃣ **Install Dependencies**

```sh
npm install
```

### 3️⃣ **Set Up Environment Variables**

Create a `.env` file and configure the database connection and JWT secret:

```env
# Database Configuration
DB_TYPE=database_type
DB_HOST=databse_host
DB_PORT=database_port
DB_USERNAME=database_username
DB_PASSWORD=database_password
DB_NAME=your_database_name

# Application Configuration
JWT_SECRET=your_secret_key
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

### 4️⃣ **Run the Application**

```sh
npm run start:dev
```

### 5️⃣ **Access Swagger API Docs**

Once the server is running, open your browser and visit:

```
http://localhost:3000/api/docs
```

---

## 📚 API Documentation

### 🔐 **Authentication**

#### 1️⃣ **User Signup**

`POST /auth/signup`

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "MEMBER"
}
```

_Response:_

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "role": "MEMBER",
  "token": "jwt_token_here"
}
```

#### 2️⃣ **User Login**

`POST /auth/login`

```json
{
  "email": "john@example.com",
  "password": "password123",
  "role": "MEMBER"
}
```

_Response:_

```json
{
  "access_token": "jwt_token_here"
}
```

### 📖 **Book Management**

#### **Create a Book (Admin Only)**

`POST /books`

```json
{
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "available": true
}
```

_Response:_

```json
{
  "id": 1,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "available": true
}
```

#### **Get All Books**

`GET /books`
_Response:_

```json
[
  {
    "id": 1,
    "title": "The Great Gatsby",
    "author": "F. Scott Fitzgerald",
    "available": true
  }
]
```

### 📌 **Book Issue & Return Management**

#### **Request to Issue a Book (Member Only)**

`POST /issues/request`

```json
{
  "bookId": 1
}
```

#### **Approve/Reject Issue Request (Admin Only)**

`POST /issues/{id}/status`

```json
{
  "status": "APPROVED"
}
```

#### **Request to Return a Book (Member Only)**

`POST /issues/{id}/return`

#### **Approve/Reject Return Request (Admin Only)**

`POST /issues/{id}/return-status`

```json
{
  "status": "RETURNED"
}
```

#### **Get All Issues (Admin Only)**

`GET /issues`

---

## 🔒 **Authentication & Authorization**

- **Admin:** Can create books, approve/reject issue and return requests, and manage all users.
- **Member:** Can request book issues and returns.
- **JWT Authentication** is required for all endpoints except signup and login.

---
