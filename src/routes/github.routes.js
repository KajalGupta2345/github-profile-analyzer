const express = require("express");
const router = express.Router();

const {
    analyzeProfile,
    getAllProfiles,
    getProfileByUsername
} = require("../controllers/github.controllers");

router.get("/", (req, res) => {
    res.json({
        message: "GitHub Profile Analyzer API is running"
    });
});
// analyze + save
router.get("/analyze/:username", analyzeProfile);

// all profiles
router.get("/profiles", getAllProfiles);

// single profile
router.get("/profiles/:username", getProfileByUsername);


module.exports = router;