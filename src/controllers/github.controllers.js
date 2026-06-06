const axios = require("axios");
const db = require("../config/db");

const analyzeProfile = async (req, res) => {
    try {
        const { username } = req.params;

        // 1. Fetch GitHub data
        const { data } = await axios.get(
            `https://api.github.com/users/${username}`
        );

        // 2. Simple insights (IMPORTANT ADDITION 🔥)
        const accountAge =
            new Date().getFullYear() -
            new Date(data.created_at).getFullYear();

        const profileScore =
            (data.followers * 2) +
            (data.public_repos * 3);

        const popularity =
            data.followers > 500 ? "HIGH" :
            data.followers > 100 ? "MEDIUM" :
            "LOW";

        // 3. Save in DB
        const sql = `
            INSERT INTO profiles 
            (username, github_id, name, bio, public_repos, followers, following, profile_url, avatar_url)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
                name = VALUES(name),
                bio = VALUES(bio),
                public_repos = VALUES(public_repos),
                followers = VALUES(followers),
                following = VALUES(following),
                profile_url = VALUES(profile_url),
                avatar_url = VALUES(avatar_url)
        `;

        await db.execute(sql, [
            data.login,
            data.id,
            data.name,
            data.bio,
            data.public_repos,
            data.followers,
            data.following,
            data.html_url,
            data.avatar_url
        ]);

        // 4. Final response (with insights)
        return res.json({
            success: true,
            message: "Profile analyzed & saved",
            analysis: {
                username: data.login,
                followers: data.followers,
                repos: data.public_repos,
                accountAge,
                profileScore,
                popularity
            }
        });

   } catch (error) {
    return res.status(500).json({
        success: false,
        message: error.message,
        code: error.code  // ye add karo
    });
}
};

const getAllProfiles = async (req, res) => {
    try {
        const [rows] = await db.execute(
            "SELECT * FROM profiles"
        );

        return res.json({
            success: true,
            count: rows.length,
            data: rows
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
const getProfileByUsername = async (req, res) => {
    try {
        const { username } = req.params;

        const [rows] = await db.execute(
            "SELECT * FROM profiles WHERE username = ?",
            [username]
        );

        if (rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Profile not found"
            });
        }

        return res.json({
            success: true,
            data: rows[0]
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
module.exports = { analyzeProfile ,getAllProfiles,getProfileByUsername };