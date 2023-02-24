const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../Keys");

const generateToken = ({ payload }) => {
    return new Promise((resolve, reject) => {
        jwt.sign(payload, SECRET_KEY, (error, token) => {
            if (error) {
                return reject(error);
            }
            return resolve(token);
        });
    });
};

const decryptToken = ({ token }) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, SECRET_KEY, (error, decoded) => {
            if (error) {
                return reject(error);
            }
            return resolve(decoded);
        });
    });
};

module.exports = { generateToken, decryptToken };
