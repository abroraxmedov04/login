let TOKEN = window.localStorage.getItem("token");
let USERS_URL = "https://reqres.in/api/users";
let LOGIN_PAGE = "./login.html";

// elements
let list = document.querySelector(".list");

if (!TOKEN) {
  window.location.pathname = LOGIN_PAGE;
}

async function getUsersData() {
  try {
    let response = await fetch(USERS_URL);

    if (!response.ok) {
      throw new Error(
        `Fetch problem: ${response.status} ${response.statusText}`
      );
    }

    let data = await response.json();

    renderUsers(data.data, list);
  } catch (error) {
    console.error("Error:", error.message);
  }
}

function renderUsers(data, node) {
  let users = data.map((item) => {
    return `
        <li class="user">
        <img src="${item.avatar}" alt="users-image">
        <h3>${item.first_name} ${item.last_name}</h3>
        <p>email: <a href="#">${item.email}</a></p>
      </li>
        `;
  });

  node.innerHTML = users;
}

getUsersData();
