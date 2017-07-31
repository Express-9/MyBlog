const encryptor = require('../../utils/encryptor');

class UserController {
    constructor(data) {
        this.data = data;
    }

    home(req, res) {
        this.data.user.getAll().then((users) => {
            res.render('home', { users });
        });
    }
    getUsers(req, res) {
        this.data.user.getAll().then((users) => {
            const names = users.map((user) => {
                return user.name;
            });
            res.send(names);
        });
    }
    showRegister(req, res) {
        res.render('register');
    }

    register(req, res) {
        const bodyUser = req.body;
        bodyUser.password = encryptor.encrypt(bodyUser.password);
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
                res.redirect('/register/form');
            });
    }
}
module.exports = UserController;
