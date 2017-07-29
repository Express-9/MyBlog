const BaseMongoDbData = require('./base/base.data');
const Post = require('../models/post.model');

class PostData extends BaseMongoDbData {
    constructor(db) {
        super(db, Post);
    }
}

module.exports = PostData;
