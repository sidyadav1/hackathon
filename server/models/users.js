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

const getUserById = ({ id }) => {
    return new Promise((resolve, reject) => {
        db("users")
            .select("*")
            .where({ id })
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

const updateUserScore = ({ ids }) => {
    return new Promise((resolve, reject) => {
        db("users")
            .increment("score", 10)
            .whereIn("id", ids)
            .then(() => resolve(user))
            .catch((error) => reject(error));
    });
};

const getUsersLeaderBoard = () => {
    return new Promise((resolve, reject) => {
        db("users")
            .select("*")
            .orderBy("score", "desc")
            .limit(3, { skipBinding: true })
            .then(() => resolve(user))
            .catch((error) => reject(error));
    });
};

module.exports = {
    getUserByEmail,
    getUserById,
    createUser,
    updateUserScore,
    getUsersLeaderBoard,
};
