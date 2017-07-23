const { Router } = require('express');

class CategoriesController {
    constructor(data) {
        this.data = data;
    }

    all(req, res) {
        const categories = this.data.category.getAll();
        res.send(categories);
    }

    attachTo(app) {
        const apiRouter = new Router();
        apiRouter.get('/', this.all);
        app.use('/api/categories', apiRouter);
    }
}
module.exports = CategoriesController;

// Questions
// how to choose category
// where and how to update the category
