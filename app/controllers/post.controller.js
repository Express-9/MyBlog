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

    getPostForm(req, res) {
        res.render('blogs/createPost', {
            currentUserName: req.params.user,
            isOwnerLoggedIn: (req.user ?
                req.params.user === req.user.name : false),
        });
    }

    createPost(req, res) {
        const bodyPost = req.body;
        bodyPost.user = req.params.user;
        if (!req.user) {
            return Promise.resolve()
                .then(() => {
                    req.flash(
                        'err',
                        { message: 'You need authentication' }
                    );
                });
        }
        return this.data.post.create(bodyPost)
            .then((post) => {
                return res.redirect('/blogs/'
                    + encodeURIComponent(req.params.user));
            })
            .catch((err) => {
                req.flash('error', err);
                return res.redirect('/blogs/:user/post/form');
            });
    }
    // viewPost(req, res) {
    //     this.data.post.getPostForUser(req.post._id).then((post) => {
    //     res.render('blogs/post', {
    //         post,
    //         });
    //     });
    // }
}
module.exports = PostController;
