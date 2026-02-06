# Library Management System

A full-stack application for managing a library with a **React** frontend, **Spring Boot** backend, and **MySQL** database.

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

- 📚 Browse and search library books
- 👤 User authentication and management
- 🔖 Book borrowing and returning system
- 📊 Admin dashboard for library management
- 🔍 Advanced search and filtering
- 📱 Responsive UI design

## 🛠️ Tech Stack

### Backend
- **Java 17+**
- **Spring Boot 4.0.2**
- **Spring Data JPA**
- **MySQL 8.0+**
- **Gradle**

### Frontend
- **React 18+**
- **Node.js 14+**
- **Axios** (HTTP client)
- **npm** (Package manager)

### Database
- **MySQL 8.0+**

## 📁 Project Structure

```
Library Management System/
├── src/                          # Spring Boot Backend
│   ├── main/
│   │   ├── java/
│   │   │   └── com/example/library_management_system/
│   │   │       ├── LibraryManagementSystemApplication.java
│   │   │       ├── controller/       # REST API Controllers
│   │   │       ├── service/          # Business Logic
│   │   │       ├── repository/       # Data Access Layer
│   │   │       ├── model/            # Entity Classes
│   │   │       └── config/           # Configuration Classes
│   │   └── resources/
│   │       └── application.properties
│   └── test/                     # Unit Tests
├── frontend/                     # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/           # React Components
│   │   ├── pages/                # Page Components
│   │   ├── services/             # API Services
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
├── gradle/                       # Gradle Wrapper
├── build.gradle                  # Backend Dependencies
├── settings.gradle
└── SETUP_GUIDE.md               # Detailed Setup Instructions
```

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Java Development Kit (JDK)** 17 or higher
  - Download: https://www.oracle.com/java/technologies/javase-jdk17-downloads.html
  - Verify: `java -version`

- **Node.js** 14+ and **npm**
  - Download: https://nodejs.org/
  - Verify: `node -v` and `npm -v`

- **MySQL Server** 5.7+
  - Download: https://dev.mysql.com/downloads/mysql/
  - Verify: `mysql --version`

- **Git** (for version control)
  - Download: https://git-scm.com/

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/library-management-system.git
cd "Library Management System"
```

### 2. Create MySQL Database

Open MySQL Command Line or MySQL Workbench and run:

```sql
CREATE DATABASE library_db;
```

### 3. Update Database Configuration (if needed)

Edit `src/main/resources/application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/library_db
spring.datasource.username=root
spring.datasource.password=your_password
```

### 4. Build Backend Dependencies

```bash
./gradlew build
```

### 5. Install Frontend Dependencies

```bash
cd frontend
npm install
```

## ▶️ Running the Application

### Option 1: Using IDE (IntelliJ IDEA)

**Backend:**
1. Open the project in IntelliJ IDEA
2. Right-click on `LibraryManagementSystemApplication.java`
3. Click "Run"

**Frontend:**
1. Open a terminal
2. Navigate to the `frontend` folder
3. Run `npm start`

### Option 2: Using Terminal/Command Prompt

**Terminal 1 - Backend:**
```powershell
cd "Library Management System"
./gradlew bootRun
```

**Terminal 2 - Frontend:**
```powershell
cd "Library Management System\frontend"
npm start
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8080/api
- **Database**: MySQL on localhost:3306

## 📡 API Documentation

### Base URL
```
http://localhost:8080/api
```

### Example Endpoints

#### Get All Books
```http
GET /api/books
Content-Type: application/json
```

#### Get Book by ID
```http
GET /api/books/{id}
```

#### Create New Book
```http
POST /api/books
Content-Type: application/json

{
  "title": "Book Title",
  "author": "Author Name",
  "isbn": "123-456-789",
  "publishYear": 2024
}
```

#### Update Book
```http
PUT /api/books/{id}
Content-Type: application/json
```

#### Delete Book
```http
DELETE /api/books/{id}
```

## 🗄️ Database Schema

### Books Table
```sql
CREATE TABLE books (
  id INT PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  isbn VARCHAR(20) UNIQUE,
  publish_year INT,
  available_copies INT,
  total_copies INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### Users Table (Example)
```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  username VARCHAR(100) UNIQUE NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## 🔧 Development

### Backend Development

Create a new entity in `src/main/java/com/example/library_management_system/model/`:

```java
@Entity
@Table(name = "books")
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(nullable = false)
    private String title;
    
    private String author;
    
    // Getters and Setters
}
```

### Frontend Development

Create a new React component in `frontend/src/components/`:

```jsx
import React from 'react';
import API from '../services/api';

export default function BookList() {
  const [books, setBooks] = React.useState([]);
  
  React.useEffect(() => {
    fetchBooks();
  }, []);
  
  const fetchBooks = async () => {
    try {
      const response = await API.get('/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };
  
  return (
    <div>
      {books.map(book => (
        <div key={book.id}>{book.title}</div>
      ))}
    </div>
  );
}
```

## 🧪 Testing

### Backend Tests
```bash
./gradlew test
```

### Frontend Tests
```bash
cd frontend
npm test
```

## 📦 Build for Production

### Backend
```bash
./gradlew clean build
```

### Frontend
```bash
cd frontend
npm run build
```

## 🐛 Troubleshooting

### MySQL Connection Error
- Ensure MySQL is running
- Verify credentials in `application.properties`
- Create the database: `CREATE DATABASE library_db;`

### Port Already in Use
- Change port in `application.properties`: `server.port=8081`
- Change React port: `PORT=3001 npm start`

### Dependencies Not Found
```bash
# Clear Gradle cache
./gradlew clean

# Reinstall npm packages
cd frontend
npm install
```

## 📚 Resources

- [Spring Boot Documentation](https://spring.io/projects/spring-boot)
- [React Documentation](https://react.dev/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Axios Documentation](https://axios-http.com/)
- [Gradle Documentation](https://gradle.org/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 👨‍💻 Author

Your Name - [GitHub Profile](https://github.com/yourusername)

---

**Last Updated**: February 6, 2026

For detailed setup instructions, see [SETUP_GUIDE.md](./SETUP_GUIDE.md)
