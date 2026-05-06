const webAppURL = CONFIG.WEB_APP_URL;

const SUBJECT_NAMES = {
    BSC_CPP: "BSc - C++",
    BSC_CPP_PRACT: "BSc - C++ (Practical)",
    BSC_PYTHON: "BSc - Python",
    BSC_PYTHON_PRACT: "BSc - Python (Practical)",
    MSC_SCRIPT: "MSc - Scripting",
    MSC_SCRIPT_PRACT: "MSc - Scripting (Practical)"
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