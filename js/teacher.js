let teacher = null;
let allStudents = [];
let filteredStudents = [];
let attendanceState = {};
let currentPage = 1;
const studentsPerPage = 20;

document.addEventListener("DOMContentLoaded", () => {
    initDatePicker();

    const savedTeacher = localStorage.getItem("teacherData");

    if (savedTeacher) {
        teacher = JSON.parse(savedTeacher);
        showAttendance();
    }
});

async function login() {
    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const loginBtn =
        document.querySelector("#loginPage .btn");

    const originalText =
        setButtonLoading(loginBtn, "Logging in...");

    if (!username || !password) {
        resetButton(loginBtn, originalText);
        await showAlert(
            "Missing Details",
            "Enter username and password"
        );
        return;
    }

    try {
        const res = await postData({
            action: "login",
            username,
            password
        });

        if (res.success) {
            teacher = {
                username: res.username,
                name: res.name,
                subjects: res.subjects
            };

            localStorage.setItem(
                "teacherData",
                JSON.stringify(teacher)
            );

            showAttendance();

        } else {
            await showAlert(
                "Login Failed",
                res.message
            );
        }

    } catch (err) {
        console.error(err);

        await showAlert(
            "Error",
            "Unable to login. Please try again."
        );

    } finally {
        resetButton(loginBtn, originalText);
    }
}

function showAttendance() {
    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("attendancePage")
        .classList.remove("hidden");

    document.getElementById("welcome").innerText =
        "Welcome, " + teacher.name;

    if (!teacher || !teacher.username) {
        logout("teacherData");
        return;
    }

    buildSubjectDropdown();
}

function buildSubjectDropdown() {
    const dropdown =
        document.getElementById("sheetName");

    dropdown.innerHTML = "";

    let subjects =
        teacher.subjects.includes("ALL")
            ? Object.keys(SUBJECT_NAMES)
            : teacher.subjects;

    subjects.forEach(subject => {
        const option =
            document.createElement("option");

        option.value = subject;
        option.textContent =
            SUBJECT_NAMES[subject] || subject;

        dropdown.appendChild(option);
    });

    loadStudents();
}

async function loadStudents() {
    const sheet =
        document.getElementById("sheetName").value;

    const list =
        document.getElementById("studentList");

    list.innerHTML = "Loading...";

    currentPage = 1;
    allStudents = [];
    filteredStudents = [];
    attendanceState = {};

    document.getElementById("searchStudent").value = "";

    try {
        const res = await postData({
            action: "students",
            username: teacher.username,
            sheetName: sheet
        });

        if (!res.success || !res.students) {
            list.innerHTML =
                "<p>" +
                (res.message || "Failed to load students") +
                "</p>";
            return;
        }

        const data = res.students;

        if (!data.length) {
            list.innerHTML = "<p>No students found</p>";
            return;
        }

        allStudents = data.map(row => ({
            regno: row.RegNo,
            name: row.Name
        }));

        filteredStudents = [...allStudents];

        allStudents.forEach(student => {
            attendanceState[student.regno] = true;
        });

        renderStudents();

    } catch (err) {
        console.error(err);
        list.innerHTML = "<p>Failed to load students</p>";
    }
}

function filterStudents() {
    const q =
        document
            .getElementById("searchStudent")
            .value
            .toLowerCase()
            .trim();

    if (!q) {
        filteredStudents = [...allStudents];
    } else {
        filteredStudents =
            allStudents.filter(student =>
                student.regno.toLowerCase().includes(q) ||
                student.name.toLowerCase().includes(q)
            );
    }

    currentPage = 1;
    renderStudents();
}

