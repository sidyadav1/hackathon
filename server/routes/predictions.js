const express = require("express");
const predictionsController = require("../controllers/predictions");
const authenticator = require("../middleware/authenticator");
const router = express.Router();

router.get("/user_predictions", predictionsController.userPredictions);
router.post(
    "/create_prediction",
    authenticator.jwtAuthenticator,
    predictionsController.createUserPrediction
);
router.get("/match_predictions", predictionsController.matchPredictions);
router.get("/update_predictions", predictionsController.updatePrediction);

module.exports = router;
