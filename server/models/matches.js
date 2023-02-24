const { v4: uuid } = require("uuid");
const db = require("../libraries/db");

const createNewMatch = ({ teama, teamb, date }) => {
    return new Promise((resolve, reject) => {
        const newScore = {
            runs: 0,
            wickets: 0,
            overs: 0,
        };
        const score = { teama: newScore, teamb: newScore };
        const match = {
            id: uuid(),
            teama,
            teamb,
            date,
            result: null,
            score,
        };
        db("matches")
            .insert(match)
            .then(() => resolve())
            .catch((error) => reject(error));
    });
};

const getMatchById = ({ id }) => {
    return new Promise((resolve, reject) => {
        db("matches")
            .select("*")
            .where({ id })
            .then((rows) => resolve(rows[0]))
            .catch((error) => reject(error));
    });
};

const updateMatchStatus = ({ matchid }) => {
    return new Promise((resolve, reject) => {
        db("matches")
            .update({ updated: true })
            .where({ matchid })
            .then(() => resolve())
            .catch((error) => reject(error));
    });
};

module.exports = { createNewMatch, getMatchById, updateMatchStatus };
