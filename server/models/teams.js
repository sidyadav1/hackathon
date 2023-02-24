const db = require("../libraries/db");
const { v4: uuid } = require("uuid");

const createNewTeam = ({ name, image }) => {
    return new Promise((resolve, reject) => {
        const team = { id: uuid(), name, image };
        db("teams")
            .insert(team)
            .then(() => resolve())
            .catch((error) => reject(error));
    });
};

const getAllTeams = () => {
    return new Promise((resolve, reject) => {
        db("teams")
            .select("*")
            .then((rows) => resolve(rows))
            .catch((error) => reject(error));
    });
};

const getTeamById = ({ id }) => {
    return new Promise((resolve, reject) => {
        db("teams")
            .select("*")
            .where({ id })
            .then((rows) => resolve(rows[0]))
            .catch((error) => reject(error));
    });
};

module.exports = { createNewTeam, getAllTeams, getTeamById };
