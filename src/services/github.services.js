const axios = require("axios");

async function getGithubProfile(username) {
    const response = await axios.get(
        `https://api.github.com/users/${username}`,
        {
            headers: {
                "User-Agent": "github-profile-analyzer",
                "Accept": "application/vnd.github+json"
            }
        }
    );

    return response.data;
}

module.exports = { getGithubProfile };