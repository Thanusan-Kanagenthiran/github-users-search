let contentBeforeSearch = document.getElementById("content-before-search");


const fetchGitHubUsers = async () => {
  contentBeforeSearch.classList.add("hide");
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
      "cursor",
      "bg-dark",
      "text-light",
      "border",
      "border-light"
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
  leftCol.classList.add("col-md-5", "text-center", "pt-4");
  row.appendChild(leftCol);

  // add user avatar to the left column
  let avatar = document.createElement("img");
  avatar.classList.add(
    "avatar",
    "border",
    "border-3",
    "mb-3",
    "rounded-circle"
  );
  avatar.src = user.avatar_url;
  leftCol.appendChild(avatar);

  // add username to the left column
  let userName = document.createElement("h5");
  userName.textContent = `@${user.login}`;
  leftCol.appendChild(userName);

  // add  name of the user to the left column
  let Name = document.createElement("h4");
  Name.textContent = user.name;
  leftCol.appendChild(Name);

  // add a "Go to Repo" button to the left column
  let repoButton = document.createElement("a");
  repoButton.classList.add("btn", "btn-primary", "my-3");
  repoButton.href = user.html_url;
  repoButton.textContent = "Go to Profile";
  leftCol.appendChild(repoButton);

  // create right column for user details
  let rightCol = document.createElement("div");
  rightCol.classList.add("col-md-7");
  row.appendChild(rightCol);

  // add user bio to the right column
  if (user.bio) {
    let bio = document.createElement("p");
    bio.textContent = user.bio;
    bio.classList.add("border", "rounded", "p-2", "mb-2");
    rightCol.appendChild(bio);
  }

  // create a container for user details
  let userDetails = document.createElement("div");
  userDetails.classList.add("user-details");
  rightCol.appendChild(userDetails);

  // add user location to the container
  if (user.location) {
    let location = document.createElement("div");
    location.classList.add("user-detail");
    location.innerHTML = `<i class="bi bi-geo-alt me-2"></i><strong>Location:  </strong> ${user.location}`;
    userDetails.appendChild(location);
  }

  // add followers and following to the container
  let followers = document.createElement("div");
  followers.classList.add("user-detail");
  followers.innerHTML = `<i class="bi bi-people-fill me-2"></i><strong>Followers: </strong> ${user.followers} | <strong>Following: </strong> ${user.following}`;
  userDetails.appendChild(followers);

  // add public repositories to the container
  let publicRepos = document.createElement("div");
  publicRepos.classList.add("user-detail");
  publicRepos.innerHTML = `<i class="bi bi-github me-2"></i><strong>Public Repositories:  </strong> ${user.public_repos}`;
  userDetails.appendChild(publicRepos);

  // add company to the container
  if (user.company) {
    let company = document.createElement("div");
    company.classList.add("user-detail");
    company.innerHTML = `<i class="bi bi-building-fill me-2"></i><strong>Company:  </strong> ${user.company}`;
    userDetails.appendChild(company);
  }

  // add website to the container
  if (user.blog) {
    let website = document.createElement("div");
    website.classList.add("user-detail");
    website.innerHTML = `<i class="bi bi-browser-edge me-2"></i><strong>Website:</strong> <a href="${user.blog}" class="text-decoration-none" target="_blank">${user.blog} <i class="bi bi-box-arrow-up-right"></i></a>`;
    userDetails.appendChild(website);
  }

  // add account creation date to the container
  let createdAt = document.createElement("div");
  createdAt.classList.add("user-detail");
  createdAt.innerHTML = `<i class="bi bi-person-plus-fill me-2"></i><strong>Account created at:  </strong> ${new Date(
    user.created_at
  ).toLocaleDateString()}`;
  userDetails.appendChild(createdAt);

  // add last active date to the list
  let lastActive = document.createElement("div");
  lastActive.classList.add("user-detail");
  lastActive.innerHTML = `<i class="bi bi-person-fill-check me-2"></i><strong>Last active at:  </strong> ${new Date(
    user.updated_at
  ).toLocaleDateString()}`;
  userDetails.appendChild(lastActive);

  GitHubUserListDiv.appendChild(row);
};

function displayError(message) {
  document.getElementById("errorMessage").textContent = message;
  var errorModal = new bootstrap.Modal(document.getElementById("errorModal"));
  errorModal.show();
}
