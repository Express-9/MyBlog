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
    checkPassword(username, password) {
        return this.findByUsername(username)
            .then((user) => {
                if (!user) {
                    throw new Error('Invalid user');
                }

                if (user.password !== password) {
                    throw new Error('Invalid password');
                }

                return true;
            });
    }
}
module.exports = UserData;
