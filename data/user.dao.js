const BaseMongoDbData = require('./base/base.data');
const User = require('../models/user.model');

class UserDao extends BaseMongoDbData {
    constructor(db) {
        super(db, User);
    }

    findByUsername(name) {
        return this
            .filterBy({ name: new RegExp(name, 'i') })
            .then(([user]) => user);
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
module.exports = UserDao;
