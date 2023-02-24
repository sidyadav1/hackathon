const { getUserById, getUsersLeaderBoard } = require("../models/users");

const me = async (req, res) => {
    try {
        const { id } = req.session;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User id is required",
            });
        }

        const user = await getUserById({ id });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            ...error,
        });
    }
};

const userLeaderBoard = async (req, res) => {
    try {
        const leaderBoard = await getUsersLeaderBoard();
        res.status(200).json({ success: true, data: leaderBoard });
    } catch (error) {
        return res.status(500).json({
            success: false,
            ...error,
        });
    }
};

module.exports = { me, userLeaderBoard };
