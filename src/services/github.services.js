const axios = require("axios");

async function getGithubProfile(username) {
    const response = await axios.get(
        `https://api.github.com/users/${username}`
    );

    return response.data;
}

module.exports = { getGithubProfile };
function analyzeProfile(data) {

    const accountAge =
        new Date().getFullYear() -
        new Date(data.created_at).getFullYear();

    const profileScore =
        (data.followers * 2) +
        (data.public_repos * 3);

    const popularityLevel =
        data.followers > 1000 ? "HIGH" :
        data.followers > 100 ? "MEDIUM" :
        "LOW";

    return {
        username: data.login,
        github_id: data.id,
        name: data.name,
        bio: data.bio,
        public_repos: data.public_repos,
        followers: data.followers,
        following: data.following,
        profile_url: data.html_url,
        avatar_url: data.avatar_url,
        account_age: accountAge,
        profile_score: profileScore,
        popularity_level: popularityLevel
    };
}

module.exports = { getGithubProfile, analyzeProfile };