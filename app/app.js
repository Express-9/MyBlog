/* globals __dirname */

const path = require('path');

const express = require('express');
const fs = require('fs');

const init = (data) => {
    const app = express();
    require('./config/app.config').applyTo(app);

    app.get('/', (req, res) => {
        return res.render('home');
    });

    fs.readdirSync(path.join(__dirname, 'controllers/'))
        .forEach((file) => {
            const modulePath = path.join(
                path.join(__dirname, 'controllers'),
                file);
            require(modulePath).attachTo(app, data);
        });

    return Promise.resolve(app);
};

module.exports = {
    init,
};
