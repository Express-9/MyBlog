class AuthController {
    constructor(data) {
        this.data = data;
    }

    showLogin(req, res) {
        res.render('login');
    }
    logout(req, res) {
        req.logout();
        return res.redirect('/');
    }
}
module.exports = AuthController;
