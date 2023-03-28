// Fetch GitHub users based on search input
const fetchGitHubUsers = async () => {
  let GitHubUserListDiv = document.getElementById("GitHubUsersList");
  GitHubUserListDiv.innerHTML = "";
  let searchInput = document.getElementById("searchInput").value;

  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${searchInput}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    if (data.items.length === 0) {
      throw new Error("No users found");
    }
    displayGitHubUsersList(data.items);
  } catch (error) {
    console.error(error);
    alert(error.message);
  }
};

// Display the GitHub users list in the DOM
const displayGitHubUsersList = async (users) => {
  let GitHubUserListDiv = document.getElementById("GitHubUsersList");
  if (!users.length) {
    console.log("No users found");
    return;
  }
  await users.map((user, index) => {
    // user list li node
    const UserListTile = document.createElement("li");
    UserListTile.classList.add(
      "list-group-item",
      "d-flex",
      "justify-content-between",
      "align-items-start"
    );

    // username node
    const userName = document.createElement("span");
    userName.classList.add("user-name");
    userName.textContent = user.login;
    UserListTile.appendChild(userName);

    // avatar node
    const avatar = document.createElement("img");
    avatar.classList.add("avatar");
    avatar.src = user.avatar_url;
    avatar.style.width = "50px";
    avatar.style.height = "auto";
    UserListTile.appendChild(avatar);

    GitHubUserListDiv.appendChild(UserListTile);
  });
};

const fetchGitHubUserDetails = async (username) => {
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
