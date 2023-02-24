const { decryptToken } = require("../helpers/jwt");

const jwtAuthenticator = async (req, res, next) => {
    try {
        if (
            !req.headers.authorization ||
            !req.headers.authorization.includes("Bearer ")
        ) {
            res.status(400).json({
                success: false,
                message: "Token not found",
            });
        }

        const token = req.headers.authorization.split(" ")[1];
        const payload = await decryptToken({ token });
        req.session = payload;

        next();
    } catch (error) {
        res.status(400).json({
            success: false,
            ...error,
        });
    }
};

module.exports = { jwtAuthenticator };
