# Library Management System - Setup Guide

## Prerequisites Installed

### 1. **Java Development Kit (JDK)**
- **Version**: Java 17+
- **Check Installation**: Run `java -version` in terminal

### 2. **Node.js and npm**
- **Download**: https://nodejs.org/ (LTS version recommended)
- **Check Installation**: Run `node -v` and `npm -v` in terminal

### 3. **MySQL Server**
- **Download**: https://dev.mysql.com/downloads/mysql/
- **Installation Steps**:
  1. Download MySQL Community Server
  2. Run the installer and follow setup wizard
  3. Set root password (remember it)
  4. Configure MySQL as a Windows Service (recommended)

### 4. **MySQL Workbench (Optional but Recommended)**
- **Download**: https://dev.mysql.com/downloads/workbench/
- **Purpose**: GUI tool for managing MySQL databases

### 5. **Git** (Optional)
- **Download**: https://git-scm.com/download/win

---

## Project Structure

```
Library Management System/
├── build.gradle                 (Spring Boot Backend Configuration)
├── src/
│   └── main/
│       ├── java/               (Java Backend Code)
│       └── resources/
│           └── application.properties (Database Configuration)
└── frontend/                    (React Frontend)
    ├── public/
    ├── src/
    └── package.json
```

---

## Setup Steps

### 1. **Create MySQL Database**

Open MySQL Command Line or MySQL Workbench and run:

```sql
CREATE DATABASE library_db;
```

Verify:
```sql
SHOW DATABASES;
```

### 2. **Build Spring Boot Backend**

```powershell
cd "g:\IdeaProjects\Library Management System"
./gradlew build
```

### 3. **Run Spring Boot Backend**

**Option A - From IDE (IntelliJ IDEA)**
- Open the project in IntelliJ
- Right-click on `LibraryManagementSystemApplication.java`
- Click "Run"

**Option B - From Terminal**
```powershell
cd "g:\IdeaProjects\Library Management System"
./gradlew bootRun
```

The backend will start on: `http://localhost:8080`

### 4. **Run React Frontend**

```powershell
cd "g:\IdeaProjects\Library Management System\frontend"
npm start
```

The frontend will open in your browser at: `http://localhost:3000`

---

## Configuration Files

### Backend Configuration (`application.properties`)

```properties
# MySQL Connection
spring.datasource.url=jdbc:mysql://localhost:3306/library_db
spring.datasource.username=root
spring.datasource.password=root

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true

# Server Port
server.port=8080

# CORS for React Frontend
spring.web.cors.allowed-origins=http://localhost:3000
```

**⚠️ Important**: Update the `spring.datasource.password` if you set a different MySQL password.

### Frontend API Configuration

Create a file `frontend/src/api/config.js`:

```javascript
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api'
});

export default API;
```

Use in your React components:

```javascript
import API from './api/config';

const fetchBooks = async () => {
  try {
    const response = await API.get('/books');
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching books:', error);
  }
};
```

---

## Useful Commands

### Backend
```powershell
# Build the project
./gradlew build

# Run the application
./gradlew bootRun

# Run tests
./gradlew test

# Clean build
./gradlew clean build
```

### Frontend
```powershell
# Start development server
npm start

# Build for production
npm run build

# Run tests
npm test

# Install new packages
npm install package-name
```

### MySQL
```powershell
# Login to MySQL
mysql -u root -p

# Inside MySQL CLI
CREATE DATABASE library_db;
USE library_db;
SHOW TABLES;
```

---

## Troubleshooting

### MySQL Connection Error
**Problem**: "Cannot connect to MySQL"
**Solution**:
1. Verify MySQL is running (check Services in Windows)
2. Verify username/password in `application.properties`
3. Create database: `CREATE DATABASE library_db;`

### Port Already in Use
**Problem**: "Port 8080/3000 already in use"
**Solution**:
- Change port in `application.properties` for backend (server.port=8081)
- Use `npx kill-port 3000` or change port for React

### Dependencies Not Found
**Problem**: "Cannot find gradle wrapper"
**Solution**:
```powershell
cd "g:\IdeaProjects\Library Management System"
gradle wrapper
```

### React npm Issues
**Problem**: "npm: command not found"
**Solution**:
1. Install Node.js from https://nodejs.org/
2. Restart your terminal
3. Verify: `node -v` and `npm -v`

---

## Next Steps

1. ✅ Create your data models in `src/main/java/com/example/library_management_system/`
2. ✅ Create REST API endpoints in Spring Boot
3. ✅ Build React components in `frontend/src/`
4. ✅ Connect frontend to backend APIs
5. ✅ Test the full application

---

## Documentation Links

- **Spring Boot**: https://spring.io/projects/spring-boot
- **React**: https://react.dev/
- **MySQL**: https://dev.mysql.com/doc/
- **Axios**: https://axios-http.com/
- **Gradle**: https://gradle.org/

---

## System Requirements

- **Windows** 10/11 or later
- **RAM**: 4GB minimum (8GB recommended)
- **Disk Space**: 5GB minimum
- **Java 17+**, **Node.js 14+**, **MySQL 5.7+**
