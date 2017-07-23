class UserController {
    constructor(data) {
        this.data = data;
    }

    home(req, res) {
        this.data.user.getAll().then((users) => {
            res.render('home', { users });
        });
    }

    showRegister(req, res) {
        res.render('register');
    }
    register(req, res) {
        const bodyUser = req.body;

        this.data.user.findByUsername(bodyUser.name)
            .then((dbUser) => {
                if (dbUser) {
                    throw new Error('User already exists');
                }

                return this.data.user.create(bodyUser);
            })
            .then((dbUser) => {
                return res.redirect('/blogs/' +
                    encodeURIComponent(bodyUser.name));
            })
            .catch((err) => {
                req.flash('error', err);
            });
    }
}
module.exports = UserController;
