const encryptor = require('../utils/encryptor');
const BaseMongoDbData = require('./base/base.data');
const User = require('../models/user.model');

class UserData extends BaseMongoDbData {
    constructor(db) {
        super(db, User);
    }

    findByUsername(name) {
        return this
            .filterBy({ name: new RegExp(name, 'i') })
            .then((users) => users[0]);
    }
    checkPassword(username, password, done) {
        return this.findByUsername(username)
            .then((user) => {
                if (!user) {
                    return done(null, false,
                        { message: 'Incorrect username or password!' });
                }

                if (user.password !== encryptor.encrypt(password)) {
                    return done(null, false,
                        { message: 'Incorrect username or password!' });
                }

                return done(null, user);
            });
    }
}
module.exports = UserData;
