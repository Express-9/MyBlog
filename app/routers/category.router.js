const CatController = require('../controllers/category.controller');

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

class CategoryRouter {
	attachTo(app, data) {
		const controller = new CatController(data);
		app
			.get('/blogs/:user/articles', (req, res) => {
				controller.getCategories(req, res);
			})
			.get('/blogs/:user/articles/form', protect((req, res) => {
				controller.getCategoryForm(req, res);
			}))
			.post('/blogs/:user/articles', protect((req, res) => {
				controller.createCategory(req, res);
			}))
			.get('/blogs/:user/articles/:name', (req, res) => {
				controller.getPostsByCat(req, res);
			})
			.get('/api/blogs/:user/articles', (req, res) => {
				controller.getCategoriesAPI(req, res);
			})
			.get('/api/blogs/:user/articles/:name', (req, res) => {
				controller.getPostsByCatAPI(req, res);
			});
	}
}
module.exports = CategoryRouter;
