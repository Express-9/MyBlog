class PostController {
    constructor(data) {
        this.data = data;
    }
    getPosts(req, res) {
        this.data.post.getAllForUser(req.params.user).then((posts) => {
            res.render('blogs/posts', {
                posts,
                currentUserName: req.params.user,
                isOwnerLoggedIn: (req.user ?
                    req.params.user === req.user.name : false),
            });
        });
    }

    getPostsAPI(req, res) {
        this.data.post.getAllForUser(req.params.user).then((posts) => {
            res.send(posts);
        });
    }

    getPostForm(req, res) {
        this.data.category.getAllForUser(req.params.user).then((categories) => {
            res.render('blogs/createPost', {
                categories,
                currentUserName: req.params.user,
                isOwnerLoggedIn: (req.user ?
                    req.params.user === req.user.name : false),
            });
        });
    }

    createPost(req, res) {
        const bodyPost = req.body;
        bodyPost.user = req.params.user;
        return this.data.post.create(bodyPost)
            .then((post) => {
                return res.redirect('/blogs/'
                    + encodeURIComponent(req.params.user));
            })
            .catch((err) => {
                req.flash('error', err);
                return res.redirect('/blogs/'
                    + encodeURIComponent(req.params.user) + '/post/form');
            });
    }
    viewPost(req, res) {
        this.data.post.findById(req.params.id)
            .then((post) => {
                res.render('blogs/post', {
                    post,
                    currentUserName: req.params.user,
                    isOwnerLoggedIn: (req.user ?
                        req.params.user === req.user.name : false),
                });
            });
    }
    viewPostAPI(req, res) {
        this.data.post.findById(req.params.id)
            .then((post) => {
                res.send(post);
            });
    }
    getEditForm(req, res) {
        this.data.category.getAllForUser(req.params.user).then((categories) => {
            this.data.post.findById(req.params.id)
                .then((post) => {
                    res.render('blogs/editPost', {
                        categories,
                        post,
                        currentUserName: req.params.user,
                        isOwnerLoggedIn: (req.user ?
                            req.params.user === req.user.name : false),
                    });
                });
        });
    }
    editPost(req, res) {
        const bodyPost = req.body;
        const id = bodyPost._id;
        bodyPost.user = req.params.user;
        return this.data.post.updateById(bodyPost)
            .then((post) => {
                return res.redirect('/blogs/'
                    + encodeURIComponent(req.params.user) +
                    '/post/' +
                    bodyPost.category +
                    '/' +
                    id);
            })
            .catch((err) => {
                req.flash('error', err);
                return res.redirect('/blogs/' +
                    encodeURIComponent(req.params.user) +
                    '/post/' +
                    bodyPost.category +
                    '/' +
                    id +
                    '/edit/form');
            });
    }
}
module.exports = PostController;
