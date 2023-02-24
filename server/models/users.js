const db = require("../libraries/db");
const crypto = require("crypto");
const { v4: uuid } = require("uuid");

const getUserByEmail = ({ email }) => {
    return new Promise((resolve, reject) => {
        db("users")
            .select("*")
            .where({ email })
            .then((rows) => resolve(rows[0]))
            .catch((error) => reject(error));
    });
};

const getUserById = ({ userid }) => {
    return new Promise((resolve, reject) => {
        db("users")
            .select("*")
            .where({ userid })
            .then((rows) => resolve(rows[0]))
            .catch((error) => reject(error));
    });
};

const createUser = ({ name, email, password }) => {
    return new Promise((resolve, reject) => {
        const passwordHash = crypto
            .createHash("sha256")
            .update(password)
            .digest("hex");
        const user = { id: uuid(), name, email, password: passwordHash };

        db("users")
            .insert({ ...user })
            .then(() => resolve(user))
            .catch((error) => reject(error));
    });
};

module.exports = { getUserByEmail, getUserById, createUser };
