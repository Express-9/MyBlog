const UserController = require('../controllers/user.controller');
class UserRouter {
    attachTo(app, data) {
        const controller = new UserController(data);
        app.get('/', (req, res) => {
            controller.home(req, res);
        });
        app.get('/register/form', (req, res) => {
            controller.showRegister(req, res);
        });
        app.post('/register', (req, res) => {
            controller.register(req, res);
        });
    }
}

module.exports = UserRouter;
