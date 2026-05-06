# DCF Attendance Portal

A secure, modern, and role-based attendance management system developed for the **Department of Digital & Cyber Forensics (DCF)** to streamline attendance management for faculty, students, and administration.

---

## Overview

DCF Attendance Portal is a web-based attendance platform designed to provide a unified system for:

* **Teachers** → mark and manage attendance
* **Students / Parents** → view attendance subject-wise
* **Admin** → access reports and analytics

Built with a clean dark-themed interface and powered by **Google Apps Script + Google Sheets** as a secure backend.

---

## Portal Modules

### Teacher Portal

* Secure faculty login authentication
* Subject-based access control
* Student list fetching through backend API
* Mark attendance using Present / Absent toggle
* Overwrite confirmation for existing attendance
* Search students by Register Number / Name
* Pagination for large student lists
* Select All / Unselect All options
* Calendar date picker
* Show / Hide password
* Mobile responsive interface

### Student Portal

* USN / Register Number based access
* No login required for quick access
* View overall attendance percentage
* Subject-wise attendance breakdown
* Detailed day-wise attendance history
* Parent-friendly attendance access
* Responsive dashboard UI

### Admin Access

* Managed securely through backend role validation
* Access administrative reports
* Download full attendance reports
* Department-level analytics and monitoring

---

## Features

* Multi-portal landing page navigation
* Secure backend architecture
* Role-based access management
* Subject mapping through `STUDENT_MASTER`
* Centralized attendance storage
* Modern dark UI with emerald accent theme
* Custom alert / confirmation modal
* Responsive design for mobile and desktop
* Scalable folder architecture

---

## Tech Stack

* **HTML5**
* **CSS3**
* **JavaScript (Vanilla JS)**
* Google Apps Script
* Google Sheets

---

## Project Structure

```text
DCF-Attendance/
│
├── admin/
│   └── index.html
│
├── teacher/
│   └── index.html
│
├── student/
│   └── index.html
│
├── css/
│   ├── admin.css
│   ├── teacher.css
│   ├── student.css
│   ├── main.css
│   └── flatpickr-theme.css
│
├── js/
│   ├── admin.js
│   ├── teacher.js
│   ├── student.js
│   └── common.js
│
├── config.js
├── index.html
└── README.md
```

---

## How It Works

### Teacher Flow

Faculty logs in using assigned credentials → backend validates access → allowed subjects load → attendance is recorded securely into the system.

### Student Flow

Student enters Register Number → backend reads `STUDENT_MASTER` → assigned subjects are identified → attendance is calculated → dashboard is displayed.

### Admin Flow

Admin logs in through teacher portal credentials → backend validates admin role → reporting and administrative features become available.

---

## Security

* No hardcoded credentials in frontend
* No public spreadsheet access
* Backend-only data access
* Role-based validation
* Subject permission checks
* Hidden sheet IDs
* Secure API-based communication

---

## Project Purpose

This project was created to simplify academic attendance management with a clean interface, secure backend integration, and accessibility for teachers, students, and parents.

---

## Developer

**Nithinkumar M**
Department of Digital & Cyber Forensics (DCF)
Srinivas University, Mukka

Built as an academic attendance management project.

---

## Contact

📧 **[nithinneetu02@gmail.com](mailto:nithinneetu02@gmail.com)**
