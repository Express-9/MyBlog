class CategoryController {
    constructor(data) {
        this.data = data;
    }

    getCategories(req, res) {
        this.data.category.getAllForUser(req.params.user).then((categories) => {
            res.render('blogs/articles', {
                categories,
                currentUserName: req.params.user,
                isOwnerLoggedIn: (req.user ?
                    req.params.user === req.user.name : false),
            });
        });
    }
    getCategoriesAPI(req, res) {
        this.data.category.getAllForUser(req.params.user).then((categories) => {
            const names = categories.map((cat) => {
                return cat.name;
            });
            res.send(names);
        });
    }
    getCategoryForm(req, res) {
        res.render('blogs/createCategory', {
            currentUserName: req.params.user,
            isOwnerLoggedIn: (req.user ?
                req.params.user === req.user.name : false),
        });
    }
    createCategory(req, res) {
        const bodyCategory = req.body;
        bodyCategory.user = req.params.user;
        return this.data.category.create(bodyCategory)
            .then((category) => {
                return res.redirect('/blogs/'
                    + encodeURIComponent(req.params.user) + '/articles');
            });
    }
    getPostsByCat(req, res, callback) {
        this.data.post.filterBy(
            {
                user: req.params.user,
                category: req.params.name,
            }
        ).then((posts) => {
            res.render('blogs/posts', {
                posts,
                currentUserName: req.params.user,
                isOwnerLoggedIn: (req.user ?
                    req.params.user === req.user.name : false),
            });
        });
    }
    getPostsByCatAPI(req, res) {
        this.data.post.filterBy(
            {
                user: req.params.user,
                category: req.params.name,
            }
        ).then((posts) => {
            res.send(posts);
        });
    }
}
module.exports = CategoryController;

