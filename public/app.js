const token = localStorage.getItem("token");

const path = window.location.pathname;

const isIndexPage = path === "/" || path.includes("index");
const isLoginPage = path.includes("/login");
const isRegisterPage = path.includes("/register");
const isDashboardPage = path.includes("/dashboard");

/* =========================
   INDEX PAGE FIX (LOGIN / REGISTER BUTTONS)
========================= */
if (isIndexPage) {

  window.addEventListener("DOMContentLoaded", () => {

    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");

    if (loginBtn) {
      loginBtn.onclick = () => {
        window.location.href = "/login";
      };
    }

    if (registerBtn) {
      registerBtn.onclick = () => {
        window.location.href = "/register";
      };
    }

  });
}

/* =========================
   AUTH GUARD
========================= */
if (isDashboardPage && !token) {
  window.location.href = "/login";
}

/* =========================
   AUTH PAGE (LOGIN / REGISTER)
========================= */
if (isLoginPage || isRegisterPage) {

  window.addEventListener("DOMContentLoaded", () => {

    const mode = isRegisterPage ? "register" : "login";

    const title = document.getElementById("title");
    const authBtn = document.getElementById("authBtn");
    const switchText = document.getElementById("switchText");

    if (!title || !authBtn) return;

    if (mode === "login") {
      title.innerText = "Login";
      authBtn.innerText = "Login";
      if (switchText) {
        switchText.innerHTML = `No account? <a href="/register">Register</a>`;
      }
    } else {
      title.innerText = "Register";
      authBtn.innerText = "Register";
      if (switchText) {
        switchText.innerHTML = `Already have account? <a href="/login">Login</a>`;
      }
    }

    authBtn.onclick = async () => {

      const email = document.getElementById("email")?.value?.trim();
      const password = document.getElementById("password")?.value?.trim();

      if (!email || !password) {
        return alert("Please fill all fields");
      }

      const endpoint = mode === "login"
        ? "/api/auth/login"
        : "/api/auth/register";

      try {

        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password })
        });

        const data = await res.json();

        if (!res.ok) {
          return alert(data.message || "Error");
        }

        localStorage.setItem("token", data.token);

        window.location.href = "/dashboard";

      } catch (err) {
        console.error(err);
        alert("Network error");
      }

    };

  });
}

/* =========================
   DASHBOARD PAGE
========================= */
if (isDashboardPage) {

  window.addEventListener("DOMContentLoaded", () => {

    loadUser();

    const logoutBtn = document.getElementById("logoutBtn");
    const uploadBtn = document.getElementById("uploadBtn");
    const loadBtn = document.getElementById("loadBtn");

    if (logoutBtn) {
      logoutBtn.onclick = () => {
        localStorage.removeItem("token");
        window.location.href = "/login";
      };
    }

    if (uploadBtn) {
      uploadBtn.onclick = async () => {

        const file = document.getElementById("file")?.files?.[0];

        if (!file) {
          return alert("Select file");
        }

        const form = new FormData();
        form.append("file", file);

        try {

          const res = await fetch("/api/files/upload", {
            method: "POST",
            headers: { Authorization: token },
            body: form
          });

          const data = await res.json();
          alert(data.message);

        } catch (err) {
          console.error(err);
          alert("Upload failed");
        }

      };
    }

    if (loadBtn) {
      loadBtn.onclick = async () => {

        try {

          const res = await fetch("/api/files/files", {
            headers: { Authorization: token }
          });

          const data = await res.json();

          const list = document.getElementById("list");

          if (!list) return;

          if (!data.length) {
            list.innerHTML = `<p style="color:#94a3b8;">No files uploaded yet</p>`;
            return;
          }

          list.innerHTML = data.map(file => `
            <div class="fileItem">
              <span>${file.originalName}</span>
              <button class="downloadBtn" data-id="${file._id}">
                Download
              </button>
            </div>
          `).join("");

        } catch (err) {
          console.error(err);
          alert("Failed to load files");
        }

      };
    }

    /* CLICK HANDLER FOR DOWNLOAD */
    document.addEventListener("click", (e) => {
      if (e.target.classList.contains("downloadBtn")) {
        downloadFile(e.target.dataset.id);
      }
    });

  });
}

/* =========================
   LOAD USER
========================= */
async function loadUser() {

  try {

    const res = await fetch("/api/auth/me", {
      headers: { Authorization: token }
    });

    const user = await res.json();

    const el = document.getElementById("userEmail");
    if (el) el.innerText = user.email;

  } catch (err) {
    console.error(err);
  }
}

/* =========================
   DOWNLOAD FILE
========================= */
async function downloadFile(id) {

  try {

    const res = await fetch(`/api/files/download/${id}`, {
      headers: { Authorization: token }
    });

    const blob = await res.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "file";

    document.body.appendChild(a);
    a.click();
    a.remove();

  } catch (err) {
    console.error("Download failed", err);
  }
}