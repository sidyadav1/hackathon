const { createNewTeam, getAllTeams, getTeamById } = require("../models/teams");

const createTeam = async (req, res) => {
    try {
        const { name, image } = req.body;
        if (!name || !image) {
            return res.status(400).json({
                success: false,
                message: "Name and image is required",
            });
        }

        await createNewTeam({ name, image });
        return res
            .status(200)
            .json({ success: true, message: "New Team Created" });
    } catch (error) {
        return res.status(500).json({
            success: false,
            ...error,
        });
    }
};

const allTeams = async (req, res) => {
    try {
        const teams = await getAllTeams();
        return res.status(200).json({
            success: true,
            data: teams,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            ...error,
        });
    }
};

const getTeam = async (req, res) => {
    try {
        const { id } = req.body;
        if (!id) {
            return res.status(400).json({
                success: false,
                message: "Team id is required",
            });
        }
        const team = await getTeamById({ id });
        return res.status(200).json({
            success: true,
            data: team,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            ...error,
        });
    }
};

module.exports = { createTeam, getTeam, allTeams };
