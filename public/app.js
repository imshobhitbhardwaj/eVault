
let token = localStorage.getItem("token");

/* ======================
   INDEX (FIXED 100%)
====================== */
function isIndex() {
  return (
    location.pathname.endsWith("index.html") ||
    location.pathname === "/" ||
    location.pathname === ""
  );
}

if (isIndex()) {

  window.addEventListener("DOMContentLoaded", () => {

    const loginBtn = document.getElementById("loginBtn");
    const registerBtn = document.getElementById("registerBtn");

    if (!loginBtn || !registerBtn) {
      console.error("Index buttons not found");
      return;
    }

    loginBtn.addEventListener("click", () => {
      location.href = "auth.html?mode=login";
    });

    registerBtn.addEventListener("click", () => {
      location.href = "auth.html?mode=register";
    });

  });
}

/* ======================
   AUTH
====================== */
if (location.pathname.includes("auth.html")) {

  const params = new URLSearchParams(location.search);
  let mode = params.get("mode") || "login";

  window.addEventListener("DOMContentLoaded", () => {

    const title = document.getElementById("title");
    const btn = document.getElementById("authBtn");
    const switchText = document.getElementById("switchText");

    function render() {
      if (mode === "login") {
        title.innerText = "Login";
        btn.innerText = "Login";
        switchText.innerHTML = `No account? <a href="?mode=register">Register</a>`;
      } else {
        title.innerText = "Register";
        btn.innerText = "Register";
        switchText.innerHTML = `Already have account? <a href="?mode=login">Login</a>`;
      }
    }

    render();

    btn.onclick = async () => {

      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const url = mode === "login"
        ? "/api/auth/login"
        : "/api/auth/register";

      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await res.json();

      if (!data.token) {
        alert(data.message || "Error");
        return;
      }

      localStorage.setItem("token", data.token);
      location.href = "dashboard.html";
    };
  });
}

/* ======================
   DASHBOARD
====================== */
if (location.pathname.includes("dashboard.html")) {

  if (!token) location.href = "auth.html?mode=login";

  async function loadUser() {
    const res = await fetch("/api/auth/me", {
      headers: { Authorization: token }
    });

    const user = await res.json();
    document.getElementById("userEmail").innerText = user.email;
  }

  loadUser();

  document.getElementById("logoutBtn").onclick = () => {
    localStorage.removeItem("token");
    location.href = "auth.html?mode=login";
  };

  document.getElementById("uploadBtn").onclick = async () => {

    const file = document.getElementById("file").files[0];
    if (!file) return alert("Select file");

    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/files/upload", {
      method: "POST",
      headers: { Authorization: token },
      body: form
    });

    const data = await res.json();
    alert(data.message);
  };

  document.getElementById("loadBtn").onclick = async () => {

    const res = await fetch("/api/files/files", {
      headers: { Authorization: token }
    });

    const data = await res.json();

    const list = document.getElementById("list");

    if (!data.length) {
      list.innerHTML = `<p style="color:#94a3b8;">No files uploaded yet</p>`;
      return;
    }

    list.innerHTML = data.map(f =>
      `<div>
        ${f.originalName}
        <button onclick="downloadFile('${f._id}')">Download</button>
      </div>`
    ).join("");
  };

  window.downloadFile = (id) => {
    location.href = `/api/files/download/${id}`;
  };
}