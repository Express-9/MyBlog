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
            }))
            .get('/blogs/:user/post/:category/:id', (req, res) => {
                controller.viewPost(req, res);
            })
            .get('/blogs/:user/post/:category/:id/edit/form',
                protect((req, res) => {
                    controller.getEditForm(req, res);
                })
            )
            .post('/blogs/:user/post/:category/:id/edit',
                protect((req, res) => {
                    controller.editPost(req, res);
                })
            )
            .get('/api/blogs/:user/posts', (req, res) => {
                controller.getPostsAPI(req, res);
            })
            .get('/api/blogs/:user/posts/:id', (req, res) => {
                controller.viewPostAPI(req, res);
            })
            .post('/api/blogs/:user/posts', (req, res) => {
                if (!req.user || req.user.name !== req.params.user) {
                    res.status(401).send('Unauthorized');
                } else {
                    controller.createPostAPI(req, res);
                }
            });
    }
}

module.exports = PostRouter;
