/* globals __dirname */

const path = require('path');
const fs = require('fs');

const init = (db) => {
    const data = {};
    fs.readdirSync(__dirname)
        .filter((file) => file.includes('.data'))
        .forEach((file) => {
            const modulePath = path.join(__dirname, file);
            const ClassObject = require(modulePath);
            data[file.split('.')[0]] = new ClassObject(db);
        });
    return Promise.resolve(data);
};

module.exports = { init };