function renderStudents() {
    const list =
        document.getElementById("studentList");

    list.innerHTML = "";

    const start =
        (currentPage - 1) * studentsPerPage;

    const end =
        start + studentsPerPage;

    const pageStudents =
        filteredStudents.slice(start, end);

    pageStudents.forEach(student => {
        const div =
            document.createElement("div");

        div.className = "student";

        div.innerHTML = `
            <span>${student.regno} - ${student.name}</span>
            <input type="checkbox"
                ${attendanceState[student.regno] ? "checked" : ""}
                onchange="toggleAttendance('${student.regno}', this.checked)">
        `;

        list.appendChild(div);
    });

    renderPagination();
}

function toggleAttendance(regno, checked) {
    attendanceState[regno] = checked;
}

function renderPagination() {
    const old =
        document.getElementById("pagination");

    if (old) old.remove();

    if (filteredStudents.length <= studentsPerPage) {
        return;
    }

    const totalPages =
        Math.ceil(filteredStudents.length / studentsPerPage);

    const div =
        document.createElement("div");

    div.id = "pagination";
    div.style.textAlign = "center";
    div.style.marginTop = "20px";
    div.style.marginBottom = "45px";

    div.innerHTML = `
        <button class="btn logout"
            onclick="prevPage()"
            ${currentPage === 1 ? "disabled" : ""}>
            Previous
        </button>

        <span style="margin:0 15px;">
            Page ${currentPage} / ${totalPages}
        </span>

        <button class="btn logout"
            onclick="nextPage()"
            ${currentPage === totalPages ? "disabled" : ""}>
            Next
        </button>

        <br><br>

        <button class="btn logout"
            onclick="selectAllPage(true)">
            Select All
        </button>

        <button class="btn logout"
            onclick="selectAllPage(false)">
            Unselect All
        </button>
    `;

    document
        .getElementById("studentList")
        .after(div);
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        renderStudents();
    }
}

function nextPage() {
    const totalPages =
        Math.ceil(filteredStudents.length / studentsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        renderStudents();
    }
}

function selectAllPage(status) {
    const start =
        (currentPage - 1) * studentsPerPage;

    const end =
        start + studentsPerPage;

    const pageStudents =
        filteredStudents.slice(start, end);

    pageStudents.forEach(student => {
        attendanceState[student.regno] = status;
    });

    renderStudents();
}

async function submitAttendance() {
    if (!allStudents.length) {
        await showAlert(
            "Warning",
            "No students loaded"
        );
        return;
    }

    const submitBtn =
        document.getElementById("submitAttendence");

    const originalText =
        setButtonLoading(
            submitBtn,
            "Submitting..."
        );

    const data = {
        action: "attendance",
        username: teacher.username,
        sheetName:
            document.getElementById("sheetName").value,
        date:
            document.getElementById("date").value,
        hour:
            document.getElementById("hour").value,
        override: false,
        students: []
    };

    allStudents.forEach(student => {
        data.students.push({
            regno: student.regno,
            status:
                attendanceState[student.regno]
                    ? "Present"
                    : "Absent"
        });
    });

    try {
        let res = await postData(data);

        if (
            !res.success &&
            res.message.includes("already exists")
        ) {
            const yes = await showConfirm(
                "Overwrite Attendance",
                "Attendance already exists.\nDo you want to overwrite it?"
            );

            if (yes) {
                data.override = true;
                res = await postData(data);
            }
        }

        await showAlert(
            res.success ? "Success" : "Message",
            res.message
        );

    } catch (err) {
        console.error(err);

        await showAlert(
            "Error",
            "Submission failed"
        );

    } finally {
        resetButton(submitBtn, originalText);
    }
}

function togglePassword() {
    const pass =
        document.getElementById("password");

    const eye =
        document.getElementById("eyeIcon");

    if (pass.type === "password") {
        pass.type = "text";

        eye.innerHTML = `
            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a21.77 21.77 0 0 1 5.06-7.06"/>
            <path d="M9.53 9.53a3 3 0 0 0 4.24 4.24"/>
            <path d="M1 1l22 22"/>
        `;
    } else {
        pass.type = "password";

        eye.innerHTML = `
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
            <circle cx="12" cy="12" r="3"/>
        `;
    }
}