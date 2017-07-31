class User {
	isValid(model) {
		if (typeof model === 'undefined') {
			throw new Error('Model is undefined');
		}
		if (typeof model.name === 'string' &&
			model.name.length < 3) {
				throw new Error('Name is too short');
		}
		return true;
	}
	}
module.exports = User;
