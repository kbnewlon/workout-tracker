const path = require("path");
const router = require("express").Router();

//get /  index.html
router.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"));
});
//get stats.html
router.get("/stats", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/stats.html"));
});
//get exercise.html
router.get("/exercise", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/exercise.html"));
});

module.exports = router;