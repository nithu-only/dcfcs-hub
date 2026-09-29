const webAppURL = CONFIG.WEB_APP_URL;

const SUBJECT_NAMES = {
    BSC_C:"BSc - C Programming",
    BSC_C_PRACT: "BSc - C Programming (Practical)",
    BSC_JAVA: "BSc - Java Programming",
    BSC_JAVA_PRACT: "BSc - Java Programming (Practical",
    BSC_CLOUD: "BSc - Cloud Computing",
    MSC_CPP: "BSc - C++ Programming",
    MSC_CPP_PRACT: "BSc - C++ Programming (Practical)",
    MSC_PYTHON: "MSc - Python Programming",
    MSC_PYTHON_PRACT: "MSc - Python Programming (Practical)",

    BSC_CPP: "BSc - C++ Programming",
    BSC_CPP_PRACT: "BSc - C++ Programming(Practical)",
    BSC_PYTHON: "BSc - Python Programming",
    BSC_PYTHON_PRACT: "BSc - Python Programming (Practical)",
    MSC_SCRIPT: "MSc - Scripting Language",
    MSC_SCRIPT_PRACT: "MSc - Scripting Language (Practical)"
};

function initDatePicker() {
    flatpickr("#date", {
        dateFormat: "Y-m-d",
        defaultDate: "today",
        disableMobile: true,
        showMonths: 1
    });
}

function showAlert(title, message) {
    return new Promise(resolve => {
        const overlay = document.getElementById("modalOverlay");
        document.getElementById("modalTitle").innerText = title;
        document.getElementById("modalText").innerText = message;

        const cancelBtn = document.getElementById("modalCancel");
        if (cancelBtn) cancelBtn.classList.add("hidden");

        overlay.classList.remove("hidden");

        document.getElementById("modalOk").onclick = () => {
            overlay.classList.add("hidden");
            resolve(true);
        };
    });
}

function showConfirm(title, message) {
    return new Promise(resolve => {
        const overlay = document.getElementById("modalOverlay");
        document.getElementById("modalTitle").innerText = title;
        document.getElementById("modalText").innerText = message;

        const cancelBtn = document.getElementById("modalCancel");

        if (cancelBtn) {
            cancelBtn.classList.remove("hidden");
            cancelBtn.onclick = () => {
                overlay.classList.add("hidden");
                resolve(false);
            };
        }

        overlay.classList.remove("hidden");

        document.getElementById("modalOk").onclick = () => {
            overlay.classList.add("hidden");
            resolve(true);
        };
    });
}

function closeModal() {
    const overlay = document.getElementById("modalOverlay");
    if (overlay) overlay.classList.add("hidden");
}

function setButtonLoading(button, text) {
    if (!button) return "";

    const oldText = button.innerHTML;
    button.disabled = true;
    button.innerHTML =
        `<span class="spinner"></span>${text}`;

    return oldText;
}

function resetButton(button, oldText) {
    if (!button) return;
    button.disabled = false;
    button.innerHTML = oldText;
}

function postData(data) {
    return fetch(webAppURL, {
        method: "POST",
        body: JSON.stringify(data)
    }).then(res => res.json());
}

function logout(storageKey) {
    localStorage.removeItem(storageKey);
    location.reload();
}