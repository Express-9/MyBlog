/* globals __dirname */

const path = require('path');
const fs = require('fs');

const init = (db) => {
    const daos = {};
    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.dao'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            const ClassObject = require(modulePath);
            daos[file.split('.')[0]] = new ClassObject(db);
        });
    return Promise.resolve(daos);
};

module.exports = { init };
