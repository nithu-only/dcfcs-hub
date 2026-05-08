let currentCourse = null;
let currentSubject = null;

document.addEventListener("DOMContentLoaded", loadCourses);

// ----------------------------
// API CALL
// ----------------------------
async function api(body) {
    const res = await fetch(CONFIG.WEB_APP_URL, {
        method: "POST",
        body: JSON.stringify(body)
    });

    return await res.json();
}

// ----------------------------
// LOAD COURSES
// ----------------------------
async function loadCourses() {
    currentCourse = null;
    currentSubject = null;

    updateBreadcrumb();
    toggleBack();

    const content =
        document.getElementById("content");

    content.innerHTML =
        "<p style='text-align:center'>Loading...</p>";

    try {

        const res = await api({
            action: "materials"
        });

        if (!res.success) {
            content.innerHTML =
                "<p style='text-align:center'>" +
                res.message +
                "</p>";
            return;
        }

        renderButtons(res.data, loadSubjects);

    } catch (err) {
        content.innerHTML =
            "<p style='text-align:center'>Failed to load</p>";
    }
}

// ----------------------------
// LOAD SUBJECTS
// ----------------------------
async function loadSubjects(course) {
    currentCourse = course;
    currentSubject = null;

    updateBreadcrumb();
    toggleBack();

    const content =
        document.getElementById("content");

    content.innerHTML =
        "<p style='text-align:center'>Loading...</p>";

    try {

        const res = await api({
            action: "materials",
            course: course
        });

        if (!res.success) {
            content.innerHTML =
                "<p style='text-align:center'>" +
                res.message +
                "</p>";
            return;
        }

        renderButtons(res.data, loadMaterials);

    } catch (err) {
        content.innerHTML =
            "<p style='text-align:center'>Failed to load</p>";
    }
}

// ----------------------------
// LOAD MATERIALS
// ----------------------------
async function loadMaterials(subject) {
    currentSubject = subject;

    updateBreadcrumb();
    toggleBack();

    const content =
        document.getElementById("content");

    content.innerHTML =
        "<p style='text-align:center'>Loading...</p>";

    try {

        const res = await api({
            action: "materials",
            course: currentCourse,
            subject: subject
        });

        if (!res.success) {
            content.innerHTML =
                "<p style='text-align:center'>" +
                res.message +
                "</p>";
            return;
        }

        renderMaterials(res.data);

    } catch (err) {
        content.innerHTML =
            "<p style='text-align:center'>Failed to load</p>";
    }
}

// ----------------------------
// BUTTON GRID
// ----------------------------
function renderButtons(items, clickFn) {

  const content =
    document.getElementById("content");

  content.innerHTML = `
    <div
      style="
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(240px,1fr));
        gap:18px;
      "
      id="grid"
    ></div>
  `;

  const grid =
    document.getElementById("grid");

  items.forEach(item => {

    const btn =
      document.createElement("button");

    btn.className = "btn";
    btn.style.margin = "0";
    btn.style.background = "#151515";
    btn.style.border = "1px solid #2f9e6f";
    btn.style.transition =
      "transform .25s ease, box-shadow .25s ease, background .25s ease";
    btn.style.boxShadow =
      "0 0 0 rgba(47,158,111,0)";

    btn.innerHTML = `
      <span
        style="
          display:flex;
          justify-content:center;
          align-items:center;
          gap:10px;
        "
      >
        <span>${item}</span>
        <span
          class="arrow"
          style="
            display:inline-block;
            transition:transform .25s ease;
          "
        >
          →
        </span>
      </span>
    `;

    btn.onmouseenter = () => {
      btn.style.transform =
        "translateY(-3px)";
      btn.style.background =
        "#1b1b1b";
      btn.style.boxShadow =
        "0 0 18px rgba(47,158,111,.18)";

      const arrow =
        btn.querySelector(".arrow");

      if (arrow) {
        arrow.style.transform =
          "translateX(6px)";
      }
    };

    btn.onmouseleave = () => {
      btn.style.transform =
        "translateY(0)";
      btn.style.background =
        "#151515";
      btn.style.boxShadow =
        "0 0 0 rgba(47,158,111,0)";

      const arrow =
        btn.querySelector(".arrow");

      if (arrow) {
        arrow.style.transform =
          "translateX(0)";
      }
    };

    btn.onclick = () => clickFn(item);

    grid.appendChild(btn);
  });
}

