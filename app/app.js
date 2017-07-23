/* globals __dirname */

const path = require('path');

const express = require('express');
const fs = require('fs');

const init = (data) => {
    const app = express();
    require('./config/app.config').applyTo(app);
    require('./config/auth.config').applyTo(app, data);

    fs.readdirSync(path.join(__dirname, 'routers/'))
        .forEach((file) => {
            const modulePath = path.join(
                path.join(__dirname, 'routers'),
                file);
            const RouterClass = require(modulePath);
            new RouterClass().attachTo(app, data);
        });

    return Promise.resolve(app);
};

module.exports = {
    init,
};
