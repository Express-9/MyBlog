class Post {
	isValid(model) {
		if (typeof model === 'undefined') {
			throw new Error('Invalid field');
		}
		if (model.header.length < 4 || model.text.length < 100) {
			throw new Error('Text is too short');
		}
		return true;
	}
}
module.exports = Post;
