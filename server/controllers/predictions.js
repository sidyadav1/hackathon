const { getMatchById, updateMatchStatus } = require("../models/matches");
const {
    getUserPredictions,
    createPrediction,
    updatePredictions,
    getMatchPredictions,
    getUserPredictionForMatch,
} = require("../models/predictions");
const { updateUserScore } = require("../models/users");

const userPredictions = async (req, res) => {
    try {
        const { id, offset } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User id is required",
            });
        }

        const predictions = await getUserPredictions({ userid: id, offset });
        res.status(200).json({
            success: true,
            data: predictions,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            ...error,
        });
    }
};

const createUserPrediction = async (req, res) => {
    try {
        const { userid, matchid, prediction } = req.body;

        if (!userid || !matchid || !prediction) {
            return res.status(400).json({
                success: false,
                message: "Fields are missing.",
            });
        }

        const existingPrediction = await getUserPredictionForMatch({
            userid,
            matchid,
        });
        if (existingPrediction) {
            return res.status(403).json({
                success: false,
                message: "User prediction for match already exists.",
            });
        }

        const match = await getMatchById({ id: matchid });
        if (!match) {
            return res.status(404).json({
                success: false,
                message: "Match not found",
            });
        }

        await createPrediction({ userid, matchid, prediction });
        return res
            .status(200)
            .json({ success: true, message: "User prediction created" });
    } catch (error) {
        return res.status(500).json({
            success: false,
            ...error,
        });
    }
};

const matchPredictions = async (req, res) => {
    try {
        const { id, offset } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Match id is missing.",
            });
        }

        const predictions = getMatchPredictions({ matchid: id, offset });
        return res.status(200).json({ success: true, data: predictions });
    } catch (error) {
        return res.status(500).json({
            success: false,
            ...error,
        });
    }
};

const updatePrediction = async (req, res) => {
    try {
        const { matchid, result } = req.body;
        if (!matchid || !result) {
            return res.status(400).json({
                success: false,
                message: "Fields are missing.",
            });
        }

        const match = await getMatchById({ id: matchid });
        if (!match) {
            return res.status(404).json({
                success: false,
                message: "Match not found",
            });
        }

        if (match.updated) {
            return res.status(403).json({
                success: false,
                message: "Match already updated",
            });
        }

        const predictions = await updatePredictions({ matchid, result });
        const ids = predictions.map((prediction) => prediction.userid);
        await updateUserScore({ ids });
        await updateMatchStatus({ matchid });
        res.status(200).json({ success: true, message: "Predictions Updated" });
    } catch (error) {
        return res.status(500).json({
            success: false,
            ...error,
        });
    }
};

module.exports = {
    userPredictions,
    createUserPrediction,
    matchPredictions,
    updatePrediction,
};
