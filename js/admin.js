let admin = null;

document.addEventListener("DOMContentLoaded", () => {
    initDatePicker();

    const saved = localStorage.getItem("adminData");

    if (saved) {
        admin = JSON.parse(saved);
        openDashboard();
    }
});

async function login() {
    const username =
        document.getElementById("username").value.trim();

    const password =
        document.getElementById("password").value.trim();

    const btn =
        document.getElementById("loginBtn");

    if (!username || !password) {
        await showAlert(
            "Missing Details",
            "Enter username and password"
        );
        return;
    }

    const old =
        setButtonLoading(
            btn,
            "Logging in..."
        );

    try {
        const res = await postData({
            action: "login",
            username,
            password
        });

        if (!res.success) {
            await showAlert(
                "Login Failed",
                res.message
            );

        } else if (
            String(res.role)
                .trim()
                .toUpperCase() !== "ADMIN"
        ) {
            await showAlert(
                "Access Denied",
                "Admin access only"
            );

        } else {
            admin = res;

            localStorage.setItem(
                "adminData",
                JSON.stringify(admin)
            );

            openDashboard();
        }

    } catch (err) {
        console.error(err);

        await showAlert(
            "Error",
            "Unable to login"
        );

    } finally {
        resetButton(btn, old);
    }
}

function openDashboard() {
    document
        .getElementById("loginPage")
        .classList.add("hidden");

    document
        .getElementById("dashboard")
        .classList.remove("hidden");

    document.getElementById("welcome").innerText =
        "Welcome, " + admin.name;

    const dropdown =
        document.getElementById("sheetName");

    dropdown.innerHTML = "";

    Object.keys(SUBJECT_NAMES).forEach(key => {
        const option =
            document.createElement("option");

        option.value = key;
        option.textContent = SUBJECT_NAMES[key];

        dropdown.appendChild(option);
    });
}

function logoutAdmin() {
    logout("adminData");
}

async function loadReport() {
    const btn =
        document.getElementById("loadBtn");

    const old =
        setButtonLoading(
            btn,
            "Loading..."
        );

    try {
        const res = await postData({
            action: "report",
            username: admin.username,
            sheetName:
                document.getElementById("sheetName").value,
            date:
                document.getElementById("date").value,
            hour:
                document.getElementById("hour").value
        });

        if (!res.success) {
            await showAlert(
                "Message",
                res.message
            );
            return;
        }

        document.getElementById("total").innerText =
            res.total;

        document.getElementById("present").innerText =
            res.present;

        document.getElementById("absent").innerText =
            res.absent;

        document.getElementById("percent").innerText =
            res.percentage + "%";

        const list =
            document.getElementById("studentList");

        list.innerHTML = "";

        res.students.forEach(student => {
            const div =
                document.createElement("div");

            div.className = "student";

            div.innerHTML = `
                <span>${student.RegNo} - ${student.Name}</span>
                <span class="badge ${
                    student.Status === "Present"
                        ? "present"
                        : "absent"
                }">
                    ${student.Status || "N/A"}
                </span>
            `;

            list.appendChild(div);
        });

    } catch (err) {
        console.error(err);

        await showAlert(
            "Error",
            "Failed to load report"
        );

    } finally {
        resetButton(btn, old);
    }
}

function downloadCSV() {
    const rows =
        document.querySelectorAll(
            "#studentList .student"
        );

    if (!rows.length) {
        showAlert(
            "Message",
            "No report loaded"
        );
        return;
    }

    let csv = "RegNo,Name,Status\n";

    rows.forEach(row => {
        const text =
            row.querySelector("span").innerText;

        const status =
            row.querySelector(".badge").innerText;

        const parts =
            text.split(" - ");

        const regno = parts[0];
        const name =
            parts.slice(1).join(" - ");

        csv +=
            `"${regno}","${name}","${status}"\n`;
    });

    const blob =
        new Blob([csv], {
            type: "text/csv"
        });

    const url =
        URL.createObjectURL(blob);

    const a =
        document.createElement("a");

    const subject =
        document.getElementById("sheetName").value;

    const date =
        document.getElementById("date").value;

    const hour =
        document.getElementById("hour").value;

    a.href = url;
    a.download =
        `${subject}_${date}_${hour}.csv`;

    a.click();

    URL.revokeObjectURL(url);
}

async function downloadFullAttendance() {
    try {
        const res = await postData({
            action: "fullReport",
            username: admin.username,
            sheetName:
                document.getElementById("sheetName").value
        });

        if (!res.success) {
            await showAlert(
                "Message",
                res.message
            );
            return;
        }

        let csv =
            res.header
                .map(v => `"${v}"`)
                .join(",") + "\n";

        res.students.forEach(row => {
            csv +=
                row.map(v => `"${v || ""}"`)
                   .join(",") + "\n";
        });

        const blob =
            new Blob([csv], {
                type: "text/csv"
            });

        const url =
            URL.createObjectURL(blob);

        const a =
            document.createElement("a");

        const subject =
            document.getElementById("sheetName").value;

        a.href = url;
        a.download =
            subject + "_FULL_ATTENDANCE.csv";

        a.click();

        URL.revokeObjectURL(url);

    } catch (err) {
        console.error(err);

        await showAlert(
            "Error",
            "Download failed"
        );
    }
}