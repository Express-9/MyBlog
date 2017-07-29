const BaseMongoDbData = require('./base/base.data');
const Post = require('../models/post.model');

class PostData extends BaseMongoDbData {
    constructor(db) {
        super(db, Post);
    }

    getAllForUser(user) {
        return this
            .filterBy({ user: user });
    }
//     getPostForUser(id) {
//         return this
//             .findById(id);
//     }
}

module.exports = PostData;
