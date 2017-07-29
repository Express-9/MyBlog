const BaseMongoDbData = require('./base/base.data');
const Category = require('../models/category.model');

class CategoryData extends BaseMongoDbData {
    constructor(db) {
        super(db, Category);
    }
}
module.exports = CategoryData;
