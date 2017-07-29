class GeneralRouter {
    attachTo(app, data) {
        app.get('/blogs/:user/contact', (req, res) => {
            res.render('blogs/contact', {
                currentUserName: req.params.user,
                isOwnerLoggedIn: (req.user ?
                    req.params.user === req.user.name : false),
            });
        });
    }
}

module.exports = GeneralRouter;
