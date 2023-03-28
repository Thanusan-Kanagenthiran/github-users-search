const fetchGitHubUsers = async (searchInput) => {
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

const displayGitHubUsersList = (users) => {
  if (!users.length) {
    console.log("No users found");
    return;
  }
  users.forEach((user) => {
    console.log(user.login);
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
