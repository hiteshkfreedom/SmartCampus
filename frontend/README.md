# SmartCampus – Student Management & Performance Platform

SmartCampus is a full-stack web application designed to manage student information, academic performance, attendance, and results in one centralized platform.

The project is built using **Python, Django, Django REST Framework, React.js, Tailwind CSS, and SQL-based database concepts**.

---

## 🚀 Features

### Student Management

* Add new students
* Edit student information
* Delete students
* Search students by name
* View detailed student information

### Academic Performance

* Add student marks
* Calculate percentages
* Calculate grades
* Display subject-wise performance

### Attendance Management

* Record total classes
* Record attended classes
* Calculate attendance percentage
* Validate attendance data

### Results

* View overall student performance
* Calculate total marks
* Calculate percentage
* Display student grade
* Display attendance percentage

### Dashboard

* Total students
* Total courses
* Total mark records
* Average marks
* Average attendance
* Top-performing student
* Student overview

### Authentication

* User login
* Token-based authentication
* Protected API endpoints
* Protected React pages
* Logout functionality

---

## 🛠️ Technologies Used

### Frontend

* React.js
* JavaScript
* Tailwind CSS
* React Router

### Backend

* Python
* Django
* Django REST Framework

### Database

* SQL database concepts
* Django ORM

### Authentication

* Django Authentication
* Django REST Framework Token Authentication

### Development Tools

* Visual Studio Code
* Git
* GitHub
* Vite
* npm

---

## 🏗️ Project Architecture

```text
React.js + Tailwind CSS
          ↓
      REST API
          ↓
Django REST Framework
          ↓
       Django
          ↓
       Database
```

The React frontend communicates with the Django backend through REST APIs.

---

## 📂 Project Structure

```text
SmartCampus/
│
├── config/
│   ├── settings.py
│   ├── urls.py
│   └── ...
│
├── students/
│   ├── migrations/
│   ├── admin.py
│   ├── models.py
│   ├── serializers.py
│   ├── urls.py
│   ├── views.py
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Students.jsx
│   │   │   ├── Marks.jsx
│   │   │   ├── Attendance.jsx
│   │   │   ├── Results.jsx
│   │   │   └── Login.jsx
│   │   │
│   │   ├── App.jsx
│   │   └── ...
│   │
│   ├── package.json
│   └── vite.config.js
│
├── manage.py
├── README.md
└── ...
```

---

## 🔐 Authentication

SmartCampus uses token-based authentication.

When a user logs in:

1. Username and password are sent to Django.
2. Django authenticates the user.
3. Django generates or retrieves an authentication token.
4. React stores the token.
5. The token is sent with protected API requests.

Example:

```text
Authorization: Token <token>
```

This prevents unauthorized users from accessing protected APIs.

---

## 🔗 Main API Endpoints

```text
POST   /api/login/

GET    /api/students/
POST   /api/students/
PUT    /api/students/<id>/
DELETE /api/students/<id>/

GET    /api/marks/
POST   /api/marks/

GET    /api/attendance/
POST   /api/attendance/
```

---

## ✅ Validation

The application includes validation on both frontend and backend.

Examples:

* Phone number must contain exactly 10 digits.
* Marks cannot be negative.
* Marks cannot be greater than total marks.
* Total classes must be greater than zero.
* Attended classes cannot be greater than total classes.

Backend validation is handled using Django REST Framework serializers.

---

## 📊 Example Student Performance

```text
Student: Hitesh

Python: 85 / 100
Django: 89 / 100

Total: 174 / 200
Percentage: 87.0%
Grade: A
```

---

## ▶️ How to Run the Backend

Open PowerShell and navigate to the project:

```powershell
cd D:\SmartCampus
```

Activate the virtual environment:

```powershell
.\venv\Scripts\activate
```

Run migrations:

```powershell
python manage.py migrate
```

Start Django:

```powershell
python manage.py runserver
```

Backend:

```text
http://127.0.0.1:8000/
```

---

## ▶️ How to Run the Frontend

Open another terminal:

```powershell
cd D:\SmartCampus\frontend
```

Install dependencies:

```powershell
npm install
```

Start the React development server:

```powershell
npm run dev
```

Frontend:

```text
http://localhost:5173/
```

---

## 🎯 Project Goals

The main goals of SmartCampus are:

* Centralize student information
* Manage academic performance
* Track attendance
* Generate student results
* Provide secure authentication
* Provide a simple and responsive user interface
* Demonstrate full-stack development skills

---

## 💼 Skills Demonstrated

This project demonstrates practical knowledge of:

* Python
* Django
* Django REST Framework
* React.js
* JavaScript
* Tailwind CSS
* REST APIs
* CRUD operations
* Authentication
* Authorization concepts
* API validation
* Database relationships
* Django ORM
* React state management
* React Router
* Frontend-backend integration
* Error handling

---

## 👨‍💻 Developer

**Hitesh**

Python Full Stack Developer – Fresher

---

## 📌 Future Improvements

Possible future enhancements include:

* Role-based access control
* Student-specific login
* Admin dashboard
* Pagination
* Advanced search and filtering
* Charts and analytics
* Email notifications
* Cloud deployment
* Production database
* Automated testing

