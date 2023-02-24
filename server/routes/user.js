const express = require("express");
const userController = require("../controllers/user");
const authenticator = require("../middleware/authenticator");
const router = express.Router();

router.get("/me", authenticator.jwtAuthenticator, userController.me);
router.get("/users_leaderboard", userController.userLeaderBoard);

router.get("/", (req, res) => {
    res.send("Hiii");
});

module.exports = router;
