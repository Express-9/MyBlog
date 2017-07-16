/* eslint-disable no-console */

const async = require('./utils/async');
const config = require('./config');

async()
    .then(() => require('./db/db').init(config.connectionString))
    .then((db) => require('./data/data').init(db))
    .then((data) => require('./app/app').init(data))
    .then((app) => {
        app.listen(config.port, () =>
            console.log(`Server listening at :${config.port}`));
    });
