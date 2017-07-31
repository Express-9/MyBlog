const { Router } = require('express');
const passport = require('passport');

const AuthController = require('../controllers/auth.controller');

class AuthRouter {
    attachTo(app, data) {
        const controller = new AuthController(data);
        const authRouter = new Router();
        authRouter
            .get('/form', (req, res) => {
                controller.showLogin(req, res);
            })
            .post('/',
            passport.authenticate('local', {
                failureRedirect: '/login/form',
                failureFlash: true,
            }),
            function(req, res) {
                res.redirect('/blogs/' + encodeURIComponent(req.user.name));
            }
            )
            .get('/logout', (req, res) => {
                controller.logout(req, res);
            });

        app.use('/login', authRouter);
    }
}

module.exports = AuthRouter;
