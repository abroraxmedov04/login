const TOKEN_KEY = "token";
const LOGIN_URL = "https://reqres.in/api/login";
const INDEX_PAGE = "./index.html";

const form = document.querySelector(".js-form");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");
const showPassword = document.querySelector(".show-password");

showPassword.addEventListener("mousedown", (e) => {
  passwordInput.type = "text";
});

showPassword.addEventListener("mouseup", (e) => {
  passwordInput.type = "password";
});

showPassword.addEventListener("mouseleave", (e) => {
  passwordInput.type = "password";
});

if (window.localStorage.getItem(TOKEN_KEY)) {
  window.location.pathname = INDEX_PAGE;
}

async function postUserData(email, password) {
  try {
    let response = await fetch(LOGIN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      throw new Error(
        `Fetch problem: ${response.status} ${response.statusText}`
      );
    }

    let data = await response.json();

    if (data.token) {
      window.localStorage.setItem(TOKEN_KEY, data.token);
      window.location.pathname = INDEX_PAGE;
    } else {
      throw new Error("No token r eceived");
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  postUserData(email, password);
});
