const { ObjectID } = require('mongodb');

class BaseMongoDbData {
    constructor(db, ModelClass) {
        this.db = db;
        this.ModelClass = ModelClass;
        this.validator = new ModelClass();
        this.collectionName = this._getCollectionName();
        this.collection = this.db.collection(this.collectionName);
    }

    filterBy(props) {
        return this.collection.find(props)
            .toArray();
    }

    getAll() {
        return this.collection.find()
            .toArray();
    }

    getAllForUser(user) {
        return this
            .filterBy({ user: user });
    }
    create(model) {
        try {
            this._isModelValid(model);
        } catch (err) {
            return Promise.reject('Validation failed: ' + err);
        }
        return this.collection.insert(model)
            .then(() => {
                return model;
            });
    }

    findById(id) {
        return this.collection.findOne({
            _id: new ObjectID(id),
        });
    }

    findOrCreateBy(props) {
        return this.filterBy(props)
            .then(([model]) => {
                if (!model) {
                    model = {};
                    return this.collection.insert(model)
                        .then(() => {
                            return model;
                        });
                }

                return model;
            });
    }

    updateById(model) {
        try {
         this._isModelValid(model);
        } catch (err) {
            return Promise.reject('Validation failed: ' + err);
        }
        const id = model._id;
        delete model._id;
        return this.collection.updateOne(
            { _id: new ObjectID(id) },
            { $set: model }
        );
    }
    deleteById(id) {
        return this.collection.remove(
            { _id: new ObjectID(id) },
            { justOne: true }
        );
    }
    _isModelValid(model) {
        if ('undefined' === typeof this.validator ||
            'function' !== typeof this.validator.isValid) {
            return true;
        }

        return this.validator.isValid(model);
    }

    _getCollectionName() {
        return this.ModelClass.name.toLowerCase() + 's';
    }
}

module.exports = BaseMongoDbData;
