const webAppURL =
    CONFIG.WEB_APP_URL;

const SUBJECT_NAMES = {
    BSC_CPP: "BSc - C++",
    BSC_CPP_PRACT: "BSc - C++ (Practical)",
    BSC_PYTHON: "BSc - Python",
    BSC_PYTHON_PRACT: "BSc - Python (Practical)",
    MSC_SCRIPT: "MSc - Scripting",
    MSC_SCRIPT_PRACT: "MSc - Scripting (Practical)"
};

let portalData = null;

// SEARCH
async function searchAttendance() {
    const regNo =
        document.getElementById("regNo").value.trim();

    const btn =
        document.getElementById("searchBtn");

    const originalText =
        btn.innerHTML;

    if (!regNo) {
        showAlert(
            "Missing Register Number",
            "Please enter your register number"
        );
        return;
    }

    btn.disabled = true;
    btn.innerHTML = "Loading...";

    try {

        const response = await fetch(webAppURL, {
            method: "POST",
            body: JSON.stringify({
                action: "studentAttendance",
                regNo: regNo
            })
        });

        const res = await response.json();

        if (!res.success) {
            showAlert("Message", res.message);
            return;
        }

        portalData = res;
        renderDashboard();

    } catch (err) {
        console.error(err);

        showAlert(
            "Error",
            "Unable to fetch attendance"
        );

    } finally {
        btn.disabled = false;
        btn.innerHTML = originalText;
    }
}

// RENDER DASHBOARD
function renderDashboard() {

    const student =
        portalData.student;

    const overall =
        portalData.overall;

    document.getElementById("studentName").textContent =
        student.name;

    document.getElementById("studentRegNo").textContent =
        student.regNo;

    document.getElementById("studentClass").textContent =
        student.className;

    document.getElementById("overallPercent").textContent =
        overall.percentage + "%";

    document.getElementById("welcome").textContent =
        "Attendance Overview";

    const grid =
        document.getElementById("subjectsGrid");

    grid.innerHTML = "";

    portalData.subjects.forEach(subject => {

        const div =
            document.createElement("div");

        div.className = "subject-card";

        div.onclick = () => showSubject(subject);

        div.innerHTML = `
      <div class="subject-name">
        ${SUBJECT_NAMES[subject.subject] || subject.subject}
      </div>

      <div class="subject-meta">
        Present: ${subject.present}<br>
        Absent: ${subject.absent}<br>
        Total Classes: ${subject.total}<br>
        Attendance: <span class="green">${subject.percentage}%</span>
      </div>
    `;

        grid.appendChild(div);
    });

    document
        .getElementById("searchPage")
        .classList.add("hidden");

    document
        .getElementById("dashboardPage")
        .classList.remove("hidden");
}

// SUBJECT DETAILS
function showSubject(subject) {

    document.getElementById("modalTitle").textContent =
        SUBJECT_NAMES[subject.subject] || subject.subject;

    const content =
        document.getElementById("modalContent");

    let html = `
    <div class="subject-meta" style="margin-bottom:20px">
      Present: ${subject.present} |
      Absent: ${subject.absent} |
      Total: ${subject.total} |
      Attendance:
      <span class="green">${subject.percentage}%</span>
    </div>
  `;

    if (!subject.history.length) {
        html += "<p>No attendance records found</p>";
    } else {

        subject.history.forEach(item => {

            const statusClass =
                item.status === "Present" ?
                "present" :
                "absent";

            html += `
        <div class="history-row">
          <div class="history-left">
            ${item.date}
          </div>

          <div class="history-right ${statusClass}">
            ${item.status}
          </div>
        </div>
      `;
        });
    }

    content.innerHTML = html;

    const overlay =
        document.getElementById("modalOverlay");

    overlay.classList.remove("hidden");

    document.getElementById("modalOk").onclick = () => {
        overlay.classList.add("hidden");
    };
}

// BACK
function goBack() {
    document
        .getElementById("dashboardPage")
        .classList.add("hidden");

    document
        .getElementById("searchPage")
        .classList.remove("hidden");

    document.getElementById("regNo").value = "";
}

// ALERT
function showAlert(title, message) {

    const overlay =
        document.getElementById("alertOverlay");

    document.getElementById("alertTitle").innerText =
        title;

    document.getElementById("alertText").innerText =
        message;

    overlay.classList.remove("hidden");

    document.getElementById("alertOk").onclick = () => {
        overlay.classList.add("hidden");
    };
}

// ENTER KEY SEARCH
document.addEventListener("DOMContentLoaded", () => {
    document
        .getElementById("regNo")
        .addEventListener("keypress", e => {
            if (e.key === "Enter") {
                searchAttendance();
            }
        });
});