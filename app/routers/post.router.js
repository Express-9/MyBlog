const PostController = require('../controllers/post.controller');

function protect(callback) {
    return (req, res) => {
        if (!req.user || req.user.name !== req.params.user) {
            return Promise.resolve()
                .then(() => {
                    res.redirect('/login/form');
                });
        }
        return callback(req, res);
    };
}

class PostRouter {
    attachTo(app, data) {
        const controller = new PostController(data);
        app
            .get('/blogs/:user', (req, res) => {
                controller.getPosts(req, res);
            })
            .get('/blogs/:user/post/form', protect((req, res) => {
                controller.getPostForm(req, res);
            }))
            .post('/blogs/:user/post', protect((req, res) => {
                controller.createPost(req, res);
            }));
            // .get('/blogs/:user/post/:category/:id', protect((req, res) => {
            //     controller.viewPost(req, res);
            // }))
            // .post('/blogs/:user/post/:category/:id/edit',
            // protect((req, res) => {
            //     controller.editPost(req, res);
            // }));
    }
}

module.exports = PostRouter;
