const fetchGitHubUsers = async () => {
  let GitHubUserListDiv = document.getElementById("GitHubUsersList");
  GitHubUserListDiv.innerHTML = "";
  let searchInput = document.getElementById("searchInput").value;

  try {
    const response = await fetch(
      `https://api.github.com/search/users?q=${searchInput}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data.items.length === 0) {
      throw new Error("No users found");
    }
    displayGitHubUsersList(data.items);
  } catch (error) {
    console.error(error);
    displayError(error.message);
  }
};

const displayGitHubUsersList = async (users) => {
  let GitHubUserListDiv = document.getElementById("GitHubUsersList");
  GitHubUserListDiv.innerHTML = "";

  for (const user of users) {
    // user list li node
    const UserListTile = document.createElement("li");
    UserListTile.addEventListener("click", () =>
      fetchGitHubUserDetails(user.login)
    );
    UserListTile.classList.add(
      "list-group-item",
      "d-flex",
      "align-items-center",
      "py-2",
      "cursor"
    );

    // avatar node
    const avatar = document.createElement("img");
    avatar.classList.add("list-avatar", "mx-2", "rounded-circle");
    avatar.src = user.avatar_url;
    UserListTile.appendChild(avatar);

    // username node
    const userName = document.createElement("span");
    userName.classList.add("user-name");
    userName.textContent =
      user.login.charAt(0).toUpperCase() + user.login.slice(1);
    UserListTile.appendChild(userName);

    GitHubUserListDiv.appendChild(UserListTile);
  }
};

const fetchGitHubUserDetails = async (username) => {
  searchInput.value = null;
  try {
    const response = await fetch(`https://api.github.com/users/${username}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const user = await response.json();
    displayGitHubUserDetails(user);
  } catch (error) {
    console.error(error);
    displayError(error.message);
  }
};

const displayGitHubUserDetails = (user) => {
  let GitHubUserListDiv = document.getElementById("GitHubUsersList");
  GitHubUserListDiv.innerHTML = "";

  // create a row for user details
  let row = document.createElement("div");
  row.classList.add("row", "mt-4");

  // create left column for user avatar and name
  let leftCol = document.createElement("div");
  leftCol.classList.add("col-md-5", "text-center");
  row.appendChild(leftCol);

  // add user avatar to the left column
  let avatar = document.createElement("img");
  avatar.classList.add("avatar", "mb-3", "rounded-circle");
  avatar.src = user.avatar_url;
  leftCol.appendChild(avatar);

  // add user name to the left column
  let userName = document.createElement("h4");
  userName.textContent = user.login;
  leftCol.appendChild(userName);

  // create right column for user details
  let rightCol = document.createElement("div");
  rightCol.classList.add("col-md-7");
  row.appendChild(rightCol);

  // add user bio to the right column
  let bio = document.createElement("p");
  bio.textContent = user.bio;
  rightCol.appendChild(bio);

  // create a list for user details
  let list = document.createElement("ul");
  list.classList.add("list-group", "list-group-flush");
  rightCol.appendChild(list);

  // add user location to the list
  if (user.location) {
    let location = document.createElement("li");
    location.classList.add("list-group-item");
    location.innerHTML = `<strong>Location:</strong> ${user.location}`;
    list.appendChild(location);
  }

  // add followers and following to the list
  let followers = document.createElement("li");
  followers.classList.add("list-group-item");
  followers.innerHTML = `<strong>Followers:</strong> ${user.followers} | <strong>Following:</strong> ${user.following}`;
  list.appendChild(followers);

  // add public repositories to the list
  let publicRepos = document.createElement("li");
  publicRepos.classList.add("list-group-item");
  publicRepos.innerHTML = `<strong>Public Repositories:</strong> ${user.public_repos}`;
  list.appendChild(publicRepos);

  // add company to the list
  if (user.company) {
    let company = document.createElement("li");
    company.classList.add("list-group-item");
    company.innerHTML = `<strong>Company:</strong> ${user.company}`;
    list.appendChild(company);
  }

  // add website to the list
  if (user.blog) {
    let website = document.createElement("li");
    website.classList.add("list-group-item");
    website.innerHTML = `<strong>Website:</strong> <a href="${user.blog}" target="_blank">${user.blog}</a>`;
    list.appendChild(website);
  }

  // add account creation date to the list
  let createdAt = document.createElement("li");
  createdAt.classList.add("list-group-item");
  createdAt.innerHTML = `<strong>Account created at:</strong> ${new Date(
    user.created_at
  ).toLocaleDateString()}`;
  list.appendChild(createdAt);

  // add last active date to the list
  let lastActive = document.createElement("li");
  lastActive.classList.add("list-group-item");
  lastActive.innerHTML = `<strong>Last active:</strong> ${new Date(
    user.updated_at
  ).toLocaleDateString()}`;
  list.appendChild(lastActive);

  GitHubUserListDiv.appendChild(row);
};

function displayError(message) {
  document.getElementById("errorMessage").textContent = message;
  var errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
  errorModal.show();
}
