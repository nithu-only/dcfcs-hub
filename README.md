# DCF Academic Portal

A secure, modern, and role-based academic management portal developed for the **Department of Digital & Cyber Forensics (DCF)** to streamline attendance management, student access, academic resources, and administrative reporting.

---

## Overview

**DCF Academic Portal** is a unified web-based platform built to serve multiple stakeholders within the department:

* **Teachers** → mark and manage attendance efficiently
* **Students / Parents** → view attendance subject-wise
* **Administrators** → access reports and analytics
* **Learners** → access study materials, notes, and academic resources

Built with a clean dark-themed interface and powered by **Google Apps Script + Google Sheets** as a secure backend stack.

---

## Portal Modules

### Teacher Portal

* Secure faculty login authentication
* Subject-based access control
* Student list fetching through backend API
* Attendance marking using Present / Absent toggle
* Overwrite confirmation for existing attendance records
* Search students by Register Number / Name
* Pagination for large student lists
* Select All / Unselect All options
* Calendar date picker integration
* Show / Hide password support
* Mobile responsive interface

---

### Student Portal

* USN / Register Number based access
* No login required for quick parent/student access
* Overall attendance percentage view
* Subject-wise attendance breakdown
* Detailed day-wise attendance history
* Parent-friendly dashboard design
* Responsive and lightweight UI

---

### Materials Portal

* Dynamic study materials management
* Course-based navigation (**BSC / MSC**)
* Subject filtering
* Material categories (PDF / Practical / PYQ / Notes)
* Direct access to academic resources
* Description-based material cards
* Backend-managed resource listing through `MATERIAL_MASTER`
* Fully scalable content management

---

### Admin Access

* Managed securely through backend role validation
* Access administrative reports
* Full attendance report downloads
* Department-level analytics and monitoring

---

## Core Features

* Multi-portal architecture
* Secure backend API integration
* Role-based access management
* Subject mapping through `STUDENT_MASTER`
* Material mapping through `MATERIAL_MASTER`
* Centralized attendance storage
* Modern dark UI with emerald accent theme
* Custom alert / confirmation modal system
* Responsive design for desktop and mobile
* Modular and scalable folder architecture

---

## Tech Stack

* HTML5
* CSS3
* JavaScript (Vanilla JS)
* Google Apps Script
* Google Sheets
* Google Drive (for academic resources)
* Flatpickr

---

## Project Structure

```text
DCF-Academic-Portal/
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
├── materials/
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
│   ├── materials.js
│   └── common.js
│
├── config.js
├── index.html
└── README.md
```

---
## How It Works

```text
DCF Academic Portal
│
├── Home Portal
│   ├── Teacher Portal
│   └── Student Portal
│
├── Teacher Portal
│   ├── Faculty Login
│   ├── Backend Authentication
│   ├── Subject Permission Validation
│   ├── Fetch Student List
│   ├── Mark Attendance
│   ├── Overwrite Existing Attendance (if needed)
│   └── Store Attendance in Google Sheets
│
├── Student Portal
│   ├── Enter Register Number / USN
│   ├── Backend Validation
│   ├── Read STUDENT_MASTER Mapping
│   ├── Identify Assigned Subjects
│   ├── Fetch Attendance Data
│   ├── Calculate Overall Attendance
│   ├── Generate Subject-wise Attendance
│   └── Display Detailed Attendance Dashboard
│
├── Materials Portal
│   ├── Select Course (BSC / MSC)
│   ├── Select Subject
│   ├── Read MATERIAL_MASTER
│   ├── Fetch Material Metadata
│   ├── Display Resource Cards
│   └── Open Notes / PDFs / PYQs
│
└── Admin Access
    ├── Admin Login via Teacher Portal
    ├── Backend Role Validation
    ├── Access Reports
    ├── Download Full Attendance Reports
    └── Department Analytics
```
---

## Security

* No hardcoded credentials in frontend
* No public spreadsheet access
* Backend-only data handling
* Role-based validation
* Subject permission checks
* Hidden Sheet IDs
* Secure API communication layer

---

## Project Purpose

This project was created to modernize departmental academic workflows through a unified, accessible, and secure digital platform for faculty, students, parents, and administrators.

---

## Developer

**Nithinkumar M**
Department of Digital & Cyber Forensics (DCF)
Srinivas University, Mukka

Built as an academic management project.

---

## Contact

📧 **[nithinneetu02@gmail.com](mailto:nithinneetu02@gmail.com)**
