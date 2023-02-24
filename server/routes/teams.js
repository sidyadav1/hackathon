const express = require("express");
const { route } = require(".");
const teamsController = require("../controllers/teams");
const router = express.Router();

router.post("/add_team", teamsController.createTeam);
router.get("/all_teams", teamsController.allTeams);
router.get("/team", teamsController.getTeam);

module.exports = router;
