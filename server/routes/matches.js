const express = require("express");
const router = express.Router();
const matchController = require("../controllers/matches");

router.post("/new_match", matchController.createMatch);
router.get("/get_match_details", matchController.getMatchDetails);
router.get("/get_match", matchController.getMatch);

module.exports = router;