// ----------------------------
// MATERIAL CARDS
// ----------------------------
function renderMaterials(materials) {

    const content =
        document.getElementById("content");

    if (!materials.length) {
        content.innerHTML =
            "<p style='text-align:center'>No materials found</p>";
        return;
    }

    content.innerHTML = `
    <div
      id="materialGrid"
      style="
        display:grid;
        grid-template-columns:repeat(auto-fit,minmax(280px,1fr));
        gap:18px;
        margin-top:10px;
      "
    ></div>
  `;

    const grid =
        document.getElementById("materialGrid");

    materials.forEach(item => {

        const a =
            document.createElement("a");

        a.href = item.link;
        a.target = "_blank";
        a.style.textDecoration = "none";
        a.style.color = "white";

        const lowerType =
            item.type.toLowerCase();

        const badgeColor =
            lowerType.includes("pdf") ?
            "#2f9e6f" :
            lowerType.includes("practical") ?
            "#ffb020" :
            lowerType.includes("pyq") ?
            "#8b5cf6" :
            "#2f9e6f";

        a.innerHTML = `
      <div
        style="
          background:#151515;
          border:1px solid rgba(47,158,111,.25);
          border-radius:16px;
          padding:22px;
          min-height:210px;
          transition:.2s;
          display:flex;
          flex-direction:column;
          justify-content:space-between;
          box-shadow:0 0 15px rgba(47,158,111,.06);
        "
        onmouseover="
          this.style.transform='translateY(-3px)';
          this.style.background='#1b1b1b';
          this.style.boxShadow='0 0 22px rgba(47,158,111,.14)';
        "
        onmouseout="
          this.style.transform='translateY(0)';
          this.style.background='#151515';
          this.style.boxShadow='0 0 15px rgba(47,158,111,.06)';
        "
      >

        <div>
          <div
            style="
              font-size:32px;
              margin-bottom:14px;
            "
          >
            ${icon(item.type)}
          </div>

          <div
            style="
              font-size:18px;
              font-weight:700;
              margin-bottom:12px;
              line-height:1.4;
              color:white;
            "
          >
            ${item.title}
          </div>

          <div
            style="
              color:#b9b9b9;
              font-size:14px;
              line-height:1.6;
              margin-bottom:18px;
            "
          >
            ${item.description || "Study resource material"}
          </div>
        </div>

        <div
          style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            margin-top:10px;
          "
        >
          <span
            style="
              padding:6px 12px;
              border-radius:999px;
              font-size:12px;
              font-weight:700;
              background:${badgeColor}22;
              color:${badgeColor};
              border:1px solid ${badgeColor};
              text-transform:uppercase;
            "
          >
            ${item.type}
          </span>

          <span
            style="
              color:#9ad9b8;
              font-size:20px;
              font-weight:bold;
            "
          >
            ↗
          </span>
        </div>

      </div>
    `;

        grid.appendChild(a);
    });
}
// ----------------------------
// ICON
// ----------------------------
function icon(type) {
    type = type.toLowerCase();

    if (type.includes("pdf")) return "📄";
    if (type.includes("practical")) return "🧪";
    if (type.includes("pyq")) return "📝";

    return "📚";
}

// ----------------------------
// BREADCRUMB
// ----------------------------
function updateBreadcrumb() {

    let text = "Home";

    if (currentCourse) {
        text += " / " + currentCourse;
    }

    if (currentSubject) {
        text += " / " + currentSubject;
    }

    document.getElementById("breadcrumb")
        .innerText = text;
}

// ----------------------------
// BACK
// ----------------------------
function goBack() {

    if (currentSubject) {
        loadSubjects(currentCourse);
        return;
    }

    if (currentCourse) {
        loadCourses();
    }
}

// ----------------------------
// SHOW BACK BUTTON
// ----------------------------
function toggleBack() {

    const btn =
        document.getElementById("backBtn");

    if (currentCourse || currentSubject) {
        btn.classList.remove("hidden");
    } else {
        btn.classList.add("hidden");
    }
}