const { createNewMatch, getMatchById } = require("../models/matches");
const { getUserPredictionForMatch } = require("../models/predictions");
const { getTeamById } = require("../models/teams");

const createMatch = async (req, res) => {
    try {
        const { teama, teamb, date } = req.body;

        if (!teama || !teamb || !date) {
            return res.status(400).json({
                success: false,
                message: "Both Teams are required",
            });
        }

        await createNewMatch({ teama, teamb, date });
        return res
            .status(200)
            .json({ success: true, message: "New match added" });
    } catch (error) {
        return res.status(500).json({
            success: false,
            ...error,
        });
    }
};

const getMatch = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Match Id is required",
            });
        }

        const match = await getMatchById({ id });
        const teama = await getTeamById({ id: match.teama });
        const teamb = await getTeamById({ id: match.teamb });

        return res.status(200).json({
            success: true,
            data: match,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            ...error,
        });
    }
};

const getMatchDetails = async (req, res) => {
    try {
        const { id, userid } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Match Id is required",
            });
        }

        const match = await getMatchById({ id });
        const teama = await getTeamById({ id: match.teama });
        const teamb = await getTeamById({ id: match.teamb });
        var userPrediction = null;
        if (userid) {
            userPrediction = getUserPredictionForMatch({ matchid, userid });
        }
        return res.status(200).json({
            success: true,
            data: { match, teama, teamb, userPrediction },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            ...error,
        });
    }
};

module.exports = { createMatch, getMatch, getMatchDetails };
