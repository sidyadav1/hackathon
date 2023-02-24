const { generateToken } = require("../helpers/jwt");
const crypto = require("crypto");
const {
    validateEmail,
    validateName,
    validatePassword,
} = require("../helpers/valdation");
const { createUser, getUserByEmail } = require("../models/users");

const registration = async (req, res) => {
    try {
        const { email, password, name } = req.body;

        if (!validateEmail(email) || !validateName(name) || !validatePassword) {
            return res.status(400).json({
                success: false,
                message: "Fill in valid username, email and password",
            });
        }

        const user = await getUserByEmail({ email });
        if (user) {
            return res.status(403).json({
                success: false,
                message: "Email address already exists.",
            });
        }

        const newUser = await createUser({ name, email, password });
        const payload = { id: newUser.id };
        const token = await generateToken({ payload });
        return res.status(200).json({
            success: true,
            data: {
                user: newUser,
                token,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            ...error,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email or Password is empty",
            });
        }

        const user = await getUserByEmail({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email address not found.",
            });
        }

        const passwordHash = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");

        if (passwordHash != user.password) {
            return res.status(401).json({
                success: false,
                message: "Incorrect Password",
            });
        }

        const payload = { id: user.id };
        const token = await generateToken({ payload });
        return res.status(200).json({
            success: true,
            data: {
                user,
                token,
            },
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            ...error,
        });
    }
};

module.exports = { registration, login };
