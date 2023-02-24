const { v4: uuid } = require("uuid");
const db = require("../libraries/db");

const createPrediction = ({ userid, matchid, prediction }) => {
    return new Promise((resolve, reject) => {
        const newPrediction = {
            id: uuid(),
            userid,
            matchid,
            prediction,
            date: Date.now(),
        };
        db("predictions")
            .insert(newPrediction)
            .then(() => resolve())
            .catch((error) => reject(error));
    });
};

const getUserPredictions = ({ userid }) => {
    return new Promise((resolve, reject) => {
        db("predictions")
            .select("*")
            .orderBy("date", "desc")
            .where({ userid })
            .then((rows) => resolve(rows))
            .catch((error) => reject(error));
    });
};

const getMatchPredictions = ({ matchid, offset }) => {
    return new Promise((resolve, reject) => {
        db("predictions")
            .select("*")
            .where({ matchid })
            .orderBy("date", "asc")
            .offset(offset, { skipBinding: true })
            .limit(20, { skipBinding: true })
            .then((rows) => resolve(rows))
            .catch((error) => reject(error));
    });
};

const updatePredictions = ({ matchid, result }) => {
    return new Promise((resolve, reject) => {
        db("predictions")
            .update({ result: true })
            .where({ matchid, prediction: result })
            .returning("*")
            .then((rows) => resolve(rows))
            .catch((error) => reject(error));
    });
};

const getUserPredictionForMatch = ({ userid, matchid }) => {
    return new Promise((resolve, reject) => {
        db("predictions")
            .select("*")
            .where({ matchid, userid })
            .then((rows) => resolve(rows[0]))
            .catch((error) => reject(error));
    });
};

module.exports = {
    getUserPredictions,
    createPrediction,
    getMatchPredictions,
    getUserPredictionForMatch,
    updatePredictions,
};
