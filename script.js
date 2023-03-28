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
    UserListTile.addEventListener("click", () =>
      fetchGitHubUserDetails(user.login)
    );
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
  }
};

const displayGitHubUserDetails = (user) => {
  let GitHubUserListDiv = document.getElementById("GitHubUsersList");
  let userDetailsDiv = document.createElement("div");
  userDetailsDiv.classList.add("user-details");

  let userName = document.createElement("h2");
  userName.textContent = user.login;
  userDetailsDiv.appendChild(userName);
  // Avatar or profile picture
  let avatar = document.createElement("img");
  avatar.classList.add("avatar");
  avatar.src = user.avatar_url;
  userDetailsDiv.appendChild(avatar);

  // User Bio
  let bio = document.createElement("p");
  bio.textContent = user.bio;
  userDetailsDiv.appendChild(bio);

  // user location
  let location = document.createElement("p");
  location.textContent = user.location;
  userDetailsDiv.appendChild(location);

  // Followers and following
  let followers = document.createElement("p");
  followers.textContent = `Followers: ${user.followers} | Following: ${user.following}`;
  userDetailsDiv.appendChild(followers);

  // Public repositories
  let publicRepos = document.createElement("p");
  publicRepos.textContent = `Public Repositories: ${user.public_repos}`;
  userDetailsDiv.appendChild(publicRepos);

  // Company and website
  if (user.company) {
    let company = document.createElement("p");
    company.textContent = `Company: ${user.company}`;
    userDetailsDiv.appendChild(company);
  }

  // Blog detail
  if (user.blog) {
    let website = document.createElement("p");
    website.textContent = `Website: ${user.blog}`;
    userDetailsDiv.appendChild(website);
  }

  // Account creation and last active date
  let createdAt = document.createElement("p");
  createdAt.textContent = `Account created at: ${user.created_at}`;
  userDetailsDiv.appendChild(createdAt);
  // last activated
  let lastActive = document.createElement("p");
  lastActive.textContent = `Last active: ${user.updated_at}`;
  userDetailsDiv.appendChild(lastActive);

  GitHubUserListDiv.innerHTML = "";
  GitHubUserListDiv.appendChild(userDetailsDiv);
};
